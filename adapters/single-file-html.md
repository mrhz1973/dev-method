# adapters/single-file-html.md — Single-File HTML Adapter

## Single-file does not mean chaos

A single HTML file can be well-structured and maintainable.
Organize the file into clear sections using comments.

## Recommended section order

1. **Metadata / version marker** — file header, version string, build date.
2. **CSS** — all styles, embedded in `<style>`.
3. **App state** — top-level state variables and constants.
4. **Config** — user-facing configuration values.
5. **Pure utilities** — stateless helper functions (math, string, date formatting).
6. **Domain utilities** — domain-specific helpers (GIS/math, coordinate conversion, etc.).
7. **Import / export** — file read/write, data serialization.
8. **Local storage** — persistence layer wrappers.
9. **Online / offline** — network detection, connectivity-dependent logic.
10. **GPS / geolocation** — device location APIs.
11. **UI render** — DOM generation and update functions.
12. **Event handlers** — user interaction handlers.
13. **Bootstrap** — initialization and startup sequence.

## Stay single-file until it is a real bottleneck

Do not split the file into modules prematurely.
A real bottleneck is: build time impact, merge conflict frequency, or performance measurably degraded.

## Large-file / token-efficiency policy

A large single-file project must not be read wholesale by an AI agent unless there is a clear reason to do so. Token efficiency has priority over convenience.

Default workflow for large files is marker/range based. Preferred methods:

- `grep` / `Select-String` for markers, function names, IDs, event handlers, translation keys, state variables.
- Reading narrow line ranges around matched markers only.
- Targeted `git diff` for changed areas only.
- Extracting inline script blocks and running `node --check` on those blocks when applicable.
- Making small, scoped patches rather than full-file reads and rewrites.

Splitting is not automatically required to reduce token usage. Splitting is a separate architecture decision and remains gated if it changes delivery, runtime, or deployment.

Do not use token pressure alone as a reason to split the architecture. If a file becomes too large for safe AI work, first improve marker discipline, internal section comments, range-based patching, and validation commands. Only consider split when there is a real bottleneck: repeated merge conflicts, unacceptable edit risk, delivery/runtime need, or measurable maintainability failure.

## Splitting requires a gate

If splitting the file changes the project architecture (introduces a build step, changes deployment, affects how the file is distributed), that is a non-trivial architectural change and requires a human gate before proceeding.

## Version marker

Every release of a single-file HTML project must include a visible version marker in the UI and in the file header comment.
