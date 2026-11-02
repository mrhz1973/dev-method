# Pattern: Context-adaptive execution, acceptance and learning

**Status:** candidate for piloting, 2026-11-01. Reusable decision pattern, NOT a compulsory recipe or a new stable dev-method release.

## Governing rule

The **human owns the goal, constraints, functional intent and high-risk decisions**. Within authorized, recoverable scope, the AI selects, explains and revises the next action based on **the actual artifact, current context, evidence, risk and measured progress**. A method that improved one piece or project is a candidate for another, not an unconditional rule.

Do not confuse activity, number of CAD features/commits/tests, an exported file, or an agent saying CONTINUE with achievement of the user's outcome. No fixed universal timebox, geometric tolerance, wall thickness, or acceptance percentage.

## When to invoke (read only when relevant)

| Trigger seen in the current project | What the AI should do | Why |
| --- | --- | --- |
| New or changed user goal, different kind of artifact, uncertain design intent | Reconstruct project-specific acceptance and dependency map; distinguish known specifications from guesses | An old workflow may optimize the wrong objective |
| Repeated micro-corrections with little change in functional coverage or acceptance evidence | Compare last two checkpoints and the remaining critical path; switch/defer the local method if it is not a blocker | Avoid unproductive local-optimization loops |
| A required feature blocks assembly, geometry, integrity, or safety | Resolve or safely isolate the blocker before moving on; do not defer merely because a timer expired | Global progress is illusory if the critical dependency fails |
| Incomplete/noisy scan, ambiguous dimensions, unreliable source data | Preserve raw source; separate fitted observations, assumptions and proposed nominal geometry; seek independent evidence | Do not build false precision into a model |
| A candidate passes a partial check (e.g. valid topology, test suite, STEP export) but user goal remains open | Identify other necessary quality and functional gates; label as PARTIAL or HOLD | A local PASS is not an overall DONE |
| An alternative algorithm or workflow may outperform the current one | Run a bounded, reversible comparison with the same source, metrics and scope | Promote learning based on measured results |
| Expensive/destructive operation or unknown authorization | Follow existing human gate, stop affected work and provide a decision packet | Autonomy never overrides safety or owner authority |
| Short, well-defined task already progressing and passing its required checks | Do not add a new decision ritual; execute and close | Avoid method overhead without benefit |

This pattern is also useful outside CAD: app features versus cosmetic bugs, GIS catalog coverage versus exhaustive analysis of a single format, and recovery integrity versus fast but unsafe writes. Project-specific constraints and gates always prevail.

## Context-sensitive loop

1. **Rehydrate evidence:** inspect the active repository, user instruction, selected source artifact/revision, authorized tools, last committed checkpoint and known blockers. Confirm which geometry/build/database/repository is actually active. Never import another project's assumptions by default.
2. **Define outcomes:** classify requirements as (A) mandatory functional/safety, (B) mandatory structural/source integrity, (C) evidence/validation, (D) optional refinements. Record unknowns and distinguish source measurement from an AI-proposed nominal dimension. Set thresholds using *this* artifact's tolerances, acquisition reliability, intended use and user directions.
3. **Map critical path:** identify completed and uncompleted areas, dependencies, risk of rework and a minimum acceptable intermediate artifact. For a scanned part, this may mean primary exterior and interfaces before cosmetic microfaces; for a recovery job, it may mean read-only provenance before any write.
4. **Select one strategy with a reason:** choose a coarse/global pass, a local critical fix, a measurement/uncertainty reduction step, a reversible alternative, or a documented deferral. Prefer the action that increases expected usable coverage or removes the highest genuine blocker for its cost and risk. The AI makes this contextual choice; it is not a universal fixed ordering.
5. **Run a bounded hypothesis:** record what will change, expected observable gain, validation signal and reversible checkpoint. Perform a meaningful work block, not a succession of pointless confirmations. Compare after with before using the same reference, units and sampling envelope.
6. **Decide on evidence:** CONTINUE if progress or a necessary diagnostic is demonstrated; SWITCH method if attempts repeat without measured improvement; DEFER only nonblocking issues with a return criterion; WAIT for an unresolved high-risk or owner decision; DONE only after all *project-defined* mandatory gates and deliverables are met. If a long operation is demonstrably progressing or blocking a critical dependency, continue it even beyond the illustrative local review budget.
7. **Persist learning:** store the chosen hypothesis, sources, before/after, observed costs, outcome, remaining defects and next experiment. Refresh the project-specific method overlay if the choice matters to later sessions.

**Review budget:** choose a review trigger proportional to the size and criticality of the step (elapsed time, attempts, compute cost, tool calls or a stalled quality metric). "30 minutes" and "two attempts" are possible *examples* for some noncritical local defects; neither is a mandatory cutoff. An AI must not let a timer override evidence of useful progress or ignore an essential blocker.

