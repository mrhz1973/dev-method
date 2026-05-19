# examples/martino-target-setup.md — Personal Target Setup

This file documents the personal target setup of `mrhz1973`.
It is not a requirement of `dev-method`.
It is a concrete example of physical mapping for the B+ minimal confined pattern.

## Component mapping

| Role | Physical target |
|------|----------------|
| Source of truth | GitHub (`mrhz1973/*`) |
| Control plane | VPS IONOS — n8n, Telegram bot, GitHub webhook receiver, `iter/*` cleanup jobs |
| High-level consult bridge | Dell Latitude 5430 — OpenClaw `/codex-consult` (confined, not a direct implementer) |
| Primary implementer (worker) | Dell Latitude 5430 — Cursor CLI / Cursor Agent |
| Lightweight local inference fallback | Dell Latitude 5430 — Ollama (lightweight models) |
| Connectivity | Dell Latitude 5430 — Tailscale (secure tunnel to VPS and home network) |
| Primary heavier inference | PC Ryzen + RTX 3060 — Ollama (heavier models) |
| Human gate | Telegram (mobile) |
| Primary implementer (default) | Cursor |
| Fallback implementer | Claude Code |

## Notes

- The Dell Latitude is the primary mobile worker machine.
- The Ryzen PC handles heavier Ollama inference when available (connected to home network or via Tailscale).
- The VPS handles always-on automation only — no heavy inference on VPS.
- OpenClaw on the Dell is a consult bridge: it receives queries and returns analysis. It does not commit, push, or modify repositories directly.
