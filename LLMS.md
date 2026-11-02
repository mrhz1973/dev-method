# LLMS.md — Compact Agent Entry Point

This file is the compact entry point for AI agents reading this repository.
Do not read everything by default. Use the reading order and conditional sections below.

## Select the method before starting reverse engineering

Owner routing directive, 2026-11-01: read [`METHODS.md`](METHODS.md), then `domains/reverse-engineering/README.md`, then exactly one of `adapters/scanruler/README.md` or `adapters/fusion/README.md`. Read the current project's own manifest/handoff and repository ref next. Do not infer engine from the historical repository name, and do not import another part's dimensions or task state. Registry `method-registry.json` distinguishes available method entries from a pending physical repository split. New projects can use `templates/re-project-bootstrap.md`; placeholders are not verified configuration. This routing change does not merge draft pilots or alter existing stable tags.

## Required reading order

1. `README.md` — what dev-method is
2. `core/00-principles.md` — foundational rules
3. `core/02-session-protocol.md` — session aliases and semantics
4. `core/03-autonomy-levels.md` — what autonomy level applies to the current task
5. Project-specific `docs/METHOD.md` when dev-method is imported into another project

## Read when relevant

| When | Read |
|------|------|
| Starting a new project integration | `adapters/project-import.md` |
| Working on a GAS/Apps Script project | `adapters/apps-script-gas.md` |
| Working on a single-file HTML project or any large single file | `adapters/single-file-html.md` |
| Architecting or reviewing automation | `patterns/b-plus-minimal-confined.md` |
| Working with file-based task queues | `patterns/file-based-task-lifecycle.md` |
| Working with scheduled jobs | `patterns/scheduled-automation.md` |
| Writing or reviewing orchestrator prompts | `prompts/orchestrator-bootstrap.md` |
| Writing or reviewing orchestrator output behavior / NEXT-WAIT-DONE format | `core/07-orchestrator-output-format.md` (v0.2.0 pending, not active in v0.1.x); validation log: `core/07-orchestrator-output-format-validation.md` |
| Writing or reviewing implementer prompts | `prompts/implementer-standard.md` |
| Understanding the role structure | `core/01-roles.md` |
| Understanding branch conventions | `core/04-branch-safety.md` |
| Checking definition of done | `core/05-definition-of-done.md` |
| Checking gate policy | `core/06-gates-and-decision-packets.md` |
| Reviewing a historical advanced case | `examples/alina-lavoro.md` |
| Working on GIS Tool | `examples/gis-tool.md` |
| control-plane strategic/method sync (promote reusable rules into dev-method) | `patterns/operational-repo-to-method-sync.md`, `examples/control-plane.md` |
| Remote hash PASS verification | `patterns/remote-hash-pass-verification.md` |
| Rolling post-push implementer report on GitHub | `patterns/rolling-implementer-report.md` |
| Cursor copy-paste prompt formatting | `patterns/cursor-prompt-format-contract.md`, `prompts/implementer-standard.md` |
| Multiple repos, sessions, or workstations are active | `patterns/session-and-repo-guard.md` |
| Context was compacted mid-debug or resuming a DEBUG task after compaction | `patterns/context-compaction-debug-reconstruction.md` |
| Handling user ideas, bugs, or feature requests found during app usage | `patterns/idea-intake-during-use.md` |
| Choosing whether to build globally, fix a critical local issue, measure uncertainty or defer; defining context-specific acceptance and revisiting stalled work | `patterns/context-adaptive-execution-and-acceptance.md`; optional `templates/contextual-acceptance-record.md` (candidate pilot, not a universal mandate) |
| Organizing actual Codex subagents for ScanRuler reverse engineering with one live executor per session | `patterns/scanruler-subagent-orchestration.md`; task prompts `prompts/codex-airbox-subagents.md` and `prompts/codex-stl2-subagents.md` (scoped pilot; no Auto-Vai activation) |
| Reviewing evidence from Airbox vs Tubo Finale before promoting an adaptive RE workflow | `examples/scanruler-airbox-tubo-context-pilot.md` |
| Defining what happens after user confirms a manual test PASS | `patterns/qa-pass-implementer-handoff.md` |
| Writing an IDE agent (Windsurf/Cascade/Cursor) handoff prompt | `templates/ide-agent-handoff-task.md` |
| Planning prompt-generation or runner automation for IDE-agent handoffs | `patterns/local-handoff-generator.md` |
| Planning post-v0.1.0 work, stabilization, pilot adoption, template expansion, or future automation | `ROADMAP.md` |
| Reviewing the target physical setup | `examples/martino-target-setup.md` |
| CONTROL PLANE / OpenClaw PM gates (44–51), PM-51 prep, Windows-native OpenClaw | `docs/control-plane/operating-memory.md`, `docs/openclaw/windows-native-notes.md`, `docs/control-plane/backlog-status.md` |
| Executing or handoff PM-51 at home (runbook, matrix, new chat) | `docs/handoffs/pm-51-openclaw-confined-gateway-noop-probe-new-chat.md` (copiabile), `docs/control-plane/pm-51-runbook-light.md`, `docs/control-plane/pm-51-decision-matrix.md` |
| PM-52 after PM-51 PASS (design stub only) | `docs/control-plane/pm-52-pre-design-stub.md` |
| Recording a future PM-51 home execution (after real run only) | `docs/runtime-packets/templates/pm-51-execution-record.md` |

## control-plane vs dev-method

- **control-plane operational tasks** read control-plane foundation docs (`PROJECT_VISION`, task PM, runtime docs). Do not load all of dev-method for every control-plane step.
- **dev-method** is read when importing **reusable** method patterns into this repo or when another project pins dev-method as its method source.
- When a **reusable strategic rule** lands in control-plane, the orchestrator should review whether dev-method needs a method sync (`patterns/operational-repo-to-method-sync.md`).

## Do not read by default

- All `examples/` files unless the current project is that example (GIS Tool, control-plane pointer, Alina Lavoro, etc.).
- All `templates/` files unless you are filling in a template.
- All `patterns/` files unless the current task involves that pattern.

## Release pinning

Stable consumers should pin to tags (e.g. `v0.1.0`), not `main`. `main` may contain release-candidate changes before the next tag.

## Manual routing (before Ollama is active)

Until Ollama or another automatic classifier/router is active, the **orchestrator must manually choose** mode, implementer, model, effort, and reason for each task.

Agents must not guess the operating mode. If the routing fields are missing from the task prompt, stop and ask the orchestrator to supply them.

See `prompts/implementer-standard.md` for the required routing fields.
