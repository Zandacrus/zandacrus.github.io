---
layout: single
title: "Landslide susceptibility mapping in the Garhwal Himalaya"
permalink: /research/landslide-mapping/
author_profile: true
---

**Integrated M.Tech. dissertation · IIT Roorkee · June 2025–May 2026**  
Supervisor: Prof. Pallavi Chattopadhyay, Department of Earth Sciences

*Thesis title: Integrating Geophysical Analysis and Machine Learning for Landslide Spatial Probability Mapping in the Garhwal Himalaya, India*

## Research question

How can geospatial machine learning and subsurface geophysical observations help explain the spatial distribution of landslide susceptibility? My dissertation studied Tehri Garhwal district in Uttarakhand, with local geophysical observations at three active landslide sites in the Aglar watershed.

<figure>
  <a href="/images/research/tehri-landslide-susceptibility.png"><img src="/images/research/tehri-landslide-susceptibility.png" alt="XGBoost landslide susceptibility map of Tehri Garhwal, with five classes from very low to very high" loading="lazy" width="3509" height="2481"></a>
  <figcaption>Regional susceptibility map from my dissertation. Colors show relative susceptibility classes; click the map to view it at full resolution.</figcaption>
</figure>

## Data and modeling

I prepared an inventory from GSI BHUKOSH and NASA COOLR, checked against Google Earth imagery. The archived dataset contains **2,811 landslide and 2,810 non-landslide samples**. Eleven conditioning factors were transformed into 32 model features, including one-hot encodings for land cover and lithology. Geospatial inputs were harmonized to a 30 m grid in WGS 1984 UTM Zone 44N.

I compared XGBoost, Random Forest, and a PyTorch multilayer perceptron using a stratified 80/20 train/test split, five-fold stratified cross-validation, and Optuna TPE hyperparameter searches. Classification thresholds were selected from out-of-fold training predictions using Youden's J statistic.

| Reported metric | XGBoost | Random Forest | MLP |
| --- | ---: | ---: | ---: |
| Best cross-validation ROC-AUC | 0.9165 | 0.9112 | 0.9017 |
| Test ROC-AUC | 0.9198 | 0.9206 | 0.9067 |
| Test accuracy | 84.71% | 84.36% | 82.31% |
| Landslide recall | 87.7% | 86.0% | 81.5% |
| Landslide F1 | 0.852 | 0.846 | 0.822 |

I selected XGBoost for map production because it had the highest cross-validation AUC and landslide recall, with fewer missed positive test samples. Random Forest had the highest test ROC-AUC. These results describe the dissertation's 1,125-sample test set.

## From samples to a regional map

I built a four-stage Python pipeline to:

1. Stack and align eleven raster layers against a reference grid.
2. Prepare valid pixels and enforce the model's exact 32-column feature schema.
3. Refit XGBoost on the full labelled dataset using the selected hyperparameters.
4. Predict susceptibility, reconstruct the spatial grid, and export a compressed, georeferenced GeoTIFF with explicit NoData handling.

The thesis reports inference over **3,823,170 valid pixels**. Engineering work included resolving raster dimension mismatches, differing NoData sentinels, boundary coverage, and missing categorical columns. The spatial pipeline used median imputation for continuous raster inputs and mode imputation for categorical inputs.

## Geophysical interpretation and risk mapping

I processed and interpreted Electrical Resistivity Tomography and VLF-EM data from three landslide sites using ResIPy and Karous–Hjelt/Fraser filtering. The observations provided **qualitative corroboration** of susceptibility classes, rather than predictor features or district-wide field validation.

I also combined susceptibility with rainfall and land-cover-based vulnerability proxies to produce relative hazard and economic-risk indices. Cost proxies drew on UKPWD and CPWD rates; maps used five classes from Very Low to Very High.

## Contribution and scope

I performed the data processing, model development, geospatial analysis, geophysical processing and interpretation, and preparation of the thesis and defense presentation. PhD students helped operate instruments during field collection, and another PhD student supplied raw satellite data and basemaps.

The maps represent **relative spatial susceptibility and risk indices**. Evaluation used a random stratified split, rather than spatially blocked or temporal validation. The archived workflow fitted sample imputers before splitting, which creates a potential source of evaluation leakage whose effect has not been quantified. The analysis also depends on inventory coverage, coarse rainfall inputs, simplified cost assumptions, and geophysical observations from three sites in one watershed.

*Tools: Python, NumPy, pandas, scikit-learn, XGBoost, PyTorch, Optuna, Rasterio, Matplotlib, ArcMap, QGIS, ResIPy.*

[← All research experience](/research/)
