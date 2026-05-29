# dev-method Roadmap

## Current stable release

- Current stable tag: `v0.1.1`
- Scope: docs-only stabilization patch after first GIS Tool adoption
- Status: tagged and usable as pinned method source
- `main` contains unreleased handoff-hardening improvements (see below). Stable consumers pinning to `v0.1.1` do not get these automatically.

## Unreleased since v0.1.1 (main — handoff hardening)

Available now to active projects reading `main` intentionally. Not yet tagged as v0.1.2.

- Authorized commit + push flow — `prompts/implementer-standard.md`
- Multi-repo workspace guard — `prompts/implementer-standard.md`
- IDE-agent handoff template — `templates/ide-agent-handoff-task.md`
- Completion evidence rule — `prompts/implementer-standard.md`
- PASS + follow-up UX request rule — `patterns/qa-pass-implementer-handoff.md`
- LLMS pointer for IDE-agent handoff prompts — `LLMS.md`

See `CHANGELOG.md` [Unreleased] for the full detail.

### Control-plane strategic sync (unreleased)

Patterns promoted from control-plane PROJECT_VISION v2.6 (2026-05-29), without copying the operational repo:

- Remote hash verification — PASS requires `git ls-remote` / `git rev-parse origin/main`; GitHub raw is secondary
- Rolling implementer report — two-commit stop; report-only commit must not replace real task SHA
- Cursor prompt formatting contract — routing metadata outside copyable prompt body
- Operational repo → method repo sync rule — reusable control-plane strategic changes trigger dev-method review
- control-plane documented as advanced live pilot (after GIS Tool) — `examples/control-plane.md`

## v0.1.2 candidate checklist

Before tagging v0.1.2 — **requires explicit user instruction to release**:

- [ ] Confirm examples and templates are coherent after handoff hardening
- [ ] Verify no duplicated or contradictory rules across patterns/prompts/templates
- [ ] Validate at least one real IDE-agent handoff using `templates/ide-agent-handoff-task.md`
- [ ] Decide explicitly whether to tag v0.1.2
- [ ] Do not tag or release without explicit user instruction

## v0.1.x — Stabilization and adoption

Purpose:
Small documentation-only improvements discovered while importing dev-method into real projects.

Note:
`v0.1.1` collected the first GIS Tool adoption policies (roadmap, large-file token policy, session/repo guard, idea intake, context compaction / debug reconstruction).

Allowed examples:
- Clarify unclear wording found during first project imports.
- Improve `docs/METHOD.md` overlay guidance.
- Add missing cross-links.
- Fix typos or inconsistencies.
- Keep v0.1.x backward-compatible with v0.1.0.

Not allowed in v0.1.x:
- Runtime code
- Automation
- Provider APIs
- Breaking changes to core semantics
- Rewriting the method around a new architecture

## First pilot — GIS Tool

Purpose:
Use GIS Tool as the first real project to validate dev-method v0.1.0.

Pilot objectives:
- Import dev-method via `docs/METHOD.md`.
- Use pinned links to `v0.1.0`, not `main`.
- Apply the single-file HTML adapter if appropriate.
- Use roadmap-first execution.
- Batch recoverable work.
- Gate irreversible/high-risk actions.
- Manual-test only at milestones.
- Validate large-file token-efficiency policy during adoption before considering any split/refactor pattern.
- Validate session/repo guard and idea-intake patterns (including prompt/template integration) during GIS Tool adoption.
- Validate context compaction / debug reconstruction policy during first real DEBUG session on GIS Tool.
- Validate large-file token-efficiency prompt integration during GIS Tool adoption.

## v0.2.0 — Template Pack Expansion

Trigger:
Create v0.2.0 templates only when repeated real workflow pain appears during project adoption.

**Core draft (pending, not active in stable):** `core/07-orchestrator-output-format.md` — see `LLMS.md`; explicit v0.2.0 release decision required. Stable tag consumers (`v0.1.1`) need not apply it.

Planned template candidates:
- `templates/state-update-batch.md`
- `templates/inbox-decision-recording.md`
- `templates/n8n-template-first-task.md`
- `templates/n8n-ui-supervised-cleanup.md`
- `templates/cursor-reviewer-task.md`
- `templates/branch-cleanup-task.md`

Rule:
Do not add all templates blindly. Add the smallest useful template when a real repeated need appears.

## Future automation track

### Local handoff generator (pre-runner — not yet implemented)

First mechanical automation layer. Reads an operational repo's orchestrator docs and produces a ready-to-copy IDE-agent prompt. Human reviews and pastes; nothing executes automatically.

Spec: `patterns/local-handoff-generator.md`.

Evolution path: v0 (manual spec) → v1 (local script) → v2 (gated runner) → v3 (n8n orchestration). n8n Execute Command / container runtime lessons: `patterns/local-handoff-generator.md` § I.
First target: GIS Tool (`mrhz1973/cursor-coordinate-converter`).

**v1 implemented:** `tools/handoff-generate.mjs` — generates a ready-to-review handoff prompt from operational repo orchestrator docs. No execution, no commits, no runner. Run `node tools/handoff-generate.mjs --help` for usage.

**Next target:** v1 acceptance test with GIS Tool (`mrhz1973/cursor-coordinate-converter`) once operational docs are in place; then v2 gated runner when Cursor or equivalent is locally available.

### Other potential future work

- Ollama classifier/router/risk scorer.
- n8n control-plane jobs.
- Branch cleanup automation.
- Human-gate notifications.
- Optional OpenClaw `/codex-consult` bridge.
- Validate QA PASS → implementer handoff first manually, then automate only behind gates.

Constraints:
- Automation must remain optional.
- GitHub remains the source of truth.
- No provider API dependency by default.
- High-risk actions remain gated.
- Runtime work must be done one gate at a time.

## Release policy

- `main` may continue after a stable tag.
- Stable consumers should pin to tags, not `main`.
- Do not retag an existing stable version.
- Use a new patch/minor tag for future stable changes.
- Keep changelog entries concise.
