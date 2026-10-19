---
layout: single
title: "Research experience"
permalink: /research/
author_profile: true
---

My research spans architectural simulation, cache and memory systems, workload analysis, and machine learning. The experiences below are listed in reverse chronological order.

## Architecture simulation and GPU microarchitecture

**Project Associate · IIT Bhubaneswar**  
School of Electrical and Computer Sciences · August 2026–present  
Supervisor: Dr. Debiprasanna Sahoo

I am studying how to separate interconnect implementations from the rest of ONNXim, with the aim of making BookSim and the team's 3D-NoC simulator interchangeable through reusable interfaces. This work is intended to support accelerator and interconnect studies, with chiplet systems as a future direction.

I am also beginning an empirical investigation of NVIDIA Blackwell RTX 5000/6000 Pro GPUs, focusing on cache policies and memory-hierarchy behavior. Both directions are ongoing; completed integration results and GPU measurements are not yet available.

*Tools and areas: ONNXim, BookSim, 3D-NoC, accelerator simulation, interconnects, GPU microarchitecture.*

## Geospatial machine learning and landslide analysis

**M.Tech. dissertation · IIT Roorkee**  
Department of Earth Sciences · June 2025–May 2026  
Supervisor: Prof. Pallavi Chattopadhyay

*Integrating Geophysical Analysis and Machine Learning for Landslide Spatial Probability Mapping in the Garhwal Himalaya, India*

My dissertation combined regional landslide susceptibility mapping in Tehri Garhwal, Uttarakhand, with geophysical interpretation at three active landslide sites in the Aglar watershed. I developed the data-processing, modeling, spatial-inference, and geophysical-analysis workflows and defended the completed thesis before a panel.

- Prepared **5,621 labelled samples** and **32 model features** from terrain, rainfall, vegetation, roads, land cover, and lithology.
- Compared XGBoost, Random Forest, and a PyTorch MLP using Optuna hyperparameter searches and five-fold stratified cross-validation.
- Selected XGBoost for mapping based on its cross-validation performance and landslide recall; it achieved a reported **0.9198 test ROC-AUC** and **87.7% landslide recall** on the held-out test set.
- Built a four-stage Python pipeline for raster alignment, feature encoding, model refitting, and GeoTIFF export, with a reported mapping run covering **3,823,170 valid pixels**.
- Interpreted Electrical Resistivity Tomography and VLF-EM observations at three sites as qualitative corroboration of mapped susceptibility.

[Read the dissertation overview →](/research/landslide-mapping/)

*Tools: Python, XGBoost, PyTorch, Optuna, scikit-learn, Rasterio, ArcMap, QGIS, ResIPy.*

## Cache bandwidth management

**Research Intern · IIT Delhi**  
Department of Computer Science and Engineering · May–August 2025  
Supervisor: Dr. Preeti Ranjan Panda

I implemented shared last-level cache bandwidth-management policies by modifying gem5 source code and evaluated their behavior in a configuration with **six CPU cores and four accelerators**. I used SPEC workloads and microbenchmarks to study IPC, cache miss rate, latency, and related metrics.

This work also involved debugging segmentation faults and simulation failures to improve the simulation environment's stability and support policy evaluation.

*Tools and areas: gem5, heterogeneous systems, cache bandwidth, microarchitectural analysis.*

## Federated learning and microarchitectural analysis

**Research Intern · IIT Bhubaneswar · Remote**  
School of Electrical and Computer Sciences · September 2024–April 2025  
Supervisor: Dr. Debiprasanna Sahoo

I developed an approximately **5,000-line asynchronous federated-learning framework in C++**, using Boost and LibTorch. Its plug-in architecture supported concurrent clients, on-demand model integration, and lazy loading of large datasets. I implemented staleness-aware FedAsync aggregation so the server could incorporate client updates without waiting for slower participants.

I evaluated scalability with **150 parallel clients across three deep-learning models**, with 50 clients per model, and profiled more than five server and client systems using AMD uProf to contribute microarchitectural analysis.

*Tools and areas: modern C++, Boost, LibTorch, AMD uProf, asynchronous systems, workload profiling.*

## CPU/GPU workload profiling

**Research Intern · IIT Bhubaneswar · Remote**  
School of Electrical and Computer Sciences · March–July 2024  
Supervisor: Dr. Debiprasanna Sahoo

I ran GPGPU-Sim experiments on **seven deep-learning workloads** and generated **more than 200 GB of execution traces** with Intel Pin for analysis in ChampSim. I also containerized simulation environments with Docker to simplify setup and reduce configuration problems.

*Tools and areas: GPGPU-Sim, ChampSim, Intel Pin, Docker, Linux, workload characterization.*
