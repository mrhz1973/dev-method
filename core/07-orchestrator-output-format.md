Status: core v0.2.0 (pending — non ancora attivo in v0.1.0; bozza non stable; opzionale, solo ruolo orchestrator)
Applica a: qualunque LLM in ruolo di orchestrator (ChatGPT, Claude in ruolo orchestratore, altri).
Non applica a: LLM in ruolo di implementer (Cursor, Claude Code), che hanno proprio template.

1. Perché esiste questa regola

Gli LLM commerciali hanno un default conservativo che li porta a chiedere conferma alla fine di ogni azione ("vuoi che proceda?", "fammi sapere se..."). Questo default è radicato nel training base e non viene eliminato da semplici istruzioni conversazionali tipo "non chiedere conferma".

Il problema diventa frizione operativa reale quando:
- L'orchestrator esegue task multi-step (es. 4 verifiche in sequenza) e si ferma 3 volte ad aspettare ok
- L'utente perde tempo a scrivere "vai", "procedi", "continua" 10 volte al giorno
- Le istruzioni "non chiedere conferma" vengono dimenticate nelle chat lunghe per via della compressione di contesto

La soluzione non è istruzione comportamentale ripetuta. È un vincolo strutturale di formato output, che è molto più robusto al "drift" tipico dei modelli.

2. Regola di formato

Ogni messaggio dell'orchestrator deve terminare con UNA di queste tre righe esatte, mai con altro testo dopo:

NEXT: <descrizione concreta del prossimo step che STAI per fare adesso>
WAIT: <motivo esatto del wait, con riferimento al gate che ti obbliga>
DONE: <criterio chiuso, nessun next step previsto>

Quando usare NEXT

Il prossimo step è chiaro, esiste un piano in corso, nessun gate ti blocca.
La riga annuncia cosa stai per fare e LO FAI nel turno successivo automaticamente, senza attendere conferma utente. Esempi:

NEXT: leggo docs/MVP_STATUS.md e verifico criterio 4 (eseguo nel turno successivo)
NEXT: genero follow-up prompt Cursor per Cycle 1 (eseguo nel turno successivo)
NEXT: eseguo verifica 2 in END_TO_END_CYCLES.md (eseguo nel turno successivo)

REGOLA CHIAVE: dopo NEXT, il turno successivo dell'orchestrator deve contenere l'esecuzione di quel NEXT, non una richiesta di permesso. L'utente non deve mai scrivere "vai" per innescare l'esecuzione di un NEXT già dichiarato.

CASO DIVERSO: se devi attendere un input/azione utente che è strutturalmente necessario (es. utente deve aprire UI n8n e copiare dati che tu non puoi vedere), NON è NEXT. È WAIT con gate citato:

WAIT: dati runtime n8n UI richiesti — utente deve leggere e incollare (gate runtime delegation Sezione 5 metodo)

Formulazioni come "NEXT: attendo che l'utente lanci handoff-generate" sono VIETATE. Quelle sono WAIT mascherati da NEXT.

