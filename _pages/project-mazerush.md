---
layout: single
title: "MazeRush"
permalink: /projects/mazerush/
author_profile: true
---

**Team project · January–February 2023**

MazeRush is a top-down 2D maze/action game developed in **Unity and C#**, organized into six levels with new maps and entities. The project combines exploration, enemy pursuit, items, and combat.

## Gameplay systems

- Directional player movement using Unity's 2D physics and sprites.
- Inventory and hotbar logic for collecting, selecting, using, and dropping items.
- Breadth-first search pathfinding, tilemap coordinate conversion, and obstacle tracking.
- Shared enemy behavior for roaming, line-of-sight detection, pursuit, and configurable tracking after losing sight of the player.
- Factory-based spawning and controllers for six enemy types.
- Projectiles, timed bombs, paired teleporters, audio effects, and a player-following visibility mask.

The project uses separate controllers for movement, monsters, coordinates, items, inventory UI, teleportation, and visibility. The retained archive contains the Unity project and gameplay code; a downloadable public release is not provided here. These are team-level project features; the supplied record does not identify an individual contribution breakdown.

*Unity 2021.3 · C# · 2D physics · Tilemaps · Graph traversal · Object-oriented design*

[← All projects](/projects/)
