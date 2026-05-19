# adapters/apps-script-gas.md — Google Apps Script / GAS Adapter

## Source vs snapshot

Google Apps Script projects have two representations:
- **Real source** — files managed in Git (`.gs`, `.html`, `.json` manifest).
- **Generated / current snapshot** — the live script in Google's editor, possibly modified directly there.

Do not treat a generated snapshot as the source of truth unless the project-specific overlay explicitly says so.
The real source is always the Git-tracked version.

## /dev vs /exec

- **`/dev`** deployment — used during development, points to the HEAD deployment, not a versioned one.
- **`/exec`** deployment — a versioned, production deployment. Treat this as production.

Always distinguish which deployment a test or action is targeting.

## Deploy, tag, rollback require gate

Any of the following require a human gate (Decision Packet):
- Creating a new versioned `/exec` deployment
- Rolling back to a previous deployment version
- Rotating credentials or service account keys

These are non-recoverable or production-impacting actions.

## Manifest and permissions

Changes to the `appsscript.json` manifest that add OAuth scopes require a gate, as they may require re-authorization by end users.
