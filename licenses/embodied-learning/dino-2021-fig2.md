# DINO Figure 2 provenance for C05 DINOv2

- Reproduced work: Mathilde Caron, Hugo Touvron, Ishan Misra, Hervé Jégou, Julien Mairal, Piotr Bojanowski, Armand Joulin. Emerging Properties in Self-Supervised Vision Transformers (2021).
- Fixed source: https://arxiv.org/pdf/2104.14294v2 , PDF page 2, Figure 2 (Self-distillation with no labels).
- License evidence: https://arxiv.org/abs/2104.14294v2 links to https://creativecommons.org/licenses/by/4.0/ . Verified 2026-10-27. This is the paper license, not inferred from code.
- Local asset: assets/embodied-learning/dino-2021-fig2.png, 612 × 592 pixels.
- Transformation: cropped PDF vector artwork rectangle (350,72,503,220) points on page 2; rendered at 4 pixels/point. Diagram itself unchanged, no overlays or AI reconstruction. Original English caption excluded from crop and paraphrased with credit in article.
- Visual verification: full source page and resulting image inspected; all nodes, arrows, loss, centering, softmax, EMA and stop-gradient are visible without clipping.
- Relation: this is the directly relevant DINO foundation of DINOv2's image-level self-distillation, NOT a DINOv2 architecture diagram. DINOv2 adds patch-level iBOT, separate heads, Sinkhorn–Knopp target normalization, KoLeo and other changes explained in prose.
- Core DINOv2 version: https://arxiv.org/abs/2304.07193v2 (2024-02-02; TMLR 01/2024). arXiv entry lists non-exclusive distribution license. OpenReview forum/PDF presented verification challenge during inspection; no challenge bypass attempted. TMLR's general CC BY policy was found, but exact hosted PDF/figure comparison was not completed, so no DINOv2 image is copied under an assumed license.
- Core original figures linked in article: https://arxiv.org/html/2304.07193v2#S3 and https://arxiv.org/pdf/2304.07193v2#page=3 .
- Credit and license apply to the figure only; this learning article is not a CC BY repost of the entire paper, and authors do not endorse the explanation.
