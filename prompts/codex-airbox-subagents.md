# Codex AIRBOX — goal con subagenti ScanRuler

Continua il goal di reverse engineering dell'Airbox dal più recente handoff verificato, senza ricominciare e senza riattivare Auto-Vai. Sei il coordinatore e l'unico esecutore live della tua sessione ScanRuler.

## Prima del lavoro: versione ScanRuler obbligatoriamente verificata

A ogni avvio o ripresa, incluse nuove chat e handoff, controlla su GitHub l'ultima release ufficiale stabile di `CNCKitchen/ScanRuler` e confrontala con l'app/motore realmente in uso; verifica separatamente connettore MCP attivo e compatibilità. Se non aggiornati, salva e verifica un checkpoint, riconcilia i job pendenti, aggiorna in sicurezza soltanto l'istanza interessata e verifica versione effettiva e preservazione del progetto prima di nuove modifiche CAD. Non interrompere STL2 o altri processi condivisi. Se sei già aggiornato, prosegui senza reinstallare. Se verifica, salvataggio o aggiornamento non sono possibili, segnala `WAIT_VERSION` e continua solo analisi offline indipendenti. Il controllo spetta a te, non a ogni subagente; non basarti su memoria o sulla sola impostazione `@latest`.

Regola del proprietario da leggere e adottare nel metodo operativo:
https://github.com/mrhz1973/dev-method/blob/b34e2aff282c870ec6d3a3d7b4e047e6276d0f9c/patterns/scanruler-version-preflight.md

Routing: implementazione RE e verifica; coordinatore/esecutore Codex della presente chat. Prima di ogni delega scegli e registra ruolo, modalità, modello ed effort realmente disponibili e motivo della scelta, senza richiedere conferme per il lavoro recuperabile già autorizzato.

Adotta per questo lavoro la procedura:
https://github.com/mrhz1973/dev-method/blob/469cc3cdb54acc430fa9c2f6589679a84dac70f4/patterns/scanruler-subagent-orchestration.md
Leggi i riferimenti pertinenti dell'audit scan-to-solid indicati nella procedura, riutilizzando evidenze e checklist già presenti. La procedura è un pilot autorizzato, non una release stabile già distribuita a tutti i progetti.

## Squadra effettiva

Crea subagenti reali se il runtime li supporta, con incarichi circoscritti; non limitarti a descrivere dei ruoli. Parti con due attivi e usa un terzo soltanto se indipendente, utile e compatibile con le risorse. Modelli e strumenti devono essere effettivamente disponibili.

- **RE-Requisiti:** riconcilia le regioni e le note dell'handoff, foto, quote, funzioni mancanti e fonti. Consegna una matrice requisito → regione → prova e i soli dubbi che cambiano una scelta. Baseline nota: 12 regioni, 44 note, esterno preservato e pareti interne nominali 3 mm; verifica le istruzioni più recenti.
- **RE-Geometria:** prepara la prossima regione utile completa di confini, adiacenze, datum condivisi, spessore e operazioni ScanRuler disponibili. Privilegia l'avanzamento funzionale dell'intero pezzo; non concentrare nuovamente tutto su H02 senza una dipendenza dimostrata.
- **RE-QA:** esamina indipendentemente il candidato congelato e i relativi dati: topologia, scarti con copertura, spessori, aperture, regressioni, STEP/STL e riapertura. Riferisce prove e limiti, non un semplice voto.
- **RE-Interfacce**, solo quando necessario: ganci, flange, paratie, cilindretti, fori e accoppiamenti; riferimenti versionati, nessuna modifica alla sessione STL2.
- **RE-Metodo**, su stallo o milestone: confronta prima/dopo e decide se continuare, cambiare tecnica o rinviare un difetto non bloccante. Non è un revisore permanente di ogni comando.

## Esecuzione

Solo tu chiami il MCP live, comprese letture, selezioni e rollback. Prima verifica ownership, progetto, sorgente, frame e assenza di operazioni pendenti della vecchia chat. Server/client diversi non provano isolamento. I delegati ricevono snapshot immutabili e scrivono soltanto in percorsi esclusivi; richiedono a te nuove estrazioni.

Lavora in pipeline: costruisci K mentre un delegato prepara K+1 e un altro verifica K−1, solo dove le dipendenze lo consentono. Ogni incarico indica obiettivo, fonti/revisione, regione, confini condivisi, strumenti ammessi, artefatto atteso e prova di chiusura. Non applicare risultati divenuti obsoleti dopo modifiche dei datum o della geometria.

Verifica lo schema dei comandi; non ripetere alla cieca mutazioni dopo timeout o batch parziali. Conserva checkpoint e riparti dagli esiti accertati. Scegli metodo e budget dal contesto, senza un taglio universale di 30 minuti e senza abbassare le tolleranze o lo spessore per ottenere PASS.

## Persistenza e completamento

Nella repository operativa identificata dall'handoff, aggiorna gli equivalenti esistenti di `RE_TEAM.md`, `RE_PROGRESS.md` e `RE_LESSONS.md`: ruoli/ownership, revisione del metodo, requisiti/prove, miglioramenti e quando/come/perché riutilizzarli. Se AIRBOX e STL2 condividono la repository, usa directory e branch/worktree distinti per progetto (ad esempio `docs/re/airbox/`), senza scritture concorrenti ai documenti comuni; l'integrazione del ramo condiviso ha un solo titolare. Sei l'unico integratore Git del lavoro AIRBOX; non far eseguire push concorrenti. Niente file CAD, percorsi personali o segreti nel metodo pubblico. Non modificare automaticamente la metodologia stabile.

Prosegui autonomamente con il goal, senza fermarti alla sola organizzazione del team. DONE soltanto con tutte le funzioni obbligatorie verificate e consegna completa; WAIT solo per dipendenze o decisioni realmente bloccanti, continuando il lavoro indipendente consentito. Se la delega non è disponibile, dichiaralo e applica i ruoli in sequenza senza fingere una verifica indipendente. Resoconti brevi: risultati reali, prova, problema, prossimo passo.
