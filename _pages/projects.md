---
layout: single
title: "Projects"
permalink: /projects/
author_profile: true
---

A selection of hardware and software projects, from processor RTL and FPGA inference to embedded runtimes and game systems. Team projects identify my contribution on their detail pages.

## ANN accelerator on FPGA

**September–October 2025 · Individual project · IIT Roorkee**

A configurable SystemVerilog neural network for MNIST digit classification, implemented and verified on a Basys 3 FPGA. The design reuses eight logical MAC units, receives image bytes over UART, and returns the predicted digit. It met 100 MHz timing constraints and classified 19 of 20 project test images correctly.

*SystemVerilog · Vivado · Basys 3 · UART*  
[Project details →](/projects/ann-accelerator/)

## AsyncTiny

**October 2023–January 2024 · Individual project**

A C++11 asynchronous runtime without the STL, built for memory-constrained platforms. It provides coroutines, futures, tasks, timers, cooperative scheduling, conditional sleep, and cancellation, with support for Arduino, ESP32, and Linux.

*C++11 · Embedded systems · Cooperative concurrency*  
[Project details →](/projects/asynctiny/) · [Source code](https://github.com/Zandacrus/AsyncTiny)

## Transformers

**March–May 2023 · Team of three · IIT Roorkee**

A humanoid-to-car robot design using 14 servos and four DC motors. I wrote most of the robot-specific C++ code, contributed to engineering design, and independently managed the electronics circuitry. We demonstrated the wired electronics; the complete robot was never assembled, and the project ended before completion.

*C++ · Arduino · Electronics · SolidWorks · Fritzing*  
[Project details →](/projects/transformers/)

## MazeRush

**January–February 2023 · Team project**

A top-down 2D maze/action game in Unity and C#, with six levels, enemy behavior, inventory systems, combat, teleportation, and visibility effects. The gameplay code includes BFS pathfinding and raycast line-of-sight detection.

*Unity · C# · Pathfinding · Game systems*  
[Project details →](/projects/mazerush/)

## Configurable set-associative cache simulator

**September–October 2022 · Team of two · IIT Roorkee**

A SystemVerilog cache simulator with LRU replacement, write-back, and write-allocate policies. I had primary coding responsibility for the controller, integration, and simulation infrastructure; the team evaluated LU decomposition, matrix multiplication, and quicksort workloads.

*SystemVerilog · Cache design · Testbenches*  
[Project details →](/projects/cache-simulator/) · [Source code](https://github.com/Zandacrus/Computer-Architecture-and-Microprocessor-Memory-Project)

## Five-stage pipelined processor

**July–September 2022 · Team of two · IIT Roorkee**

A SystemVerilog processor with a custom 80-instruction MIPS-like ISA and a standalone modern C++ assembler. I wrote most of the code, including core control and integration components, the assembler, and demonstration programs.

*SystemVerilog · C++ · Processor microarchitecture · ISA design*  
[Project details →](/projects/pipelined-processor/) · [Source code](https://github.com/Zandacrus/Computer-Architecture-and-Microprocessor-Project)
