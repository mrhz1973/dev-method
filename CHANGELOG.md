# CHANGELOG

## [Unreleased]

- Fixed local handoff generator inbox discovery to prefer the current top "Ultimo aggiornamento" entry and otherwise the newest referenced inbox; trim TASK_DISCOVERY_DOCS to keep adjacent prose spaced.
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
