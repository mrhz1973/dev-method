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
- Generic refresh scope must be resolved by the receiving agent, whether orchestrator or implementer, before proceeding.

## Refresh aliases

Canonical spelling: **`agg`**. Follow [`core/02-session-protocol.md`](../core/02-session-protocol.md) for the read and acknowledgment contract.

| User writes | Meaning |
|-------------|---------|
| `agg dev` / `agg dev-method` | Refresh dev-method only, when these target aliases are declared |
| `agg gis` | Refresh GIS Tool only, when that target alias is declared |
| `agg <target>` | Refresh only the explicitly mapped target |
| `agg` | Refresh the current single-project scope, or the explicitly declared active set in a multi-project orchestrator |

Legacy `aggio` forms retain identical semantics. New prompts use `agg`. Unknown targets require clarification, not access to unrelated repositories.

Refresh includes the active task head, GitHub conversation comments, review submissions and inline reviews. A clean local main does not prove it contains an unmerged task branch. The implementer must read and acknowledge authorized new directions before continuing its delegated block.

In two-chat coordination, the owner sends `agg` to the main orchestrator first, then to Work/the implementer after publication of the directive. Each chat reports the latest instructions it actually read. No implicit timer, cross-chat message, merge, cleanup or CAD authorization is created.

## Enforcement

Implementers must stop and ask the orchestrator for clarification if the repo, local path, or scope is ambiguous. Do not guess.
