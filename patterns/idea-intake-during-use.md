# patterns/idea-intake-during-use.md — Idea Intake During Use

## Problem

The user discovers bugs, UX ideas, and feature requests while using the app live. Acting immediately on every idea derails the active work block. Ignoring ideas loses valuable feedback.

## Flow

```
Idea while using app
→ capture (write it down)
→ classify (see below)
→ route (see below)
→ act: batch / issue / roadmap / gate / immediate fix only if blocking
```

## Classification

| Label | Meaning |
|-------|---------|
| `BUG` | Something is broken or incorrect |
| `UX` | Interaction, layout, or usability friction |
| `FEATURE` | New capability not currently present |
| `RISK/GATE` | Touches privacy, storage, GPS, network, external API, or destructive action |
| `IDEA` | Vague improvement, unclear scope |

## Routing

| Classification | Action |
|----------------|--------|
| Blocking bug | Stop current work, debug immediately |
| Non-blocking bug | Log as issue, add to next fix batch |
| Small UX improvement | Add to next recoverable batch |
| Larger feature | Add to roadmap |
| `RISK/GATE` item | Capture, do not implement — requires human gate |
| Unclear idea | Capture only, classify later, do not implement immediately |

## Specific rules

- During QA: log new ideas unless they directly block the QA result. Do not open unrelated work.
- During milestone closure: avoid starting unrelated work. Capture and defer.
- When the user says **"nota questa modifica: …"** the orchestrator classifies it and routes it without interrupting the active task unless the classification is blocking or `RISK/GATE`.

## Principle

Capture everything. Act on only what is blocking or gated. Defer the rest to the next planned batch or roadmap entry.
