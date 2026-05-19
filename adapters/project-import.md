# adapters/project-import.md — Project Import

## v0.1 Import Strategy

### No submodule by default

Do not add dev-method as a Git submodule to importing projects.
Submodules add complexity and are not needed for docs-only reference.

### No vendored copy by default

Do not copy dev-method files into the importing project.
A copy diverges silently and loses traceability.

### Use pinned pointer links

The importing project creates `docs/METHOD.md` and includes pinned links to the relevant dev-method files.

Links must point to a declared tag, not to `main`.

**Good:**
```
https://github.com/mrhz1973/dev-method/blob/v0.1.0/core/02-session-protocol.md
```

**Bad:**
```
https://github.com/mrhz1973/dev-method/blob/main/core/02-session-protocol.md
```

**Reason:** `main` evolves. Project overlays must be reproducible and must not silently change when dev-method is updated.

## docs/METHOD.md

The importing project's `docs/METHOD.md` must declare:
- dev-method version/tag used (e.g. `v0.1.0`)
- pinned links to referenced core files
- project-specific overrides (gates, autonomy level, adapters in use)
- what does not apply to this project

See `templates/project-method-overlay.md` for the template.
