# §METHOD-AGG-001 — Canonical refresh alias

Date: 2026-10-25. Owner-requested method change; documentation only.

## Decision

Use `agg` instead of `aggio` as the standard command in every project and role. Keep old spellings compatible for historical chats. The main orchestrator is refreshed first; the delegated Work/IDE agent is refreshed after the new direction has been published. Both perform real GitHub reads. Reading repository files alone is insufficient: include current task conversations and reviews, with instruction acknowledgment.

## Scope and safeguards

Updated entry instructions, the canonical session protocol, orchestrator bootstrap and repo/format patterns. Existing release tags, other repositories, runtime tools and historical records are unchanged. Older pinned consumers require an explicit project override linked to the exact new commit; this is not a new stable release. No timer, automation, chat activation or live CAD permission is introduced.

The current implementer prompt's historical `aggio` return examples remain accepted aliases under the canonical protocol. New prompts use `agg`. Draft output-format documents are not activated by this change.

## Review scenarios

These are acceptance criteria for agent behavior, not claims of executed cross-chat automation tests.

- `agg` in a one-project main chat: read task/report/head and current review conversation; publish an updated direction only if needed.
- `agg` in Work: read and acknowledge the authorized direction, then resume only an already delegated permitted block.
- Owner order: orchestrator first, Work after verified publication; no assumption of automatic delivery.
- Work refreshed early: report the latest actual instruction, never an unpublished future one.
- `agg <target>`: read only a declared target; ambiguous targets stop for clarification.
- `aggio`: same behavior, compatibility only.
- Edited previously read review: detect and acknowledge the edit, not only new IDs.
- Repeated identical direction: no duplicate side effects or replay.
- Untrusted comment or expired authorization: no privilege escalation.
- Dirty local clone: no implicit checkout/pull/reset.
- GitHub access failure: refresh not completed; report the limit.
- `auto-agg`: event-driven only; no timer without separate authorization and available executor.

## Verification boundary

Remote commit/diff reread is required before merging. This change defines behavior; it does not demonstrate that an already open agent has loaded it. Consuming projects must record their own acknowledgment.
