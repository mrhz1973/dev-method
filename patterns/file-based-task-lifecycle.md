# patterns/file-based-task-lifecycle.md — File-Based Task Lifecycle

## Purpose

An optional pattern for representing task state as files in the repository.
Useful when automation (e.g. n8n) needs to observe task state without a database.

## This is a pattern, not core

Core only requires generic task states: `planned`, `active`, `done`, `failed`, `blocked`.
The file lifecycle pattern is one way to implement those states in a GitHub-observable way.

## Lifecycle stages

```
queue/       — tasks waiting to be picked up
processing/  — tasks currently being worked on by an implementer
done/        — tasks completed (evidence pack present)
failed/      — tasks that failed (failure reason documented)
```

## Usage guidelines

- Each task is a single file (e.g. `queue/task-042-fix-gps-drift.md`).
- Moving a file from `queue/` to `processing/` signals that work has started.
- Moving a file to `done/` is part of the `finito` sequence.
- Moving a file to `failed/` requires a documented reason in the file.
- The file name should be stable across stages (do not rename except for stage prefix changes).

## When to use this pattern

- When a control plane (n8n) needs to poll for new tasks by watching file changes.
- When multiple implementers need to coordinate without a shared database.
- When task history must be visible in Git history.

## When to skip this pattern

- Small single-implementer projects where a roadmap file is sufficient.
- Projects that use an issue tracker or external task management system.
