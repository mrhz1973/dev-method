# Pattern: Operational repo → method repo sync

## Definitions

| Term | Meaning |
|------|---------|
| **Operational repo** | Active project where rules are discovered under real pressure (e.g. `mrhz1973/control-plane`). |
| **Method repo** | Reusable reference repository where mature general rules are promoted (e.g. `mrhz1973/dev-method`). |

## Promotion rule

When control-plane (or another operational repo) changes something at **strategic/method level**, review **dev-method** and update it if the change is **reusable across future projects**.

Not required for: project-specific runtime details, transient PM states, local machine details, or one-off operational logs.

## Do not promote

- One-off PM status snapshots
- Local machine-specific paths or hostnames (except abstract examples)
- Raw runtime logs
- Secrets, tokens, credentials, private URLs, chat IDs
- Workflow IDs or n8n node names that only apply to one project (unless abstracted as a pattern example)

## Promote

- Source-of-truth rules
- Verification patterns (e.g. remote hash PASS)
- Prompt and report templates
- Gate policy improvements
- Report contracts
- Multi-repo / session safety rules
- Implementer safe local repo update during preflight (all target repos; human only on diagnostic gates)

## Required sync flow

1. Read operational repo canonical docs (foundation, not chat memory).
2. Extract reusable method delta — what would help the *next* project, not this run only.
3. Update dev-method `patterns/`, `prompts/`, `templates/` as appropriate.
4. Keep operational specifics out unless clearly marked as an example.
5. Update `README.md`, `LLMS.md`, `ROADMAP.md`, `CHANGELOG.md` when the sync is user-visible.

## Control-plane example (imported as of PROJECT_VISION v2.6)

| Learning | dev-method home |
|----------|-----------------|
| Remote hash verification guard | `patterns/remote-hash-pass-verification.md` |
| Rolling implementer report | `patterns/rolling-implementer-report.md` |
| Cursor prompt format contract | `patterns/cursor-prompt-format-contract.md` |
| Safe local update in implementer preflight | `prompts/implementer-standard.md`, `templates/ide-agent-handoff-task.md` |
| Foundation / status document split | `examples/control-plane.md` (pointer) |
| Explicit no-runtime gates for docs tasks | `core/06-gates-and-decision-packets.md` (existing) |

## Orchestrator duty

When a reusable strategic rule lands in control-plane, the orchestrator should ask: **does dev-method need a method sync?** If yes, run this flow before treating the rule as settled for future projects.

**dev-method is not the operational source of truth for control-plane; it is the reusable method memory.**
