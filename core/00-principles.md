# core/00-principles.md — Foundational Principles

## Repository as source of truth

GitHub-hosted docs are the authoritative, persistent memory for all agents and humans.
No agent should act on assumptions; the docs are always the reference.

## LLM Wiki / Context Engineering inspired

The method borrows from LLM Wiki and Context Engineering practices:
compact, pointer-based docs that agents can read selectively and efficiently.

## Lightweight and practical, not bureaucracy-first

The method adds process only where it prevents real problems.
If a rule creates friction without safety or clarity, it should be removed.

## Batch recoverable work

Group multiple small recoverable actions into a single work block.
Do not create a gate for every step. Batching reduces noise and respects the human's attention.

## Gate irreversible work

Non-recoverable actions (deploy, rollback, credentials change, destructive deletion, production mutation) require an explicit human decision before proceeding.
See `core/06-gates-and-decision-packets.md`.

## Preserve context through checkpoints

Before a context window closes, a phase ends, a chat switches, or an implementer switches, persist a compact checkpoint.
See `core/02-session-protocol.md` for the checkpoint alias.

## Prefer progress with safety over endless confirmation loops

An agent that asks for permission at every small step is not useful.
An agent that acts on irreversible steps without a gate is dangerous.
The method targets the balance: auto-proceed on recoverable, gate on irreversible.
