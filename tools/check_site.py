#!/usr/bin/env python3
"""Check rendered local links, assets, and fragment targets without dependencies."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1] / "_site"
ORIGIN = "https://zandacrus.github.io"


class Document(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for attribute in ("href", "src", "poster"):
            if attrs.get(attribute):
                self.links.append(attrs[attribute])


def main():
    if not (ROOT / "index.html").exists():
        raise SystemExit("Build the site with Jekyll before checking links.")
    documents = {path: Document(path) for path in ROOT.rglob("*.html")}
    errors = []
    count = 0
    for path, document in documents.items():
        relative = path.relative_to(ROOT).as_posix()
        for link in document.links:
            target = urlsplit(urljoin(f"{ORIGIN}/{relative}", link))
            if target.scheme not in ("http", "https") or target.netloc != urlsplit(ORIGIN).netloc:
                continue
            count += 1
            destination = ROOT / unquote(target.path).lstrip("/")
            if destination.is_dir():
                destination /= "index.html"
            if not destination.is_file():
                errors.append(f"{relative}: missing target {link}")
            elif target.fragment and destination in documents:
                if unquote(target.fragment) not in documents[destination].ids:
                    errors.append(f"{relative}: missing fragment {link}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Checked {count} local references across {len(documents)} HTML pages; no broken targets.")


if __name__ == "__main__":
    main()
