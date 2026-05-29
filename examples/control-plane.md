# examples/control-plane.md — control-plane (advanced live pilot)

## Role

**control-plane** (`mrhz1973/control-plane`) is the advanced live pilot for evolving dev-method under real orchestration pressure. It is **not** copied wholesale into dev-method.

Only **reusable** strategic patterns are promoted back into this method repo. See `patterns/operational-repo-to-method-sync.md`.

## Relation to other pilots

| Project | Role |
|---------|------|
| **GIS Tool** | First real pilot — product adoption of dev-method |
| **control-plane** | Active advanced orchestration pilot — method discovery |
| **dev-method** | Method/reference only — not runtime, not control-plane ops |

## Current imported learnings (from PROJECT_VISION v2.6)

- Remote hash verification — `patterns/remote-hash-pass-verification.md`
- Rolling implementer report — `patterns/rolling-implementer-report.md`
- Cursor prompt format contract — `patterns/cursor-prompt-format-contract.md`
- Foundation vs operational status split (vision doc + status snapshot; not duplicated here)
- Docs tasks stay explicit no-runtime / no-provider-API / no-deploy gates

## Where to read control-plane (operational source)

Read control-plane foundation docs when executing **control-plane** tasks or when syncing method. Do not read dev-method for every control-plane operational step.

Canonical operational entry: `docs/foundation/PROJECT_VISION.md` in the control-plane repo.