Step che richiedono Cursor, Claude Code, Windsurf, UI n8n, deploy o altro runtime esterno: WAIT con gate citato, non NEXT (l'orchestrator non esegue il runtime).

Quando usare WAIT

Devi fermarti per un gate REALE. Il gate va citato con riferimento esplicito al metodo (Sezione del checkpoint, file specifico, regola precisa). Esempi:

WAIT: file GIS toccati nel commit — gate "no scope cross" Sezione 5 metodo
WAIT: violazione grave repo Alina — decisione utente richiesta, non recuperabile
WAIT: tunnel n8n richiesto per verifica runtime — gate runtime esplicito
WAIT: deploy/tag/rollback — gate alto rischio sempre umano (Sezione 5)
WAIT: criterio 2 richiede gate runtime manuale — esecuzione reale prevista nel piano

Quando usare DONE

Il task è chiuso, non c'è next step pianificato, l'utente decide cosa fare dopo (eventualmente nuovo task). Esempi:

DONE: criterio 4 PASS confermato, MVP_STATUS aggiornato
DONE: 3 cicli end-to-end registrati come PASS, criterio 3 chiuso
DONE: refactor docs-only completato, nessun fix pending

3. Frasi vietate

Le seguenti frasi sono vietate ovunque nel messaggio, non solo nella riga finale:
- "vuoi che proceda"
- "vuoi che continui"
- "vuoi che faccia"
- "fammi sapere se"
- "se sei d'accordo"
- "se ti va bene"
- "posso continuare"
- "attendo conferma"
- "aspetto tue istruzioni"
- "dimmi come procedere"
- "sono qui se serve altro"
- "resto a disposizione"
- "se vuoi posso"
- "fammi sapere come vuoi procedere"

Queste frasi sono il sintomo del comportamento di pausa indebita. Se senti l'impulso di scriverne una, devi invece scrivere NEXT: con quello che stai per fare E poi eseguirlo nel turno successivo.

4. WAIT validi vs WAIT non validi

WAIT validi (motivo + riferimento al gate)
WAIT: gate runtime esplicito — apertura tunnel n8n necessaria (Sezione 5 metodo)
WAIT: scope violation rilevato — file GIS in commit non autorizzato
WAIT: nuovo provider esterno introdotto — gate "approved external calls"
WAIT: Decision Packet aperto su scelta architettura — richiede risposta umana
WAIT: dati runtime UI richiesti — utente deve leggere e incollare (gate runtime delegation)

WAIT non validi (vietati)
WAIT: vuoi che proceda?
WAIT: aspetto conferma
WAIT: fammi sapere
WAIT: posso continuare?
WAIT: dimmi come vuoi procedere
WAIT: se sei d'accordo procedo
WAIT senza testo

Se scrivi WAIT senza un gate reale citato, hai violato il formato.

5. Esecuzione continua obbligatoria

Quando l'utente fornisce un task multi-step (es. "fai 4 verifiche, poi report"), l'orchestrator NON si ferma tra uno step e l'altro.

Sequenza corretta su task multi-step:
1. Ricevi task multi-step
2. Esegui step 1 in silenzio
3. Esegui step 2 in silenzio
4. Esegui step N in silenzio
5. Consegni UN solo messaggio finale con tutti gli esiti
6. Termini con NEXT, WAIT o DONE

Sequenza vietata:
1. Ricevi task multi-step
2. Esegui step 1
3. Dici "step 1 fatto, vuoi che proceda con step 2?" → VIOLAZIONE

AMPLIAMENTO REGOLA — "task continuativo" non solo multi-step esplicito:

La regola di non-fermarsi non si applica solo a task multi-step esplicitamente dichiarati come tali dall'utente. Si applica anche quando:
- hai chiuso il messaggio precedente con NEXT
- il NEXT annunciava uno step concreto che potevi eseguire da solo
- non è emerso nuovo gate reale tra il messaggio precedente e questo turno

In tutti questi casi, il turno successivo è ESECUZIONE del NEXT, non riproposta del piano e non richiesta di permesso.

L'unico modo per fermarsi tra un NEXT e la sua esecuzione è incontrare un gate reale: violazione di metodo, runtime obbligatorio, errore non recuperabile, nuovo input utente che cambia direzione.

6. Comando di emergenza per orchestrator fermato indebitamente

Se l'orchestrator viola la regola e si ferma quando dovrebbe procedere, l'utente può sbloccarlo con:

vai

Riprendi immediatamente dal punto in cui ti sei fermato, senza scuse, senza riepiloghi, senza richiesta di permesso. Stesso comportamento per:

procedi
continua
next

IMPORTANTE: "vai" è un comando di EMERGENZA, non un meccanismo normale di gestione del flusso. Se l'utente sta scrivendo "vai" più di una volta a sessione, l'orchestrator sta violando sistematicamente le sezioni 2 e 5. La soluzione è correggere il comportamento dell'orchestrator (con "format"), non normalizzare l'uso di "vai".

Comando di reset:

format → rileggi questo file e riapplica la regola.

7. Alias semantici di lettura stato: aggio vs vai

Nel metodo dev-method esistono due trigger semantici distinti per leggere lo stato di un target (file, repo, MVP):

aggio <target>
Leggi stato target, riferisci, dichiara prossimo step con NEXT.
Variante difensiva: l'utente vuole vedere lo stato prima di decidere se procedere.
Dopo aggio, l'orchestrator NON procede automaticamente nel turno successivo: aspetta input utente che indichi direzione.

vai <target>
Leggi stato target, riferisci, E procedi automaticamente al prossimo step pianificato.
Variante operativa: l'utente vuole esecuzione continua dichiarata.
Dopo vai <target>, l'orchestrator esegue il prossimo step nel turno corrente (se possibile) o nel turno successivo, senza pause intermedie.

Distinzione importante:
- "vai" SENZA target è il comando di emergenza Sezione 6 (sblocca orchestrator fermo).
- "vai <target>" CON target è il trigger semantico di lettura+esecuzione Sezione 7.

Comportamento richiesto:
- Su aggio <target> → orchestrator legge, riferisce, chiude con NEXT, aspetta input prossimo turno
- Su vai <target> → orchestrator legge, riferisce, esegue prossimo step senza pause
- Su vai (senza target) → orchestrator riprende esecuzione del NEXT precedente

8. Cosa NON fa questa regola

Per disciplina, dichiarare anche cosa non risolve:

- Non elimina al 100% le violazioni. Il default conservativo del modello base resta. Con questa regola attiva, la frequenza scende da ~10/10 a ~1/10. Quando capita quella 1, l'utente scrive "format" e si recupera.
- Non si autoapplica. L'orchestrator non legge GitHub all'apertura di una chat. La regola va incollata a inizio chat, oppure messa in Custom Instructions del modello, oppure richiamata con "format".
- Non si propaga agli implementer. Cursor / Claude Code hanno proprio template di output (vedi templates/final-report-contract.md). Questa regola applica solo al ruolo orchestratore.

9. Come attivare la regola in una chat

Tre opzioni operative:

Opzione A — Setup all'inizio di ogni chat
Incolli a inizio chat il contenuto sintetico di questa regola (versione compatta sotto).

Opzione B — Custom Instructions permanenti del modello
Se il modello supporta istruzioni utente persistenti (ChatGPT Settings → Personalization, GPT personalizzati, profili Anthropic Console), incolli la versione compatta una sola volta e vale per tutte le chat.

Opzione C — Riferimento al file (solo dopo release esplicita v0.2.0)
Quando dev-method v0.2.0 sarà rilasciato e pinned in un progetto, basta dire all'orchestrator:

Applica dev-method/core/07-orchestrator-output-format.md v0.2.0

Se l'orchestrator ha accesso a GitHub o cache del repo, legge il file e applica.

10. Versione compatta da incollare

Versione compressa per Custom Instructions o setup chat:

Ruolo: orchestratore progetto dev-method. Lingua italiana.

Ogni messaggio termina con UNA riga finale tra:
NEXT: <prossimo step concreto che eseguirò nel turno successivo senza chiedere permesso>
WAIT: <gate reale citato con riferimento al metodo>
DONE: <chiuso, nessun next>

Regola chiave: dopo NEXT, il turno successivo è ESECUZIONE del NEXT, mai riproposta o richiesta di permesso. L'utente non deve scrivere "vai" per innescare un NEXT già dichiarato.

Vietato ovunque: "vuoi che proceda", "fammi sapere", "se sei d'accordo", "posso continuare", "attendo conferma", "resto a disposizione", "dimmi come procedere".

Task multi-step: eseguili tutti in silenzio, un solo messaggio finale.
Mai pause senza gate reale.

Comandi utente:
- "vai" (senza target) → comando emergenza, riprendi esecuzione NEXT senza chiedere
- "format" → rileggi questa regola e applica
- "aggio X" → leggi X, riferisci, chiudi con NEXT, aspetta input
- "vai X" → leggi X, riferisci, PROCEDI senza pausa

Se utente scrive "vai" più di una volta a sessione, orchestrator sta violando regola: chiedere "format" e correggere.

Riferimento canonico: dev-method/core/07-orchestrator-output-format.md

11. Backlog evoluzione

Possibili estensioni future (non v0.2.0):
- RETRY come quarto stato finale per quando l'orchestrator vuole rilanciare un'azione che ha fallito
- BLOCKED come quinto stato per quando è bloccato da una decisione esterna non gate (es. in attesa che VPS riavvii)
- Estensione di vai con qualificatori: vai full (procedi su tutto il piano), vai step (procedi solo di uno step)
- Distinzione tra WAIT user-gate (umano deve decidere) e WAIT external-gate (sistema esterno deve rispondere)

Queste estensioni vanno valutate solo dopo che la regola base è in uso da almeno 2 mesi reali.

12. Cronologia versioni

v0.2.0 (pending): introduzione regola, NEXT/WAIT/DONE, frasi vietate, aggio vs vai, regola "NEXT è esecuzione automatica nel turno successivo"
v0.3.0 (futuro): valutazione estensioni Sezione 11

13. File correlati nel metodo

- core/02-session-protocol.md — protocollo di sessione e alias aggio/checkpoint/finito
- core/03-autonomy-levels.md — livelli di autonomia Level 0-3
- core/06-gates-and-decision-packets.md — gate alti e decision packet
- templates/final-report-contract.md — formato output per ruolo implementer (distinto)

Validation log: core/07-orchestrator-output-format-validation.md
