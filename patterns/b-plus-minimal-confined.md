# patterns/b-plus-minimal-confined.md — B+ Minimal Confined Pattern

## Overview

B+ minimal confined is a lightweight automation pattern for AI-assisted development.
It is a pattern, not a mandatory architecture. Projects may adopt all, part, or none of it.

## Component roles

| Component | Role |
|-----------|------|
| **n8n** | Control plane: scheduling, triggers, routing, notifications. Does not make domain decisions. |
| **Ollama** | Classifier / router / risk scorer / prompt compressor. Runs locally. No external API calls. |
| **Cursor CLI / Cursor Agent** | Primary implementer. Executes tasks in the repository. |
| **Claude Code** | Fallback implementer. Used when Cursor is unavailable or for tasks requiring different strengths. |
| **OpenClaw /codex-consult** | Confined high-level consult bridge. Used for design and architecture consult only — not a direct implementer. |
| **Telegram** | Human gate. Receives Decision Packets for high-risk actions. |

## Design constraints

- **Confined**: no component makes arbitrary external API calls outside approved paths.
- **Observable**: all state changes go through GitHub (commits, docs, branch changes).
- **Gated**: non-recoverable actions require a Telegram-delivered Decision Packet.
- **Local-first**: Ollama runs on local hardware. The pattern does not require cloud inference for routing.

## Manual routing before Ollama is active

Before Ollama or another automatic classifier/router is running, the orchestrator performs manual routing.
For every work block, the orchestrator must explicitly declare:
- mode (PLAN / CODE / DEBUG)
- preferred model
- effort (low / medium / high)
- reason

See `prompts/implementer-standard.md` for required routing fields.
