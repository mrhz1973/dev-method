# CHANGELOG

## [Unreleased]

- Added control-plane advanced pilot / strategic sync policy — `patterns/operational-repo-to-method-sync.md`, `examples/control-plane.md`, README and LLMS pointers.
- Added remote hash verification rule — `patterns/remote-hash-pass-verification.md`; implementer prompt and completion evidence updated.
- Added rolling implementer report pattern — `patterns/rolling-implementer-report.md`.
- Added Cursor prompt formatting contract — `patterns/cursor-prompt-format-contract.md`.
- Clarified that reusable strategic lessons from operational repos (especially control-plane) should be promoted into dev-method when they apply across future projects.
- Added draft `core/07-orchestrator-output-format.md` and `core/07-orchestrator-output-format-validation.md` (v0.2.0 pending; not active in v0.1.x; not a release).
- Documented n8n handoff runtime compatibility in `patterns/local-handoff-generator.md` § I: `NODES_EXCLUDE=[]`, Execute Command user `root` vs `node`, `git safe.directory`, separate local/container/workflow/Telegram gates, criterion 3 cycle notes (no secrets).
- Handoff generator: completed embedded handoff hardening — `Embedded format: structured|legacy|none` metadata; `--strict-format` rejects legacy embedded prompts; legacy deprecation warning (v0.2.0 removal); structured conflict detection for TASK STATUS / Commit / Push; `TASK STATUS: in-progress` blocked; smoke tests in `tests/run-handoff-generator-smoke.mjs` and `tests/fixtures/`.
- Handoff generator: canonical embedded handoff metadata fields (`TASK STATUS`, `Operation type`, `Commit`, `Push`, `Target file(s)`, `Risk level`). Structured `Push:` / `Commit:` take precedence over legacy prose detection; output includes Task status, Operation type, Risk level, Target files, Commit authorized, and Push authorized metadata lines. `TASK STATUS: resolved` marks prompt not ready (with warning and `--require-ready` failure). Added `templates/embedded-handoff.md` reference. Backward compatible with prompts lacking canonical fields.
- Handoff generator: added ready-prompt quality guard. Generated output now includes a `Prompt ready: yes|no` metadata line; when unresolved `[TBD]` / `[TASK NOT RESOLVED]` / "human must fill in" / template skeleton placeholders are detected, a WARNING block is inserted before "## Generated prompt" with the list of reasons. New optional flag `--require-ready` exits non-zero (code 2) with a clear stderr error and skips any `--out` write when the prompt is not ready; default behavior is unchanged. Safety boundaries unchanged (still read-only, never commits/pushes/launches).
- Fixed local handoff generator inbox discovery to prefer the current top "Ultimo aggiornamento" entry and otherwise the newest referenced inbox; trim TASK_DISCOVERY_DOCS to keep adjacent prose spaced.
- Handoff generator: when the selected inbox contains a fenced copy-paste-ready prompt under a Future/handoff prompt heading, use that embedded prompt as the generated body instead of the generic template skeleton; metadata reports prompt source.
- Handoff generator: normalize embedded prompt implementer lines (`Preferred implementer:` / `Implementer:`) to match `--implementer`, or insert after `TASK:` when missing; metadata `Push authorized` reflects clear push phrases in the embedded prompt (generator still never pushes).
- Added `tools/handoff-generate.mjs`: v1 local handoff generator script; reads operational repo orchestrator docs, generates a ready-to-review IDE-agent handoff prompt, writes to stdout or an explicit output file; no npm dependencies; read-only git; never commits, pushes, launches any runner, or reads secrets.
- Added v1 script specification to `patterns/local-handoff-generator.md`: command shape, required inputs/output, safety behavior, git read-only contract, prompt assembly rules, acceptance test, and evolution boundary; updated ROADMAP.md next-target note.
- Added `patterns/local-handoff-generator.md`: pre-runner pattern for generating IDE-agent handoff prompts from operational repo orchestrator docs; added LLMS.md pointer and ROADMAP.md entry.
- Added handoff-hardening checkpoint to `ROADMAP.md`: unreleased-since-v0.1.1 summary and v0.1.2 candidate checklist.
- Added PASS + follow-up UX request rule to `patterns/qa-pass-implementer-handoff.md`; added pointer in `patterns/idea-intake-during-use.md`.
- Added completion evidence rule to `prompts/implementer-standard.md`; updated final report requirements in `templates/ide-agent-handoff-task.md`; added completion evidence note in `patterns/qa-pass-implementer-handoff.md`.
- Consistency audit: clarified push-authorization conditionality in `templates/ide-agent-handoff-task.md`; added IDE-agent template pointer in `LLMS.md` read-when-relevant table.
- Added `templates/ide-agent-handoff-task.md`: compact copy-paste template for IDE agent (Windsurf/Cascade) handoff prompts; added IDE-agent pointer in `patterns/qa-pass-implementer-handoff.md`.
- Added multi-repo workspace guard rule to `prompts/implementer-standard.md`; added pointer in `patterns/qa-pass-implementer-handoff.md`.
- Added QA PASS → implementer handoff pattern.
- Clarified authorized commit + push flow: canonical rule in `prompts/implementer-standard.md`, pointer updates in task templates, final report contract, and QA handoff pattern.

## [0.1.1] — 2026-05-19

### Added
- Added `ROADMAP.md`.
- Added large single-file / token-efficiency policy.
- Added session/repo guard pattern.
- Added idea intake during use pattern.
- Added context compaction / debug reconstruction pattern.

### Changed
- Added roadmap pointers to `README.md` and `LLMS.md`.
- Integrated session/repo guard and idea intake patterns into standard prompts and task templates.
- Integrated large-file token-efficiency policy into implementer prompt and task templates.
- Updated roadmap notes for GIS Tool adoption validation.

## [0.1.0] — 2026-05-19

Initial docs-only structure for dev-method.

- README, LLMS.md, AGENTS.md
- `core/` — principles, roles, session protocol, autonomy levels, branch safety, definition of done, gates and decision packets
- `patterns/` — B+ minimal confined, file-based task lifecycle, scheduled automation
- `adapters/` — project import, Apps Script / GAS, single-file HTML
- `examples/` — Alina Lavoro (historical), GIS Tool (first pilot), Martino target setup
- `prompts/` — orchestrator bootstrap, implementer standard
- `templates/` — project method overlay, docs-only task, runtime-gated task, final report contract, n8n job template
