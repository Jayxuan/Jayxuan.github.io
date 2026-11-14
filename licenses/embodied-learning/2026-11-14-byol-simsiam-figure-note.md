# 2026-11-14: C21 BYOL / C22 SimSiam figure decisions

## Core-paper reuse checks

- BYOL: Jean-Bastien Grill and coauthors, NeurIPS 2020. Checked https://arxiv.org/abs/2006.07733v3 (2020-09-10 fixed version) and its “view license” link on 2026-11-14; it resolves to https://arxiv.org/licenses/nonexclusive-distrib/1.0/license.html . This is a grant to arXiv, not an affirmative public figure-reuse licence. The NeurIPS 2020 publication landing page https://proceedings.neurips.cc/paper/2020/hash/f3ada80d5c4ee70142b17b8192b2958e-Abstract.html did not supply a clear public reuse grant in the checked material. Do not infer a figure licence from the code licence.
- SimSiam: Xinlei Chen and Kaiming He. Checked fixed https://arxiv.org/abs/2011.10566v1 (2020-11-20 technical report) and its “view license” link on 2026-11-14; it likewise resolves to the arXiv non-exclusive distribution licence. Core architecture is Figure 1, PDF page 1: https://arxiv.org/pdf/2011.10566v1#page=1 . CVPR 2021 landing-page request returned HTTP 403; no alternate access route was attempted to evade that denial. No unverified paper-image reuse permission is asserted.
- Core diagrams are linked, not copied. Absence of a verified public reuse licence is not a claim that no permission could ever be obtained.

## Licensed foundational comparison actually used

- Work: Michael Laskin, Aravind Srinivas, Pieter Abbeel, CURL: Contrastive Unsupervised Representations for Reinforcement Learning, ICML 2020, PMLR 119:5639–5650.
- Fixed publication: https://proceedings.mlr.press/v119/laskin20a.html
- Original PDF: https://proceedings.mlr.press/v119/laskin20a/laskin20a.pdf , Figure 2, PDF page 4.
- Licence: CC BY 4.0 https://creativecommons.org/licenses/by/4.0/ . Rechecked PMLR publication agreement https://proceedings.mlr.press/pmlr-license-agreement.pdf on 2026-11-14: clause 2 grants the public CC BY 4.0; clause 3 requires original-publication attribution and PMLR link. This is paper-publication licensing evidence, separate from repository code licensing. No figure-specific exclusion was observed.
- Asset: assets/embodied-learning/c19-curl-2020-figure2.png (existing repository asset, reused unchanged; no duplicate asset needed).
- SHA-256: a8af6caef70bde6e886bdbc7fde00dadb8f3c19530fd7f9863e99170eb81b67f
- Pixel size: 660 × 320. Original extraction: render PDF page at 160 dpi (1360×1760), crop (335,155)–(995,475). Surrounding prose/caption removed; architecture graphics, arrows, labels, and colours unchanged. No AI generation or redraw.
- Actual visual inspection on 2026-11-14: opened full source page4 PNG and cropped asset with image-view tool; verified Figure2 caption, replay buffer, observation, two Data Aug paths, Query/Key Encoder, Reinforcement Learning and Contrastive Unsupervised Learning blocks. Full source page and crop match.
- Use in C21 and C22 is explicitly a foundational contrastive-learning comparison, NOT a BYOL or SimSiam diagram. The relationship is the paired augmented views and two-branch feature learning; article text must distinguish negative pairs, online/target momentum updates, shared weights, predictor, stop-gradient, and absence of RL in the reviewed image methods.
- Each article must credit authors/venue/year/figure number/source/CC BY 4.0/crop status; provide meaningful alt text, responsive max-width:100%;height:auto, width=660 height=320, original-resolution local image link and source vector PDF link; include a stepwise reading guide and a separate core-diagram link.
