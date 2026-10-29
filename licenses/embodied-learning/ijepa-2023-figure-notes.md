# C07 I-JEPA figure provenance and verification

The article reuses existing assets/embodied-learning/dino-2021-fig2.png (612 × 592); no duplicate binary is needed. Original: Mathilde Caron, Hugo Touvron, Ishan Misra, Hervé Jégou, Julien Mairal, Piotr Bojanowski, Armand Joulin, Emerging Properties in Self-Supervised Vision Transformers (2021), https://arxiv.org/pdf/2104.14294v2, PDF page 2 Figure 2. The fixed abstract page https://arxiv.org/abs/2104.14294v2 explicitly links https://creativecommons.org/licenses/by/4.0/. Reverified 2026-10-29, independent of code licensing.

Existing asset crops original vector artwork rectangle (350,72,503,220) points, rendered at 4 pixels/point. No diagram nodes, arrows or text changed; original caption excluded, Chinese caption is explanatory. Actual asset pixels inspected again 2026-10-29: x, x1/x2, student, teacher, EMA, centering, softmax, sg and loss are visible. The article attributes every author, links paper/license/full-resolution asset, states changes and includes alt/responsive dimensions.

It is a DINO foundation comparison for EMA and stop-gradient, NOT an I-JEPA architecture image. DINO centering, softmax and cross-entropy are explicitly distinguished from I-JEPA feature regression and position-conditioned predictor.

Core paper I-JEPA fixed version: https://arxiv.org/abs/2301.08243v3 (2023-04-13), Figure 3 at https://arxiv.org/pdf/2301.08243v3#page=3. Its arXiv license link resolves to https://arxiv.org/licenses/nonexclusive-distrib/1.0/license.html; this is not treated as permission to republish the figure. Core Figure 3 actual PDF pixels were inspected privately, not copied into blog. Article links and explains it. The diagram's three illustrative target groups are distinguished from the paper default of four target blocks.

Source code snapshot: 52c1ae95d05f743e000e8f10a1f3a79b10cff048. Paper v3 describes squared L2; published train.py uses target feature layer_norm and smooth_l1_loss. This difference is disclosed rather than silently rewriting the paper formula. No training/forward/robotics experiments were executed.
