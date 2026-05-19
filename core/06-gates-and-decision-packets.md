# core/06-gates-and-decision-packets.md — Gates and Decision Packets

## When to gate

| Action type | Gate required? |
|-------------|---------------|
| Recoverable work (docs, code on isolated branch, reversible config) | No |
| Risky-but-recoverable work on isolated branch | No — auto-proceed on branch |
| Non-recoverable / high-risk action | **Yes — human gate required** |

## Decision Packet

A Decision Packet is a compact message sent to the human gate.
It contains only what is needed to make the decision:
- What action is about to happen
- Why it is needed
- What it will change (exact command or file if applicable)
- What happens if the human says no
- What happens if the human says yes

Do not send a Decision Packet for recoverable work.
Do not accumulate multiple high-risk decisions into one packet. One gate at a time.

## Delivery channel

Telegram (or equivalent human-reachable channel) is the target for high-risk gate notifications.
The gate policy (which actions trigger it, which channel to use) must be easy for the user to modify.

## High-risk examples

The following actions always require a human gate:

- Deploy to any environment
- Rollback in production
- Any credentials, token, or secret change
- Actions that incur provider costs
- Silent or background data transmission to external services
- Destructive deletion of non-recoverable data
- Privacy-sensitive data transmission
- Any action that is production-impacting and irreversible
