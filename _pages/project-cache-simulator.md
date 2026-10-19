---
layout: single
title: "Configurable set-associative cache simulator"
permalink: /projects/cache-simulator/
author_profile: true
---

**Team of two · September–October 2022**  
Computer Architecture and Microprocessors (CSN-221), IIT Roorkee

[Source code on GitHub](https://github.com/Zandacrus/Computer-Architecture-and-Microprocessor-Memory-Project){: .btn .btn--primary}

Together with Swayam Pal, I developed a configurable cache simulator in SystemVerilog with **LRU replacement, write-back, and write-allocate policies**.

## My contribution

I had primary coding responsibility for the top-level cache controller and integration, comparator, multiplexer, valid/dirty-state checker, main-memory model, input generator, and cache testbench. Swayam contributed the cache-set and cache-block modules.

## Evaluation

The team evaluated LU decomposition, 32×32 matrix multiplication, and quicksort workloads. A retained testbench uses a **32 KiB four-way cache with 64-byte blocks**, backed by a 1 MiB simulated main memory, and counts hits and misses.

The project reported a **95% cache hit rate** for its validation workloads and configuration. Per-workload measurements are not available in the supplied record, so this figure should be read as a project result rather than a general property of the design.

*SystemVerilog · Memory hierarchy · Cache policies · Testbenches*

[← All projects](/projects/)
