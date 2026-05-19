# patterns/session-and-repo-guard.md — Session / Repo Guard

## Problem

Multiple implementer sessions may be open at the same time across different repos and workstations. Wrong-repo work is a high-friction, hard-to-reverse risk. Local paths differ across machines.

## Required header

Every shell-guided step or implementer prompt must declare:

```
SESSION / REPO GUARD:
- Repo:          <repo-name>
- Local path:    <absolute local path>
- Current task:  <task title or ID>
- Allowed scope: <files or dirs in scope>
- Do not use:    <other open repos or sessions>
```

## Rules

- No shell command without an explicit path when multiple repos or workstations are active.
- No clone if the user confirms the local folder already exists.
- No pull / commit / push / reset / clean before validating: repo top-level, remote URL, branch, and status.
- When the user writes a generic refresh command, the orchestrator must know whether it applies to one repo or all active repos before proceeding.

## Refresh aliases (example convention)

| User writes | Meaning |
|-------------|---------|
| `aggio dev` | Check and refresh dev-method only |
| `aggio gis` | Check and refresh GIS Tool only |
| `aggio`     | Check and refresh all declared active repos |

The orchestrator must resolve which repos are "active" before executing any refresh alias.

## Enforcement

Implementers must stop and ask the orchestrator for clarification if the repo, local path, or scope is ambiguous. Do not guess.
