# PM-51 — Decision matrix (docs-only)

Usare **dopo** i controlli reali a casa. Non pre-compilare PASS/FAIL nel repo di preparazione.

Ordine consigliato: **invalid test** → **segreti** → **segnali tecnici** → **classificazione finale**.

---

## Test invalido (fermarsi, non classificare come PM-51 valido)

| Condizione | Classificazione | Azione |
|------------|-----------------|--------|
| n8n usato durante il test | **Invalid test** | Ripetere senza n8n; non registrare PASS |
| Worker abilitato / implementer lanciato | **Invalid test** | Ripetere con worker off |
| Workflow 40 o 41 modificati o eseguiti | **Invalid test** | Ripristinare freeze; ripetere |
| LAN / Tailscale / Funnel esposto per il gateway | **Invalid test** | Solo loopback `127.0.0.1` |
| Eseguito su PC lavoro invece che casa | **Invalid test** | Ripetere su macchina casa, user `mrhz` |

---

## Segreti (priorità massima)

| Condizione | Classificazione | Azione |
|------------|-----------------|--------|
| Output contiene token, API key, OAuth code, access/refresh token | **STOP** | Non committare output; non incollare in chat; redigere e ripetere solo parti sicure |
| HTTP 401 e tentazione di incollare header `Authorization` | **AUTH_REQUIRED** | Registrare solo “401, token non incluso”; non copiare token |

---

## Segnali tecnici

| Condizione | Classificazione | Note |
|------------|-----------------|------|
| `netstat`: `127.0.0.1:18789` **LISTENING** + HTTP **200** + `status` coerente (OK) | **PASS candidate** | Confermare attestazioni invalid-test = no; poi registrare PASS nel packet |
| `netstat` LISTENING + `/health` (o path health) **404** + `status` OK | **PARTIAL** | Endpoint health assente/non esposto; gateway listen OK — documentare, non mascherare come FAIL se listen+status OK |
| `netstat` LISTENING + HTTP **401** | **AUTH_REQUIRED** | Gateway in ascolto; auth richiesta — **non** copiare token nel record |
| `connection refused` su probe HTTP | **FAIL preliminare** | Gateway probabilmente non avviato o porta errata — verificare finestra `gateway` |
| Porta **non** in LISTENING su `127.0.0.1:18789` | **FAIL preliminare** | Avviare `openclaw.cmd --profile control-plane gateway` in finestra dedicata |
| `status` chiede provider / API key / configurazione mancante | **FAIL** / wrong config | Non PM-51 PASS; correggere config locale senza committare segreti |
| `netstat` LISTENING ma probe/flaky probe FAIL mentre status OK | **PASS candidate** o **PARTIAL** | Su Windows-native il probe può mentire — preferire netstat + status; vedi `docs/openclaw/windows-native-notes.md` |
| LISTENING + errori HTTP diversi da 200/401/404 documentati | **PARTIAL** o **FAIL** | Documentare codice/errore; non inventare |

---

## Classificazioni finali (record)

| Finale | Quando usarla |
|--------|----------------|
| **PASS** | Solo se invalid-test = no, nessun segreto nel record, PASS candidate confermato dall’umano |
| **FAIL** | Gateway non in ascolto, refused, wrong config, o invalid test non risolvibile |
| **PARTIAL** | Listen OK e status OK ma endpoint secondario (es. health 404) non disponibile |
| **AUTH_REQUIRED** | Listen OK, 401 o auth richiesta — serve intervento umano locale, senza token in git |

---

## Vincoli che non cambiano con la classificazione

- **PM-34:** resta **BLOCCATO** anche con PM-51 PASS.
- **PM-52:** ammesso in design solo dopo PM-51 **PASS** registrato.
- **Workflow 40/41:** devono restare **non toccati**.

---

## Riferimenti

- Runbook: `docs/control-plane/pm-51-runbook-light.md`
- Record template: `docs/runtime-packets/templates/pm-51-execution-record.md`
