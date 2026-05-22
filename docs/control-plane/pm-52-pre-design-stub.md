# PM-52 — Pre-design stub (docs-only, non implementare)

**Stato:** stub — nessuna implementazione, nessun runtime in questo gate.

---

## Ammissione

- **PM-52 è ammesso solo dopo PM-51 PASS** registrato su macchina casa.
- Con PM-51 non eseguito, FAIL, PARTIAL o AUTH_REQUIRED: **non** aprire lavoro PM-52 oltre a questo stub.

---

## Natura di PM-52

| Aspetto | Intenzione |
|---------|------------|
| Tipo | **Bridge design** — documentazione e confini, **non** runtime |
| Scopo | Definire come il control plane consuma artefatti **validati**, non output grezzo OpenClaw |
| Esecuzione | Nessuna esecuzione PM-52 in questo stub |

---

## Obiettivi di design (da definire in gate futuro)

1. **Adapter** — formato canonico tra OpenClaw e control plane.
2. **Validator** — regole per rifiutare payload non conformi o con segnali di segreto.
3. **Artifact GitHub** — dove e come si pubblicano esiti (repo, path, branch policy).

---

## Vincoli obbligatori (già decisi)

- **Vietato** consumo diretto di **raw OpenClaw output** in **n8n** (o automazioni equivalenti) senza passaggio adapter/validator.
- **Worker:** resta **disabled** finché non esiste un **gate separato** che lo autorizza esplicitamente.
- **Workflow 40 / 41:** restano **frozen** durante PM-52 design.
- **PM-34:** PM-52 **non deve eseguire** né sbloccare PM-34.

---

## Fuori scope di questo stub

- Implementare adapter, validator o job n8n.
- Abilitare worker, Telegram, OpenRouter, Gemini.
- Modificare workflow 40/41 o GIS/Alina.

---

## Riferimenti

- PM-51 runbook: `docs/control-plane/pm-51-runbook-light.md`
- Backlog: `docs/control-plane/backlog-status.md`
