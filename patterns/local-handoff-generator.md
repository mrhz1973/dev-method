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

## v1 local script specification

**Status: specification only — not yet implemented.**

### 1. Purpose

A local script that generates a ready-to-review handoff prompt file. Still pre-runner: human reads the output, copies it, and pastes it into the IDE agent session. The script does not launch an implementer and does not modify the operational repo (except writing the output file if configured to do so).

### 2. Suggested command shape

```
handoff-generate \
  --repo   <OPERATIONAL_PATH> \
  --method <METHOD_PATH> \
  --implementer windsurf \
  --out    <OPERATIONAL_PATH>/docs/orchestrator/handoff/current.md
```

All flags are positional or named. `--out` is optional; default is stdout.

### 3. Required inputs

| Flag / input | Required | Description |
|---|---|---|
| `--repo` | yes | Absolute path to the operational repo |
| `--method` | yes | Path or pinned-tag reference to dev-method (read-only) |
| `--implementer` | yes | `windsurf` \| `cursor` \| `claude-code` |
| `--out` | no | Output file path; defaults to stdout |
| `--next-pass` | no | Override the expected-next-pass value extracted from discovery docs |
| `--commit-msg` | no | Override the proposed commit message |

Discovery docs are always read from the operational repo at fixed paths:
- `docs/orchestrator/latest.md` (required)
- `docs/orchestrator/inbox/<file named by latest.md>` (required if resolvable)

### 4. Required output

The script writes one file (or stdout) containing:

```
# Handoff prompt — generated <ISO-8601 timestamp>

Operational repo:   <OPERATIONAL_REPO>
Operational path:   <OPERATIONAL_PATH>
Implementer target: <windsurf | cursor | claude-code>
Method reference:   <METHOD_PATH or tag>
Discovery docs:     <list of docs read>

---

## Human review required before paste / execute

Review the generated prompt below. Do not paste it into an IDE agent without reading it.

---

## Generated prompt

<filled-in contents of templates/ide-agent-handoff-task.md>

---

## Safety summary

- Git root guard: included
- Branch guard: included
- Dirty tree guard: included
- Multi-repo workspace guard: included
- No git add .: included
- Completion evidence rule: included
- Stop conditions: included
```

### 5. Safety behavior

The script must:

- Only read files in the operational repo and the method repo.
- Never edit any file in the operational repo except writing the designated output file when `--out` is inside the operational repo.
- Never stage, commit, push, deploy, tag, release, reset, clean, stash, delete, or force-push.
- Never read secrets, credentials, `.env`, or token files.
- Never call provider APIs.
- Never launch n8n, OpenClaw, Windsurf, Cursor, Claude Code, or any runner.
- Stop with a clear error if `--repo` path is missing or is not a git repository.
- Warn (do not fail) if discovery docs cannot resolve a next-task candidate — output the prompt with `[TASK NOT RESOLVED — human must fill in]` placeholders.

### 6. Git behavior

The script may run these read-only git commands inside the operational repo:

```
git rev-parse --show-toplevel
git branch --show-current
git status --short
git log -1 --oneline
```

It must not run any mutating git command.

### 7. Prompt assembly rules

The generated prompt must:

- Use `templates/ide-agent-handoff-task.md` as the structural skeleton.
- Reference `prompts/implementer-standard.md` by pointer — do not inline those rules.
- Include the completion evidence rule (pointer to `prompts/implementer-standard.md` § Completion evidence rule).
- Include the multi-repo workspace guard.
- Specify `no git add .` explicitly.
- List `ALLOWED_FILES` and `FORBIDDEN_FILES` extracted from discovery docs or left as `[TBD — human must fill in]`.
- Include `PUSH_AUTHORIZED: yes` only if the discovery docs or `--commit-msg` flag explicitly authorize push; default to `no`.

### 8. Acceptance test for v1 implementation

Future dry-run test using GIS Tool:

| Field | Value |
|---|---|
| Input repo | `C:\Users\mrhz\Documents\AI\GitHub\cursor-coordinate-converter` |
| Method repo | `C:\Users\mrhz\Documents\AI\GitHub\dev-method` |
| Implementer | `windsurf` |
| Expected output | `docs/orchestrator/handoff/current.md` written inside the operational repo |
| Pass condition | Prompt generated; no code executed; no commit/push; no runtime actions; output contains all safety guards; human review notice present |

### 8a. Canonical embedded handoff fields

Embedded inbox prompts may include structured lines near the top (first matching line wins). See `templates/embedded-handoff.md` for the full reference.

| Field | Purpose |
|-------|---------|
| `TASK STATUS:` | `pending` \| `resolved` only — `resolved` marks not ready; `in-progress` is rejected |
| `Operation type:` | `code-change` \| `docs-only` \| `record-pass` \| `plan` \| `fix` \| `refactor` |
| `Commit:` | `authorized` \| `not authorized` — metadata only; generator never commits |
| `Push:` | `authorized` \| `not authorized` — takes precedence over legacy prose detection |
| `Target file(s):` | explicit paths or `docs-only` |
| `Risk level:` | `low` \| `medium` \| `high` |

Generated output reports these as metadata lines plus `Embedded format: structured|legacy|none`. Conflicting structured `TASK STATUS` / `Commit` / `Push` values are hard errors. `--strict-format` rejects legacy embedded prompts. Legacy prose fallback when `Push:` is absent remains available but is marked deprecated (removal planned v0.2.0). Smoke tests: `node tests/run-handoff-generator-smoke.mjs`.

### 8b. Ready-prompt quality guard

The v1 script must distinguish a ready actionable handoff from an incomplete skeleton that still needs human completion.

- **Detection** — inspects the assembled prompt for unresolved markers (`[TBD`, `[TASK NOT RESOLVED`, template skeleton markers) and for `TASK STATUS: resolved` (not an actionable implementation handoff).
- **Metadata** — output always includes a `Prompt ready: yes` or `Prompt ready: no — …` line in the header (`unresolved placeholders present` or `task status is resolved`).
- **Warning block** — when the prompt is not ready, a `## WARNING — prompt not ready` section is inserted before `## Generated prompt`, listing the reasons.
- **`--require-ready` flag** — optional. When set and the prompt is not ready: the script writes a clear stderr error listing the unresolved markers, exits non-zero (code `2`), and does not write `--out`.
- **Default behavior** — when `--require-ready` is not used, the script still prints / writes the output even if the prompt is not ready; the embedded `Prompt ready: no` line and WARNING block make the state explicit.
- **Safety boundary** — the readiness guard is observational only. It never commits, pushes, deploys, tags, releases, launches a runner, or reads secrets.

### 9. Evolution boundary

- **v1** — generates files only; no execution.
- **v2** — may launch IDE/CLI agent only with an explicit human-confirmed gate (not automatic).
- **v3** — may integrate n8n notifications; PASS events may trigger v1 generation automatically, but launch remains gated.
- **Cursor integration** — waits until Cursor is locally available and explicitly authorized by the user.

---

## Related

- `templates/ide-agent-handoff-task.md` — the prompt skeleton the generator fills.
- `templates/embedded-handoff.md` — canonical fields for embedded inbox handoff prompts.
- `prompts/implementer-standard.md` — all implementer rules referenced by the generated prompt.
- `patterns/qa-pass-implementer-handoff.md` — the PASS → handoff flow this generator supports.
- `ROADMAP.md` § Future automation track — where local handoff generator fits in the larger plan.
