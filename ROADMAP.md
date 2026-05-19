# dev-method Roadmap

## Current stable release

- Current stable tag: `v0.1.0`
- Scope: initial docs-only method structure
- Status: tagged and usable as pinned method source

## v0.1.x — Stabilization and adoption

Purpose:
Small documentation-only improvements discovered while importing dev-method into real projects.

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

## v0.2.0 — Template Pack Expansion

Trigger:
Create v0.2.0 templates only when repeated real workflow pain appears during project adoption.

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

Potential future work:
- Ollama classifier/router/risk scorer.
- n8n control-plane jobs.
- Branch cleanup automation.
- Human-gate notifications.
- Optional OpenClaw `/codex-consult` bridge.

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
