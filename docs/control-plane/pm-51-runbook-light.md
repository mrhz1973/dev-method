# PM-51 — Runbook (light, per utente e nuova chat)

Guida breve per eseguire **PM-51** a casa. Non sostituisce le note tecniche: `docs/openclaw/windows-native-notes.md`.

**Stato attuale in repo:** PM-51 **non ancora eseguito** — solo preparazione documentale.

---

## Dove e chi

| Cosa | Valore |
|------|--------|
| **Macchina** | Solo **casa** (non PC lavoro) |
| **Utente Windows** | `mrhz` |
| **Repo da aprire in Cursor** | `C:\Users\mrhz\Documents\AI\GitHub\control-plane` |

Su PC lavoro si fanno solo aggiornamenti **docs** in `dev-method`, mai il test PM-51.

---

## Cosa fa PM-51 (in parole semplici)

- Controlla che il **gateway OpenClaw** risponda **solo in locale** (loopback).
- È un test **no-op**: non modifica file, workflow, worker o Telegram.
- **Non** sblocca **PM-34** (resta bloccato).
- **Non** usa n8n, worker, Telegram, OpenRouter o Gemini.

---

## Prima di iniziare

1. Chiudi o non aprire: n8n, Telegram per il test, workflow 40/41, GIS, Alina.
2. Worker implementer: **spento / non usato**.
3. Due finestre PowerShell separate (vedi sotto).

---

## Passo 1 — Gateway (finestra PowerShell dedicata)

Apri **PowerShell** e lasciala aperta con il gateway in primo piano:

```powershell
openclaw.cmd --profile control-plane gateway
```

- Usa **`openclaw.cmd`**, non solo `openclaw` (PowerShell potrebbe lanciare `openclaw.ps1`).
- Non chiudere questa finestra finché non hai finito i controlli.
- Non esporre LAN, Tailscale o Funnel per questo test.

---

## Passo 2 — Controlli (altra finestra PowerShell)

Nella **seconda** finestra, dalla cartella che preferisci (es. `control-plane`):

```powershell
openclaw.cmd --profile control-plane --version
netstat -ano | findstr 18789
openclaw.cmd --profile control-plane status
```

Opzionale — probe locale (no-op, solo lettura):

```powershell
# Esempio: se il runbook del profilo prevede un probe HTTP locale, usalo senza incollare token
# Registra solo codice HTTP (es. 200, 401, 404) o messaggio di errore
```

Interpreta i risultati con: `docs/control-plane/pm-51-decision-matrix.md`.

---

## Cosa copiare dopo il test (sicuro)

Incolla in chat o nel template **solo**:

- Data/ora locale
- Esito `netstat` (righe con `127.0.0.1:18789` e LISTENING sì/no)
- Codice HTTP o errore (**numero/testo**, non header con segreti)
- Output **sanitizzato** di `openclaw … status` (senza token)
- Versione OpenClaw (riga `--version`)
- Classificazione proposta: PASS / FAIL / PARTIAL / AUTH_REQUIRED
- Attestazioni: n8n no, worker no, workflow 40/41 no, PM-34 non sbloccato

Usa il modello: `docs/runtime-packets/templates/pm-51-execution-record.md`.

---

## Cosa NON copiare mai

Non incollare in chat, GitHub o commit:

- Token gateway, API key, password
- OAuth **code**, **access token**, **refresh token**
- Valori da `Authorization:` o cookie di sessione
- File `.env` o configurazioni con segreti

Se compare un segreto nell’output: **STOP** — non committare; vedi matrice decisionale (caso “output contiene segreto”).

---

## Dopo PM-51

| Esito | Azione |
|-------|--------|
| PASS (casa) | Si può pianificare **PM-52** (solo design doc, vedi stub) |
| FAIL / PARTIAL / AUTH_REQUIRED | Non avanzare PM-52; correggere setup a casa |
| Qualsiasi | PM-34 resta **bloccato** |

---

## Riferimenti

- Matrice esiti: `docs/control-plane/pm-51-decision-matrix.md`
- Checklist nuova chat: `docs/control-plane/pm-51-new-chat-handoff-checklist.md`
- Note Windows: `docs/openclaw/windows-native-notes.md`
