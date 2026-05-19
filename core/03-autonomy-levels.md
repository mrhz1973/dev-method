# core/03-autonomy-levels.md — Autonomy Levels

## Level 0 — Manual

Every action requires explicit human approval before execution.
No auto-proceed, no batching without confirmation.
Use for onboarding, untested environments, or any situation where trust has not been established.

## Level 1 — Low-touch supervised

Recoverable actions can proceed with brief human acknowledgment.
Non-recoverable actions still require explicit approval.
Suitable for early-stage projects or unfamiliar codebases.

## Level 2 — Recommended path auto-proceed

Recoverable actions on known-safe paths proceed automatically without per-step confirmation.
Non-recoverable or high-risk actions require a human gate.
Suitable for established projects with a clear roadmap and branch safety rules.

## Level 3 — Human gate only for high-risk decisions

Full auto-proceed rules:
- **Recoverable actions** — auto-proceed without asking.
- **Risky-but-recoverable actions** — auto-proceed only on an isolated branch (never on `main` directly).
- **Non-recoverable / high-risk actions** — require human gate before execution. See `core/06-gates-and-decision-packets.md`.

Level 3 is the target for mature projects with proven safety patterns.

## Manual routing requirement (independent of level)

Before an automatic classifier/router such as Ollama is active, the autonomy level controls *what* can auto-proceed, but the orchestrator must still **manually declare** mode, implementer, model, effort, and reason for each routed task.

Autonomy level and automatic routing are separate concerns.
