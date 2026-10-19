---
layout: single
title: "AsyncTiny"
permalink: /projects/asynctiny/
author_profile: true
---

**Individual project · October 2023–January 2024**

[Source code on GitHub](https://github.com/Zandacrus/AsyncTiny){: .btn .btn--primary}

AsyncTiny is an approximately **3,000-line C++11 asynchronous runtime without the STL**, developed for memory-constrained systems. I extended earlier embedded-library work into a reusable runtime for platforms including Arduino, ESP32, and Linux.

## Capabilities

- Coroutines, futures, tasks, and timers.
- Cooperative scheduling, conditional sleep, and task cancellation.
- Zero-copy task reuse and memory-conscious runtime design.

The design explores how asynchronous programming abstractions can remain practical on small embedded targets while also working on Linux.

## Memory estimate

An Arduino IDE memory-usage estimate indicated approximately **200 bytes of additional RAM for 20 concurrent tasks**, relative to a program with no task, coroutine, future, or similar runtime objects instantiated. This was an approximate project estimate; the original board and allocation breakdown are no longer available, so it is not a peak-runtime memory guarantee or a comparison against another library.

*C++11 · Embedded software · Runtime design · Cooperative concurrency*

[← All projects](/projects/)
