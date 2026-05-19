# AGENTS.md

See [`LLMS.md`](./LLMS.md) for reading order and navigation.

## Minimal rules for all agents

- **Do not invent project state.** Read the source of truth (GitHub docs, METHOD.md, roadmap).
- **Use source of truth.** If it is not in the docs, ask or stop. Do not assume.
- **Use isolated branches for risky recoverable changes.** Never mutate main directly for experimental or risky work.
- **Require human gate for non-recoverable or high-risk actions.** See `core/06-gates-and-decision-packets.md`.
- **Do not commit secrets.** No tokens, credentials, API keys, private URLs, or personal data in any committed file.