## Dynamic Definition of Done (DoD)

The original project/user goal determines DONE. For each project, identify:

- **Coverage:** all mandatory regions, features, behaviors, datasets or workflow steps represented; count only evidence-backed coverage, not raw features/commits.
- **Correctness:** relevant functional constraints, dimensions, integrity, geometry/topology or logic tests satisfied, including interfaces and assembly/operational fit where applicable.
- **Fidelity versus assumptions:** distinguish measured source match, nominal design hypotheses, numerical round-trip precision, and physical uncertainty. Do not silently claim that a tessellation chord, an RMS, or an exported closed solid proves global accuracy.
- **Acceptance evidence:** actual file paths/revisions, reproducible tests, checkpoint/save/reopen where relevant, unresolved exceptions and who authorized each exception.
- **Operational delivery:** required editable/native and export artifacts, read-back and documentation validated; no unreconciled high-priority blockers.

Use CONDITIONAL_PARTIAL or HOLD (within existing project status vocabulary) when the work is useful but any mandatory criterion remains open. Continue/WAIT/DONE signaling for another controller, such as Auto-Vai, does not independently certify CAD correctness or authorize automatic message sending.

**Do not mark DONE** because of a single local validation, a visually plausible screenshot, a rising feature count, or a percentage with unknown coverage. Conversely, do not seek impossible scan fidelity beyond acquisition capability when the owner has authorized nominal reconstruction and the required functional gates are satisfied.

## Method-choice decision record (small enough to use repeatedly)

Keep one brief record per meaningful decision, not per tool call:

- **CONTEXT:** artifact, intended use, constraints, source reliability and authorization.
- **CURRENT:** accepted coverage, critical blockers, last checkpoint and confidence.
- **OPTIONS:** continue current approach / change method / measure more / defer.
- **CHOICE & WHY:** expected impact on the critical path, safety and cost.
- **EVIDENCE BEFORE -> AFTER:** comparable measurements or artifact/feature coverage with provenance; mention failed or inconclusive checks.
- **NEXT:** safe follow-up, recheck trigger, saved rollback, or human gate.

A short narrative is sufficient where tabular metrics are not useful. Prefer snapshots and explicit reports over verbose chat logs.

## Learning loop: when a practice becomes reusable

1. Capture an **observation**, not a victory claim: problem context, candidate method, baseline, output, defects, effort, and traceable evidence.
2. Form a **hypothesis** about where this method should help (e.g. global-envelope-first when source interiors are unreliable).
3. Test in a comparable situation with the same acceptance envelope, including negative and counterexamples; do not infer causality from an unpaired single run.
4. **Promote conditionally** when evidence shows improved required coverage, quality, time-to-usable-artifact or fewer regressions without safety tradeoffs. Record triggers, non-applicable cases, metrics and rollback plan.
5. Store durable reusable rules in dev-method; keep live geometry/workspace data and decisions in each operational project's own source of truth. Do not retroactively rewrite release tags; existing projects opt into new rules via an explicit scoped METHOD overlay and commit/pin, followed by acknowledgement from the running agent.
6. If later evidence contradicts the method, downgrade or revise it, recording the failure mode. No universal method is exempt from re-evaluation.

**Evaluation dimensions:** functional coverage, severity-weighted unresolved requirements, reproducible correctness/quality, iteration cost, number of discarded alternatives, risk/rollback, and time to an accepted milestone. A raw count of model features, test assertions or chat messages is not a standalone productivity measure.

## Boundaries and non-goals

- Project-level owner instructions, documented source-of-truth constraints, safety gates and manufacturer/physical requirements supersede the AI's heuristic preference.
- A proposed nominalization or reconstruction is explicitly identified as a hypothesis when measurement is insufficient; user approval is needed where design changes are consequential or outside the assignment.
- Preserve original scans/files and recoverable checkpoints; verify exports and critical external interfaces.
- No background agent, live chat access, scheduler or autonomous send capability is created by this document.
- This candidate pattern is a method overlay only, not an instruction to modify a running CAD application or push changes to other repositories.
- A project may deliberately favor local precision first (e.g. a mating datum blocking all subsequent work) or global coverage first (e.g. low-risk overall shell). The AI must justify that choice from context.

## Evidence and reusable illustration

See [ScanRuler Airbox vs Tubo Finale pilot](../examples/scanruler-airbox-tubo-context-pilot.md) for two observed cases and limitations. They motivate the *decision rules*, not universal timing or geometry parameters.

Use the [Contextual acceptance record template](../templates/contextual-acceptance-record.md) when a project needs a durable minimal record; omit the template for trivial tasks.
