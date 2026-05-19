# Template: Docs-Only / Cleanup / State Task

_Use this template for tasks that only create or modify documentation, configuration docs, or state files. No runtime code._

---

## Routing

- **Mode:** CODE
- **Preferred implementer:** _[Cursor CLI / Cursor Agent | Claude Code | Windsurf Cascade]_
- **Fallback implementer:** _[if applicable]_
- **Preferred model:** lightweight / standard/medium / stronger
- **Preferred effort:** low / medium / high
- **Reason:** _[one short explanation]_

---

## Scope

_[Describe what this task creates or modifies. Be specific about file names and directories.]_

## Allowed paths

_[List the directories and files the implementer is permitted to touch.]_

## Forbidden paths

_[List any directories or files the implementer must not touch.]_

## Batch size guidance

Group 6–8 coherent items into this task. Do not create separate tasks for each individual file unless they are logically unrelated.

## Content requirements

_[List content requirements for each file. Pointers to specs are acceptable.]_

## Checks

- [ ] `git diff --check` — no trailing whitespace or conflict markers
- [ ] File tree inspection: confirm all expected files exist
- [ ] _[Any project-specific checks]_

## Selective commit

Do not use `git add .`. Add only the files listed in this task.

```
git add [file1] [file2] ...
git commit -m "docs: [short description]"
```

## Final report

After committing and pushing, produce a final report using `templates/final-report-contract.md`.
