#!/usr/bin/env python3
"""Build national holiday dates and approximate timezone-to-country mappings."""

import argparse
from datetime import datetime, timezone
import json
from pathlib import Path

import holidays

ROOT = Path(__file__).resolve().parents[1]


def timezone_countries(zoneinfo):
    """Use country-specific zone.tab entries, then resolve legacy IANA aliases."""
    countries = {}
    for line in (zoneinfo / "zone.tab").read_text().splitlines():
        if not line or line.startswith("#"):
            continue
        country, _, zone, *_ = line.split("\t")
        countries[zone] = country
    links = {}
    for line in (zoneinfo / "tzdata.zi").read_text().splitlines():
        fields = line.split()
        if len(fields) == 3 and fields[0] in {"L", "Link"}:
            links[fields[2]] = fields[1]
    for alias in links:
        zone = alias
        visited = set()
        while zone in links and zone not in visited and zone not in countries:
            visited.add(zone)
            zone = links[zone]
        if zone in countries:
            countries[alias] = countries[zone]
    # UTC and fixed-offset zones do not identify a country.
    return dict(sorted(countries.items()))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--year", type=int, default=datetime.now(timezone.utc).year)
    parser.add_argument("--zoneinfo", type=Path, default=Path("/usr/share/zoneinfo"))
    args = parser.parse_args()
    years = [args.year - 1, args.year, args.year + 1]
    zones = timezone_countries(args.zoneinfo)
    supported = holidays.list_supported_countries(include_aliases=False)
    calendars = {}
    for country in sorted(set(zones.values()) & set(supported)):
        calendar = holidays.country_holidays(
            country, years=years, observed=True, expand=False
        )
        calendars[country] = sorted(day.isoformat() for day in calendar if day.year in years)
    result = {
        "years": years,
        "sources": {
            "holidays": f"python-holidays {holidays.__version__}",
            "timezones": (args.zoneinfo / "tzdata.zi").read_text().splitlines()[0],
        },
        "timezones": zones,
        "holidays": calendars,
    }
    destination = ROOT / "assets/data/profile-calendar.json"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, separators=(",", ":")) + "\n")
    print(
        f"Generated {destination.relative_to(ROOT)}: {len(zones)} timezone mappings, "
        f"{len(calendars)} national calendars, years {years}, {destination.stat().st_size:,} bytes."
    )


if __name__ == "__main__":
    main()
