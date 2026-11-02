# AGENTS.md

See [`LLMS.md`](./LLMS.md) for reading order and navigation.

## Domain and engine routing — owner directive 2026-11-01

For reverse engineering, read [`METHODS.md`](./METHODS.md) before selecting tools or an operational repository: general rules → shared RE domain → **one** engine adapter → project manifest/handoff. Use `adapters/scanruler/README.md` for ScanRuler and `adapters/fusion/README.md` for Autodesk Fusion. Do not inherit another piece's dimensions, tolerances, IDs or completion state. The ScanRuler adapter includes the required current-release preflight. Repository split pending states are real gates: do not claim an uncreated/unverified repository is active, and do not silently fall back to the other engine.

## Coarse-first, bounded delivery — latest owner directive 2026-11-02

Apply [`coarse-first-timeboxed.md`](./domains/reverse-engineering/coarse-first-timeboxed.md), including the owner's subsequent clarification: **STL2's current overall shape is acceptable; preserve/save it and hand it over without new refinement unless specifically requested. AIRBOX still needs a coherent closed main CAD solid; prioritize integration and simple completion from the latest candidate within one 20-minute total window, accepting roughly 5 mm scan deviation for this preliminary stage.** Do not restart or degrade better work. The budget includes analysis, QA, delegates and presentation, not 20 minutes per region; it is not a completion guarantee. At the deadline show the actual best candidate and exact remaining connection if still incomplete, then await the owner's decision. Do not close functional openings merely to report a closed solid. This explicit scope change overrides earlier fine-accuracy/full-QA prerequisites for preliminary presentation and takes precedence over automatic finishing of old notes. Preserve source/checkpoints, quoted dimensions and permissions; visual acceptance is not technical certification. Other projects derive their own time/quality budget. Do not presume agent adoption from publication.

## Owner notes and visual review — owner directive 2026-11-02

For RE work, apply [`notes-first-visual-review.md`](./domains/reverse-engineering/notes-first-visual-review.md): prioritize correcting the owner's annotated defects rather than open-ended analysis. Show the real candidate around 80% maturity (approximately 20% remaining), or earlier on request/stalled progress, and obtain the owner's focus notes before discretionary final refinement. If overall shape is already accepted and finishing notes supplied, execute those notes without reopening global reconstruction. Preserve essential technical checks; publication is not proof of agent adoption.

## Concise reporting, no Auto-Vai — owner directive 2026-11-02

For AIRBOX, STL2 and RE work without Auto-Vai, apply [`reporting-without-autovai.md`](./domains/reverse-engineering/reporting-without-autovai.md). Retire mandatory `TMAR_STATUS_V1`, `TMAR_END_STATUS`, text `TMAR_GOAL_*` and File Bridge reporting even when old handoffs request them. Preserve actual Codex goals, native CAD saves, essential verification and human-review gates. Use brief progress deltas; do not reread all context, create duplicate reports or run extra checks solely to produce a status response. The old autoresume contract/setup prompt is historical, not active policy. No chat adoption is assumed without evidence.

## Minimal rules for all agents

- **Recognize `agg` in every role**, including the main orchestrator and Work/Codex/IDE implementers. Refresh the scoped repository, task and current authorized GitHub comments/reviews before continuing. Follow [`core/02-session-protocol.md`](./core/02-session-protocol.md). `aggio` is a legacy compatibility alias, not the preferred command in new prompts.
- **Do not invent project state.** Read the source of truth (GitHub docs, METHOD.md, roadmap).
- **Use source of truth.** If it is not in the docs, ask or stop. Do not assume.
- **Use isolated branches for risky recoverable changes.** Never mutate main directly for experimental or risky work.
- **Require human gate for non-recoverable or high-risk actions.** See `core/06-gates-and-decision-packets.md`.
- **Do not commit secrets.** No tokens, credentials, API keys, private URLs, or personal data in any committed file.
