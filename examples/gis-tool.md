# examples/gis-tool.md — GIS Tool (First Real Pilot)

## Role

GIS Tool is the first real pilot project using dev-method. It is not a demo.

## Profile

- **Autonomy level:** Level 2.5 / Level 3-track
- **Development model:** roadmap-driven, branch-based, batch-oriented
- **Testing:** manual test only at milestone boundaries
- **Branch granularity:** one branch = one small milestone
- **Milestone size:** 3–6 coherent tasks
- **Manual test gate:** end of each milestone

## Auto-proceed policy

The following approved actions auto-proceed without a gate:
- Map feature implementation (approved feature set)
- GPS local use (device location, no external transmission)
- Online/offline detection and switching
- Local storage read/write
- Local import/export

## Gate required

The following require a human gate:
- New external risk not previously approved
- GPS data transmission to external service (unless already approved)
- Cloud sync of any kind
- Remote import/export
- Silent background upload (always forbidden)

## Online/offline policy

- **Online** means approved transmissions only — no hidden calls.
- **Offline** means no data transmission of any kind.

## Version marker

Every manual test at a milestone must show a visible version marker in the UI.

## Issue policy (docs/ISSUES.md in GIS Tool project)

Lightweight issue tracking alongside the roadmap.

**Severity:** `critical` / `high` / `medium` / `low` / `idea`

**Status:** `open` / `fixing` / `fixed` / `deferred` / `deferred_by_user` / `accepted_known_issue` / `rejected`

**Priority rule:** roadmap-first. Issues can override roadmap order only when severity is `critical` or `high`.

## Stop-the-line policy

Stop work only for:
- Safety risk
- Data loss risk
- Privacy violation
- Unrecoverable failure
- Explicit user stop

A milestone must be **usable and safe**, not perfect. Ship it, then continue.
