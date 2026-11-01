# Case study: ScanRuler Airbox and Tubo Finale — different critical paths

**Evidence date:** 2026-11-01. **Status:** observed local project artifacts, NOT a controlled comparison or proof that the proposed methodology is already superior. Source geometry and personal workstation paths are intentionally excluded from this reusable public reference.

## Case A — Airbox (complex multi-region part)

- Target: reconstruct the functional outer shell, internal partitions, hook supports, cavities, holes and interfaces, preserving the measured exterior and the specified 3 mm nominal internal walls. Owner annotations are part of the design intent.
- Checkpoints in the observed five-hour window (approximately 06:20–11:42 local time): 589 -> 605 recorded CAD features; annotations 7 -> 44. Newly added features in that window concentrate on the H02 wall/flange, crest and microface removal. The 37 recovered annotations are a meaningful preservation step, NOT equivalent to 37 finished regions.
- H02 improvements observed: one local microvoid eliminated, later microface of about 0.0078 mm² removed, closed solid exported and STEP read back; some local feature/topology tests passed. This remains a **regional** result, not a complete airbox.
- Representative local review after V16: 83.8% of 15,095 measured points within ±0.8 mm; RMS 0.57 mm, P95 1.22 mm. This is a bounded H02 comparison and says nothing definitive about the entire part. Other geometric findings remain; the plan still lists twelve regions open.
- Key risk: high-quality effort repeatedly applied to one detail while primary coverage and interfaces across the complete part remain open. No visual difference does not imply *zero* work, but the evidence does not justify calling the overall RE complete.

**When to adapt:** if the local flaw is not a true blocker for neighboring regions, record it and advance to broader coverage; if the defect prevents a required interface or kernel operation, try a different bounded method and keep the gate open. A fixed half-hour rule would be inappropriate for either case without context.

**Local evidence basenames:** 101/106/122/133/143/148/161 project-save files; H02 V13/V14/V16 reports; 146 reverse-body-check; 150 reverse-body-review; 149 STEP export/read-back. These reports exist in the authorized operating workspace, not this public repository.

## Case B — Tubo Finale.obj (tube, unreliable inner scan)

- Target: preserve measured external dimensions and airbox fit, reconstruct the external envelope and a *nominal* 2 mm internal wall. The scanner's internal surfaces are explicitly not authoritative.
- Original scan was preserved (3,780,582 triangles), with an independent reduction to 179,998 triangles for analysis. The initial ±0.08 mm simplification request was NOT fully achieved; global RMS reduction error 0.022796 mm and 99.9% within 0.101116 mm were reported over an envelope that included unreliable interior regions.
- Workflow used: initial alignment, inclined exterior sections, controlled interpolation of missing scan intervals, external surface reconstruction, nominal hollow interior, separate feature/interface work, multiple read-back and wall audits. This demonstrates a useful **global-envelope-first** option for this type of artifact, not an automatic blueprint for all CAD.
- R12 full tessellation-based local wall check (excluding terminal rims and separate functional features): nominal 2 mm, 99.9104% of sampled centroids in 1.9–2.1 mm; minimum 1.8711 mm, maximum 2.1779 mm. This is NOT a proof that every physical wall is 2 mm.
- R12 STEP read-back comparison at requested tessellation chord 0.005 mm: RMS 0.00035 mm, maximum separation 0.03439 mm across the stated sampled direction. Chord is not itself a CAD accuracy guarantee; read-back equivalence is not independent shape-to-original-scan accuracy. Other functional and overall acceptance gates remained open at observation time.

**When to adapt:** use nominal, evidence-backed interiors when raw inner measurements are unreliable and the user authorizes them. A global external pass may unlock interfaces early; isolate outlier regions for targeted validation. Never replace physical constraints with attractive aggregate quality statistics.

**Local evidence basenames:** REQUISITI_E_CONSERVAZIONE.md; reduced-mesh QA; R12 STEP_FINE_EQUIVALENCE.json; WALL_FINE_CORRECTED_VALIDATION.json; R11Q integrity report; R12 native checkpoint and exports. These are operating artifacts, not a transferable target tolerance.

## Contrast and transferable hypotheses

| Observation | Candidate reusable decision | What would disconfirm it |
| --- | --- | --- |
| Airbox local-feature iteration can dominate effort | Re-evaluate critical-path coverage after repeated local attempts with little functional gain | The local defect actually prevents all later geometry or safety checks |
| Tube envelope-first exposes broad shape earlier | Prefer outside-first when the user's external dimensions are authoritative and inner scan is poor | Reliable internal geometry or an early internal interface is the true critical path |
| Both produce technically valid exports without completing goals | Separate source fidelity, topology/read-back, functional fit and whole-task acceptance | All mandatory gates independently pass and owner confirms acceptance |
| Iteration metrics vary widely by region | Use comparable per-region measurements and severity-weighted defects instead of feature counts alone | A direct, validated functional acceptance metric exists and replaces the proxy |

**No universal 30-minute cutoff. No universal ±0.8 mm, 0.005 mm or 2/3 mm wall value.** Select these only if the current artifact's requirements and evidence justify them.

## Promotion criterion

This pair of case histories supports designing a context-aware decision **pilot**. It does not prove reduced duration, improved accuracy or causality. Record follow-up before/after outcomes on representative tasks, including failures; promote to a stronger default only after comparable evidence supports it and the safety constraints still hold.
