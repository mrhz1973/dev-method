# PM-51 — Handoff checklist (nuova chat)

Checklist pratica per aprire una **nuova chat** Cursor (o altro agente) sul test PM-51 a casa.

---

## Setup corretto

- [ ] **Macchina:** casa (non PC lavoro)
- [ ] **Utente:** `mrhz`
- [ ] **Repo Cursor:** `C:\Users\mrhz\Documents\AI\GitHub\control-plane`
- [ ] **Docs metodo (lettura):** `dev-method` su GitHub o clone locale — **solo lettura** per runbook/matrici

---

## Finestre e servizi da NON usare per PM-51

- [ ] n8n (UI o workflow run)
- [ ] Telegram (bot/notifiche per il test)
- [ ] Workflow **40** e **41** (edit o run)
- [ ] Worker / implementer automatico
- [ ] GIS, Alina, deploy/tag/rollback
- [ ] OpenRouter, Gemini

---

## Prima di eseguire — verifiche rapide

```powershell
git -C "C:\Users\mrhz\Documents\AI\GitHub\control-plane" status --short
git -C "C:\Users\mrhz\Documents\AI\GitHub\control-plane" branch --show-current
git -C "C:\Users\mrhz\Documents\AI\GitHub\control-plane" log -1 --oneline
```

- [ ] Branch e repo coerenti con l’obiettivo (control-plane, non dev-method per il runtime test)
- [ ] Workspace **pulito** o solo file attesi (se sporco: **fermarsi** e chiedere)
- [ ] Ultimo commit **dev-method** docs noto: `8563f54` o successivo su `main` (se lavori anche su dev-method)

---

## Esecuzione (ordine)

1. [ ] Finestra 1: `openclaw.cmd --profile control-plane gateway` (resta aperta)
2. [ ] Finestra 2: `--version`, `netstat`, `status`, eventuale probe locale
3. [ ] Applicare `docs/control-plane/pm-51-decision-matrix.md`
4. [ ] Compilare `docs/runtime-packets/templates/pm-51-execution-record.md` (solo dopo test reale)

---

## Quando fermarsi

- Output contiene **segreto** → STOP, non commit, non incollare token
- Test fatto su **PC lavoro** → invalido, fermarsi
- n8n / worker / workflow 40-41 usati → invalid test, fermarsi
- Classificazione **FAIL preliminare** (porta non in ascolto, connection refused) → non dichiarare PASS; correggere gateway
- **AUTH_REQUIRED** → fermarsi; risolvere auth **in locale** senza incollare token in chat

---

## Cosa incollare nella nuova chat (sicuro)

- Esito netstat (righe rilevanti)
- HTTP status / errore (**senza** header auth)
- Status OpenClaw **redatto** (no token)
- Versione CLI
- Classificazione proposta + attestazioni (n8n no, worker no, wf 40/41 no)
- PM-34 ancora bloccato: sì

---

## Se Cursor e GitHub differiscono

1. Su casa: `git fetch` e `git log -1 origin/main` nel repo interessato.
2. Confrontare hash con GitHub web (branch `main`).
3. Se locale indietro: `git pull --ff-only` **solo** con workspace pulito e scope autorizzato.
4. Non forzare push; non `git add .`.
5. Riportare in chat: hash locale, hash remoto, file sporchi eventuali.

---

## Se il contesto chat è pieno

1. Incollare solo: classificazione + 5 righe netstat/status + link path record.
2. Aprire **nuova chat** con questo file + `pm-51-runbook-light.md` + `pm-51-decision-matrix.md`.
3. Allegare percorso record compilato su disco, non wall of raw log.
4. PC lavoro: limitarsi ad aggiornamenti **docs** in dev-method, mai sostituire il test casa.

---

## Riferimenti rapidi

| Doc | Path |
|-----|------|
| Runbook | `docs/control-plane/pm-51-runbook-light.md` |
| Matrice | `docs/control-plane/pm-51-decision-matrix.md` |
| PM-52 stub | `docs/control-plane/pm-52-pre-design-stub.md` |
| Operating memory | `docs/control-plane/operating-memory.md` |
