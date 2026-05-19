# patterns/local-handoff-generator.md — Local Handoff Generator

Pre-runner automation layer. Reads an operational repo's orchestrator docs and produces a ready-to-copy IDE-agent prompt. Human reviews and pastes it; nothing executes automatically.

---

## A. Purpose

- Reduce repeated manual assembly of long handoff prompts.
- Read an operational repo's current state without modifying it.
- Produce one copy-paste prompt using `templates/ide-agent-handoff-task.md`.
- Keep human in the loop before any execution.
- Prepare for future Cursor / n8n / runner integration without activating it yet.

---

## B. Inputs

| Input | Description |
|-------|-------------|
| `OPERATIONAL_REPO` | Name of the operational repo (e.g. `mrhz1973/cursor-coordinate-converter`) |
| `OPERATIONAL_PATH` | Absolute local path to that repo |
| `METHOD_REPO_REFERENCE` | Path or pinned tag of this dev-method repo (read-only) |
| `TASK_DISCOVERY_DOCS` | Paths inside the operational repo to read: typically `docs/orchestrator/latest.md` and the latest `docs/orchestrator/inbox/*.md` named by `latest.md` |
| `EXPECTED_IMPLEMENTER` | `Windsurf/Cascade` (current), `Cursor` (future), `Claude Code` (fallback) |
| `ALLOWED_FILES` | Explicit list of files the implementer may stage |
| `FORBIDDEN_FILES` | Explicit list of files / repos the implementer must not touch |
| `COMMIT_MESSAGE` | Proposed commit message if known; otherwise `[TBD]` |
| `PUSH_AUTHORIZED` | `yes` or `no` — whether commit + push is authorized for this task |

---

## C. Output

One copy-paste prompt that:

- Uses `templates/ide-agent-handoff-task.md` as the structural skeleton.
- References `prompts/implementer-standard.md` rules by pointer — does not duplicate them.
- Fills in: operational repo, operational path, task discovery docs, expected next pass, allowed files, forbidden files, commit message, push authorization status.
- Includes all safety guards listed in § E below.
- Ends with final report requirements from `templates/ide-agent-handoff-task.md`.

The generator writes or prints this prompt. It does not execute it.

---

## D. Non-goals / forbidden behavior

The generator must NOT:

- Execute implementation.
- Modify the operational repo.
- Commit, push, deploy, tag, or release.
- Open secrets or credentials.
- Bypass the human gate.
- Choose broad refactors or scope expansions.
- Auto-run n8n, OpenClaw, or any runner.
- Call provider APIs.
- Auto-select `git add .` or unstaged additions.

---

## E. Safety checks in generated prompt

Every generated prompt must include:

- **Git root guard** — verify `git rev-parse --show-toplevel` matches `OPERATIONAL_PATH`.
- **Branch guard** — verify current branch is the authorized branch.
- **Dirty tree guard** — verify `git status --short` is clean (or note expected untracked).
- **Multi-repo workspace guard** — method repo is read-only; operational repo is the only editable target.
- **No `git add .`** — stage only `ALLOWED_FILES`.
- **Allowed files only** — do not touch `FORBIDDEN_FILES`.
- **Completion evidence rule** — task is complete only with commit hash + push result + `git status --short` after push. See `prompts/implementer-standard.md` § Completion evidence rule.
- **Stop conditions** — unexpected dirty files; rejected/non-fast-forward push; force push required; destructive operation; secret/credential; deploy/tag/release; forbidden file or repo touched.

---

## F. Minimal algorithm

1. Verify method repo docs are available (read-only).
2. Verify `OPERATIONAL_PATH` is a valid string pointing to an existing local repo.
3. Read `docs/orchestrator/latest.md` in the operational repo.
4. Read the latest relevant inbox file (named by `latest.md` or explicitly supplied).
5. Extract: next recommended pass / task title / allowed scope.
6. Fill `templates/ide-agent-handoff-task.md` placeholders with the extracted values and the inputs from § B.
7. Write or print the completed prompt.
8. Do not execute it — stop here.

---

## G. First target integration

Operational repo: `mrhz1973/cursor-coordinate-converter` (GIS Tool)

- Has `docs/orchestrator/latest.md` and `docs/orchestrator/inbox/`.
- Current validated flow: Windsurf/Cascade handoff confirmed working.
- Expected implementer: Windsurf/Cascade (now); Cursor (when available).
- The generator produces the Windsurf handoff prompt; the human pastes it.

---

## H. Next evolution

| Stage | Description |
|-------|-------------|
| **v0** | This document — manual generator spec only. Human reads it and assembles the prompt. |
| **v1** | Local script that reads operational repo docs and writes `handoff/current.md`. Human reviews and copies. |
| **v2** | Runner that can launch the IDE/CLI agent with an explicit human gate before execution. |
| **v3** | n8n orchestration with notification; PASS recording triggers next handoff build. |
| **Cursor integration** | Only after Cursor is available locally and an explicit gate is confirmed. |

Move to v1 only when v0 is validated end-to-end at least once on GIS Tool.

---

## Related

- `templates/ide-agent-handoff-task.md` — the prompt skeleton the generator fills.
- `prompts/implementer-standard.md` — all implementer rules referenced by the generated prompt.
- `patterns/qa-pass-implementer-handoff.md` — the PASS → handoff flow this generator supports.
- `ROADMAP.md` § Future automation track — where local handoff generator fits in the larger plan.
