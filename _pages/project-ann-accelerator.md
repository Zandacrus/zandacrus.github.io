---
layout: single
title: "ANN accelerator on FPGA"
permalink: /projects/ann-accelerator/
author_profile: true
---

**Individual project · September–October 2025**  
Computer Architecture for AI (DA-408), IIT Roorkee

I independently designed and verified a configurable neural-network accelerator for MNIST digit classification on a **Basys 3 / Xilinx Artix-7 FPGA**, using SystemVerilog and Xilinx Vivado.

## Architecture

- A fully connected **784 → 32 → 10** network, with ReLU in the hidden layer and maximum-score output selection.
- Eight logical MAC units, reused across neuron groups and layers, with parameterized dimensions and arithmetic widths.
- Eight-bit unsigned image pixels, eight-bit signed weights and biases, and 32-bit signed internal activations in the default configuration.
- Initialized weight and bias memories with block-RAM inference attributes.
- UART state machines receiving 784 grayscale image bytes and returning the predicted digit as ASCII, with a default baud rate of 115,200.

## Verification and implementation

I prepared MAC, UART, and classifier testbenches and verified inference on a physical Basys 3 board. **Nineteen of 20 project test images were classified correctly (95%)**; this small test set contained two images per digit and does not represent accuracy on the full MNIST test dataset.

| Retained implementation result | Value |
| --- | ---: |
| Clock constraint | 100 MHz |
| Worst setup slack | 0.445 ns |
| Worst hold slack | 0.037 ns |
| LUTs | 5,089 |
| Registers | 8,440 |
| Block RAM tiles | 34 |
| DSP blocks | 32 |

The eight logical MAC units map to 32 DSP blocks in the saved implementation report. Timing and resource figures come from the retained Vivado reports. Inference latency and power consumption were not measured in the supplied project record.

[← All projects](/projects/)
