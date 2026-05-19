# core/04-branch-safety.md — Branch Safety

## Branch naming conventions

| Branch | Purpose |
|--------|---------|
| `main` | Stable, protected. Never mutated directly for experimental or risky work. |
| `iter/<number-or-task-slug>` | Temporary automatic branch for a single iteration or task. |
| `task/<id>-<slug>` | Structured task branch. Use for tracked work items with a clear ID. |
| `release/<version>` | Release preparation branch. |
| `hotfix/<slug>` | Urgent isolated fix. Merged to main with gate if production-impacting. |

## Retention policy

- **Weekly cleanup** of stale temporary branches.
- **Maximum 20 temporary branches** (`iter/*`) at any time.

## Never delete a branch that has any of the following

- Open pull request
- Active task in progress
- Missing evidence pack for completed task
- Pending human gate decision
- Rollback candidate (last known good state)
- Is `main`, a `release/*` branch, or carries a stable tag
- Was manually named by the user (not auto-generated)

When in doubt, do not delete. Flag the branch for human review instead.
