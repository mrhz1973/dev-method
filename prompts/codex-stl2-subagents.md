# Codex STL2 — Tubo Finale.obj con subagenti ScanRuler

Continua il goal di reverse engineering di `Tubo Finale.obj` dall'ultimo handoff e checkpoint realmente verificati. Non ricominciare il modello e non riattivare Auto-Vai. Sei il coordinatore e l'unico esecutore live della tua sessione ScanRuler.

## Prima del lavoro: versione ScanRuler obbligatoriamente verificata

A ogni avvio o ripresa, incluse nuove chat e handoff, controlla su GitHub l'ultima release ufficiale stabile di `CNCKitchen/ScanRuler` e confrontala con l'app/motore realmente in uso; verifica separatamente connettore MCP attivo e compatibilità. Se non aggiornati, salva e verifica un checkpoint, riconcilia i job pendenti, aggiorna in sicurezza soltanto l'istanza interessata e verifica versione effettiva e preservazione del progetto prima di nuove modifiche CAD. Non interrompere AIRBOX o altri processi condivisi. Se sei già aggiornato, prosegui senza reinstallare. Se verifica, salvataggio o aggiornamento non sono possibili, segnala `WAIT_VERSION` e continua solo analisi offline indipendenti. Il controllo spetta a te, non a ogni subagente; non basarti su memoria o sulla sola impostazione `@latest`.

Regola del proprietario da leggere e adottare nel metodo operativo:
https://github.com/mrhz1973/dev-method/blob/b34e2aff282c870ec6d3a3d7b4e047e6276d0f9c/patterns/scanruler-version-preflight.md

Routing: implementazione RE e verifica; coordinatore/esecutore Codex della presente chat. Prima di ogni delega scegli e registra ruolo, modalità, modello ed effort realmente disponibili e motivo della scelta, senza richiedere conferme per il lavoro recuperabile già autorizzato.

Adotta per questo lavoro la procedura:
https://github.com/mrhz1973/dev-method/blob/469cc3cdb54acc430fa9c2f6589679a84dac70f4/patterns/scanruler-subagent-orchestration.md
Leggi i riferimenti pertinenti dell'audit scan-to-solid indicati nella procedura; riutilizza dati e controlli già validi. È un pilot autorizzato, non una metodologia stabile automaticamente adottata da altri progetti.

## Squadra effettiva

Crea subagenti reali se il runtime li supporta. Parti con due attivi; usa un terzo soltanto per un incarico indipendente utile e compatibile con le risorse. Modelli e strumenti devono essere effettivamente disponibili.

- **RE-Requisiti:** traduci foto, calibro, note e ultime istruzioni in verifiche: esterno preservato, interno nominale 2 mm, scanalature marcate e squadrate, fori e tasselli. Riconcilia i riferimenti noti di 4,75 mm e 17,09 mm con l'handoff e le foto; non confondere geometria funzionale con rumore di stampaggio né proporzioni fotografiche con quote misurate.
- **RE-Geometria:** prepara sezioni informative anche inclinate, corrispondenza dei profili, loft/sweep o primitive, interno e dettagli. Consegna una proposta eseguibile nella build corrente con confini condivisi, rischio di sottospessore e controllo tra le stazioni. Non aumentare indiscriminatamente sezioni o complessità.
- **RE-QA:** verifica il candidato congelato rispetto alla scansione originale e ai requisiti, distinguendo mesh ridotta, CAD ed esportati. Controlla distribuzione dello spessore e minimi/massimi, intervalli tra sezioni, dettagli funzionali, topologia, STEP riletto e progetto riaperto. Un minimo accettabile o un'alta percentuale media non provano parete costante o conformità globale.
- **RE-Interfacce**, solo se esiste un riferimento Airbox congelato e dichiarato idoneo: prepara controlli di accoppiamento senza aprire, misurare o modificare la sessione Airbox. Se il riferimento è ancora incompleto o l'utente ha escluso rilevamenti, rinvia solo questa verifica e prosegui sul tubo.
- **RE-Metodo**, su stallo o milestone: confronta costo e miglioramento, scarta tentativi senza beneficio e propone alternative realmente diverse senza ridurre i requisiti.

## Esecuzione

Solo tu chiami ScanRuler live, comprese letture e rollback. Verifica progetto, mesh, endpoint/backend, frame, ownership e assenza di job pendenti della vecchia chat. Non assumere che una nuova chat Codex o un altro client MCP costituiscano una sessione CAD separata.

I subagenti lavorano su snapshot immutabili, con percorsi esclusivi. Ogni incarico specifica obiettivo, revisione/hash, regione, dipendenze, strumenti ammessi, risultato e verifica. Tu costruisci K; in parallelo, se indipendenti, Geometria prepara K+1 e QA verifica K−1. Le richieste di nuove estrazioni passano da te. Risultati su revisioni non più compatibili vanno rivalidati.

Verifica lo schema prima dei comandi e non replicare mutazioni dopo timeout: riconcilia il job e gli eventuali effetti parziali. Mantieni checkpoint recuperabili. Non alterare l'esterno per correggere l'interno, salvo diversa autorizzazione. Mantieni le tolleranze del goal corrente: la precisione della scansione, la discretizzazione STL e l'equivalenza STEP sono controlli distinti.

## Persistenza e completamento

Aggiorna nella repository operativa dell'handoff gli equivalenti esistenti di `RE_TEAM.md`, `RE_PROGRESS.md` e `RE_LESSONS.md`: responsabilità, metodo adottato, requisiti/prove e lezioni con contesto, quando, come, perché, benefici e limiti. Se AIRBOX e STL2 condividono la repository, usa directory e branch/worktree distinti per progetto (ad esempio `docs/re/stl2/`), senza scritture concorrenti ai documenti comuni; l'integrazione del ramo condiviso ha un solo titolare. Integra e pubblica tu il lavoro STL2; nessun push concorrente dei delegati e nessun dato privato nel metodo pubblico. Promuovi modifiche generali solo tramite revisione.

Continua il goal senza chiedere nuovi «continua» per lavoro recuperabile già autorizzato; non fermarti alla creazione della squadra. DONE soltanto dopo le verifiche e consegne obbligatorie; un accoppiamento non verificato resta esplicitamente aperto. Se la delega non è disponibile, usa i ruoli in sequenza e dichiara l'auto-verifica. Resoconti brevi, basati su risultati e artefatti reali.
