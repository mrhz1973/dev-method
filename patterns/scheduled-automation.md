# patterns/scheduled-automation.md — Scheduled Automation

## Purpose

Guidance for building scheduled automation workflows that interact with the dev-method ecosystem.

## Core principles

### Polling, not push-only

Scheduled jobs should be designed to poll and discover state, not only react to push events.
This makes them resilient to missed webhooks or delivery failures.

### Idempotency

Every scheduled job must be idempotent: running it twice with the same inputs must produce the same result.
Write state to a durable store (e.g. a file in Git, a database row) before declaring success.

### Duplicate skip

If a job finds that the work has already been done (file exists, state already updated), it must skip silently.
Do not re-run work that is already complete.

### Notification-only workflows

Some scheduled jobs only send notifications (status reports, summaries, alerts).
These are low-risk and can auto-proceed at any autonomy level.
They must not modify project state as a side effect of notification.

### Human gate for risky actions

If a scheduled job identifies a condition that requires a risky action (deploy, rollback, credentials rotation),
it must send a Decision Packet to the human gate and **wait**.
The scheduler is not the decision-maker.

### Scheduler is not the decision-maker

The control plane (n8n) triggers and routes. It does not decide what to do with the output.
Domain decisions remain with the orchestrator or human gate.
