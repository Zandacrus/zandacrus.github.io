---
layout: single
title: "Five-stage pipelined processor"
permalink: /projects/pipelined-processor/
author_profile: true
---

**Team of two · July–September 2022**  
Computer Architecture and Microprocessors (CSN-221), IIT Roorkee

[Integrated processor and assembler](https://github.com/Zandacrus/Computer-Architecture-and-Microprocessor-Project/tree/main_microprocessor){: .btn .btn--primary}

Together with Swayam Pal, I developed a SystemVerilog five-stage pipelined processor, a custom **80-instruction MIPS-like ISA**, and a standalone assembler in modern C++.

## My contribution

I wrote most of the code, including instruction fetch and checking, control, memory/register packages, pipeline queues, communication and data-memory components, next-PC and write-back sections, and single-core integration. I also wrote the assembler and factorial/Fibonacci demonstration testbenches. Swayam contributed register fetch, sign extension, ALU control, and the branch unit.

## Demonstrations

The integrated processor includes branch-hazard and read-after-write-hazard handling through pipeline freeze/control signals. Demonstration programs computed **Fibonacci numbers through the 47th number** and **factorials through 12!**.

The project record supports RTL, testbenches, assembly tooling, and program demonstrations. It does not establish physical FPGA deployment or quantitative IPC/stall results.

*SystemVerilog · Modern C++ · Pipelining · ISA design · Hardware/software interfaces*

[← All projects](/projects/)
