# LLMS.md — Compact Agent Entry Point

This file is the compact entry point for AI agents reading this repository.
Do not read everything by default. Use the reading order and conditional sections below.

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
| Working on a single-file HTML project | `adapters/single-file-html.md` |
| Architecting or reviewing automation | `patterns/b-plus-minimal-confined.md` |
| Working with file-based task queues | `patterns/file-based-task-lifecycle.md` |
| Working with scheduled jobs | `patterns/scheduled-automation.md` |
| Writing or reviewing orchestrator prompts | `prompts/orchestrator-bootstrap.md` |
| Writing or reviewing implementer prompts | `prompts/implementer-standard.md` |
| Understanding the role structure | `core/01-roles.md` |
| Understanding branch conventions | `core/04-branch-safety.md` |
| Checking definition of done | `core/05-definition-of-done.md` |
| Checking gate policy | `core/06-gates-and-decision-packets.md` |
| Reviewing a historical advanced case | `examples/alina-lavoro.md` |
| Working on GIS Tool | `examples/gis-tool.md` |
| Planning post-v0.1.0 work, stabilization, pilot adoption, template expansion, or future automation | `ROADMAP.md` |
| Reviewing the target physical setup | `examples/martino-target-setup.md` |

## Do not read by default

- All `examples/` files unless the current project is that example.
- All `templates/` files unless you are filling in a template.
- All `patterns/` files unless the current task involves that pattern.

## Manual routing (before Ollama is active)

Until Ollama or another automatic classifier/router is active, the **orchestrator must manually choose** mode, implementer, model, effort, and reason for each task.

Agents must not guess the operating mode. If the routing fields are missing from the task prompt, stop and ask the orchestrator to supply them.

See `prompts/implementer-standard.md` for the required routing fields.
