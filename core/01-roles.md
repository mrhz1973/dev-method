# core/01-roles.md — Roles

## Role definitions

- **High-level orchestrator** — reads the roadmap, breaks work into blocks, routes tasks to implementers, decides mode/model/effort, calls gates when required.
- **Primary implementer** — executes the task: reads docs, creates/edits files, runs checks, commits selectively, pushes, produces the final report.
- **Fallback implementer** — used when the primary is unavailable or the task requires a different tool.
- **Optional reviewer / mini-orchestrator** — reviews output before merge or before a gate; may also coordinate sub-tasks within a work block.
- **Classifier / router / risk scorer** — analyzes the task, assigns mode, estimates risk level, recommends implementer and model. Reduces manual routing overhead.
- **Control plane** — automates scheduling, triggers, routing, and notification workflows. Does not make domain decisions.
- **Human gate** — the human who approves or rejects high-risk decisions. Receives a compact Decision Packet. See `core/06-gates-and-decision-packets.md`.

## Target role mapping

| Role | Target |
|------|--------|
| Primary implementer (default) | Cursor CLI / Cursor Agent |
| Fallback implementer | Claude Code |
| Classifier / router / risk scorer | Ollama |
| Control plane | n8n |
| Human gate | Telegram |

## Manual routing before Ollama is active

Until Ollama or another automatic classifier/router is active, the **high-level orchestrator manually selects** implementer mode, preferred model, effort, and reason before routing each work block to an implementer.

See `prompts/implementer-standard.md` for required routing fields.
