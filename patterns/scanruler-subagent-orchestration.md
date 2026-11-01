# ScanRuler — orchestrazione contestuale di subagenti Codex

**Versione:** 1.0, 1 novembre 2026. **Stato:** procedura proposta per il pilot AIRBOX/STL2, autorizzata dall'utente per questi lavori; non release stabile e non prova di accelerazione già ottenuta. Documento operativo da leggere insieme alla metodologia adattiva della stessa revisione. Auto-Vai, File Bridge obbligatorio e supervisione temporizzata restano esclusi dal nuovo workflow.

## 1. Scopo, quando applicarla e perché

Ridurre tempo al risultato verificato distribuendo analisi indipendenti, preparazione delle regioni e controllo delle evidenze. Il risultato richiesto rimane il reverse engineering, non la costruzione di un framework multiagente.

Usare subagenti quando esistono almeno due incarichi utili e indipendenti: interpretare foto/quote mentre si prepara una ricostruzione, progettare la regione successiva mentre si verifica quella precedente, confrontare metodi realmente diversi su copie congelate. Non delegare un'operazione banale né aprire molti agenti che attendono lo stesso calcolo CAD. Ridurre la squadra quando il costo di coordinamento supera il lavoro utile.

Il coordinatore conserva responsabilità e decisione finale. Adatta gli incarichi al pezzo, alla fase, alle risorse e alle indicazioni dell'utente. Non prescrivere universalmente numero di regioni, spessore, tolleranza, trenta minuti per dettaglio o stessa sequenza costruttiva.

## 2. Squadra: competenze disponibili, non processi sempre accesi

| Ruolo | Incarico e risultato verificabile | Quando impiegarlo |
|---|---|---|
| **Coordinatore / esecutore ScanRuler** (chat principale) | Recupera handoff, decide priorità, acquisisce snapshot, esegue tutte le chiamate live della propria sessione, integra e salva. Possiede il modello e la consegna. | Sempre; nessun secondo esecutore sulla stessa sessione. |
| **RE-Requisiti** | Legge istruzioni, annotazioni, foto e quote; restituisce requisito → fonte → regione → prova. Distingue dato misurato, dichiarazione utente, inferenza e rumore. | All'avvio, al cambio di requisiti o quando una forma è ambigua. Non rifare l'intero audit a ogni blocco. |
| **RE-Geometria** | Su snapshot assegnati prepara una regione completa: datum, sezioni informative anche inclinate, bordi condivisi, vincoli, rappresentazione, fattibilità dello spessore, sequenza di operazioni effettivamente disponibili. Consegna una proposta eseguibile e un'alternativa discriminante. | Preparazione della prossima regione o ricerca della causa di un fallimento. |
| **RE-QA** | Verifica indipendente della revisione candidata: topologia, fedeltà, distribuzione dello spessore, funzione, esportazione/riapertura. Restituisce PASS/FAIL/NON_VERIFICATO distinti, dati riproducibili e difetti prioritari. | Dopo blocchi geometrici significativi e prima di DONE; non dopo ogni comando. |
| **RE-Interfacce** | Controlla datum, aperture, ganci, fori, accoppiamenti e conflitti tra regioni/pezzi usando riferimenti versionati. Produce un contratto di interfaccia e i test pertinenti. | Solo quando l'interfaccia può bloccare il lavoro; nessuna modifica o misura live nella sessione dell'altro progetto. |
| **RE-Metodo** | Confronta progresso atteso/ottenuto, diagnosi e alternative. Decide PROSEGUI, CORREGGI_PASSAGGIO, CAMBIA_METODO, DEFERISCI_NON_BLOCCANTE o ATTESA_MIRATA, con prova e motivo. | Tentativi ripetitivi senza beneficio, costo eccessivo o milestone; non come revisore permanente di ogni azione. |

I nomi identificano incarichi, non agenti che si presumono già installati. Utilizzare le capacità reali di delega della sessione Codex, comunicando strumenti e permessi effettivi. Non inventare spawn, risultati o indipendenza. Se i subagenti non sono disponibili, svolgere i ruoli in sequenza e dichiarare l'auto-verifica.

**Avvio consigliato, adattabile:** 2–3 subagenti attivi per progetto; se AIRBOX e STL2 condividono la macchina, partire da 2 per progetto. Gli specialisti condizionali sostituiscono un incarico concluso invece di aumentare indefinitamente i processi. Limitare inizialmente a una sola verifica geometrica offline pesante per host, salvo risorse e benefici misurati. Non è un limite Codex né una regola universale.

Usare modelli/effort realmente disponibili: maggiore profondità su geometria e QA critici, configurazione più leggera per classificazioni e riepiloghi semplici. Non installare modelli, modificare impostazioni globali o sostenere nuovi costi non autorizzati. Riutilizzare agenti pertinenti, chiudere quelli terminati e non creare sotto-sottoagenti senza necessità e decisione del coordinatore.

## 3. Ownership e isolamento: il vincolo fondamentale

Un solo proprietario live per **sessione ScanRuler**, non per nome di chat, browser o processo. La documentazione upstream descrive holder/relay che possono inoltrare più connessioni alla stessa scheda e alla stessa cronologia Undo. Quindi aprire due client MCP non prova isolamento.

Prima delle modifiche il coordinatore verifica: progetto, scansione originale e hash/riferimento, frame e unità, checkpoint corrente, endpoint/porta/backend effettivi, operazioni in corso e precedente titolare. Il trasferimento dalla vecchia chat deve essere concluso: nessun job mutativo pendente. Un processo esistente o uno stato CONTINUE non dimostrano proprietà né attività utile.

AIRBOX e STL2 possono procedere in parallelo soltanto se puntano a sessioni realmente distinte. Non riutilizzare alla cieca porte o PID di vecchi handoff. Se il binding è ambiguo, fermare solo le mutazioni coinvolte e continuare analisi offline indipendenti.

I subagenti usano snapshot immutabili e scrivono esclusivamente nei percorsi assegnati. **Non eseguono chiamate live ScanRuler neppure di lettura**: chiedono al coordinatore l'estrazione minima necessaria. Anche cambi di selezione, vista, rollback bar o riferimento possono alterare il contesto dell'esecutore. Il coordinatore mantiene la proprietà durante un job in coda fino all'esito terminale e alla riconciliazione.

Le istruzioni di ruolo non costituiscono una sandbox. Applicare limitazioni degli strumenti e filesystem dove supportate; altrimenti dichiarare che il vincolo è procedurale. Nessuna scrittura concorrente sullo stesso file, checkpoint, branch o database condiviso.

## 4. Contratto minimo di incarico

Riutilizzare il template regionale dell'audit, aggiungendo soltanto ownership e revisione; non imporre una seconda checklist per ogni chiamata. Per ciascun incarico significativo comunicare:

```text
TASK / PROJECT / ROLE / OWNER:
GOAL / REGION / DEPENDENCIES:
INPUT_SNAPSHOT / SOURCE_HASH / MODEL_REVISION / FRAME / UNITS:
REQUIREMENTS_AND_TOLERANCES / OBSERVED_VS_INFERRED:
SHARED_BOUNDARIES_AND_DATUMS:
ALLOWED_TOOLS_AND_PATHS / FORBIDDEN_ACTIONS:
OUTPUT_PATH_AND_EXPECTED_ARTIFACT:
ACCEPTANCE_CHECK / REVIEW_OR_SWITCH_TRIGGER:
```

Consegna breve: esito, revisione, artefatto, prova, difetti/limiti, prossima azione. Mai riversare mesh o intere cronologie nella chat: passare percorsi e sintesi; selezioni, sezioni e campioni solo nel volume necessario. Originali e checkpoint sono read-only per i delegati.

Proposta e QA sono vincolati alla revisione esaminata. Prima di applicarli verificare se sorgente, datum, bordi, feature dipendenti o parametri sono cambiati; in tal caso invalidare la parte interessata e ricalcolarla. Non applicare ID di facce/feature provenienti da un altro snapshot o progetto.

## 5. Sequenza operativa ottimizzata per ScanRuler

**Avvio:** leggere l'ultimo handoff e gli ingressi GitHub pertinenti; preservare il lavoro valido. Il coordinatore recupera capacità e schema dei soli strumenti necessari, versione effettiva e checklist esistente. RE-Requisiti aggiorna la mappa delle funzioni; RE-Geometria prepara la prima regione indipendente; RE-QA controlla il baseline disponibile.

**Pipeline per blocchi:** mentre il coordinatore costruisce la regione K, un delegato prepara K+1 e un altro verifica lo snapshot di K−1. Eseguire in parallelo solo se le dipendenze lo consentono. Non attendere tutti i subagenti quando una consegna non blocca il lavoro corrente; attendere sempre le prove necessarie a una decisione o integrazione.

**Regione completa, non faccia isolata:** concordare prima datum, confini condivisi, adiacenze, spessore e interfacce. Preferire primitive/feature sui domini regolari; sezioni e loft/sweep dove informativi; superfici/reti di patch per la forma libera. Prima di replicare un metodo su tutto il pezzo, provarne la fattibilità sul requisito più difficile. Non costruire indipendentemente lo stesso bordo in due regioni.

**Esecuzione nativa prima di infrastruttura nuova:** usare gli strumenti ScanRuler effettivamente esposti. Validare nomi, campi ammessi e unità prima di un batch; non ripetere errori di schema già conosciuti. I nomi diretti e quelli esposti dall'adapter possono differire: leggere lo schema, non indovinarlo. Le modalità compact/namespace possono ridurre il contesto, ma non cambiare o riavviare una configurazione attiva per applicarle senza checkpoint e compatibilità verificata.

**Job lunghi e fallimenti:** un timeout non è un fallimento né autorizza la ripetizione della mutazione. Seguire lo stesso job con il meccanismo supportato; un batch non è presunto atomico. Ispezionare operazioni applicate, fallite e stato risultante prima di un retry. Le analisi offline indipendenti possono proseguire durante il calcolo. Nessun polling frenetico.

**Verifica:** il coordinatore acquisisce dal candidato salvato gli esportati, i risultati nativi e le viste richieste dal QA. Il QA usa lo snapshot corrispondente e richiede eventuali controlli live tramite il coordinatore. Se un altro agente interpreta soltanto il medesimo rapporto, chiamare questo controllo review delle evidenze, non misurazione indipendente.

**Integrazione:** promuovere solo un candidato che supera i criteri pertinenti, senza regressioni sulle regioni vicine. Checkpoint prima di operazioni rischiose e al termine di blocchi utili; mantenere la cadenza già autorizzata dal progetto, senza salvare e riaprire inutilmente a ogni tool call. Riapertura finale e confronti globali non si omettono.

Eventuali sessioni headless separate sono un'opzione futura solo se il backend installato, gli import/export necessari e le risorse sono realmente verificati. Non avviare installazioni o migrazioni per rendere parallelo un lavoro che può già essere analizzato offline.

## 6. QA e completezza: separare le prove

Mantenere distinti: esito del comando; validità topologica; fedeltà CAD/scan; spessore normale e funzione; conformità delle interfacce; equivalenza degli esportati; persistenza/riapertura; completamento dell'intero goal.

Confrontare su sorgente originale e domini corrispondenti, in entrambe le direzioni quando pertinente, documentando RMS, P95, massimo **campionato**, copertura, esclusioni, allineamento e impostazioni. Non nascondere errori con una media globale; tessellation chord e distanza fra tessellazioni non sono automaticamente precisione continua del CAD.

La parete nominale non è verificata dal solo minimo: controllare distribuzione, estremi e zone funzionali. Sezioni di costruzione e punti usati per il fit non bastano come verifica indipendente: controllare stazioni intermedie e porzioni non usate per l'adattamento. Le geometrie inferite richiedono prove funzionali o quote, non una falsa conformità allo scan non osservato.

Il contratto del progetto decide DONE: nessuna funzione obbligatoria irrisolta, esportati e nativo verificati, incertezze ed eventuali eccezioni autorizzate esplicite. Una dipendenza di montaggio non ancora disponibile blocca quella certificazione, non tutte le altre lavorazioni.

## 7. Due profili di impiego

**AIRBOX:** RE-Requisiti riconcilia le regioni e le note dell'ultimo handoff; RE-Geometria prepara regioni funzionali intere e connessioni al guscio; RE-QA controlla pareti, aperture e preservazione esterna. RE-Interfacce interviene su flange, portaganci, paratie, cilindretti e fori. Evitare che H02 o un'altra microzona monopolizzi il progetto, senza rinviare un difetto che blocca realmente una connessione. La baseline nota è 12 regioni, 44 note e parete nominale interna 3 mm: verificare il contratto corrente, non trattare questi numeri come regole di ogni pezzo.

**STL2 / Tubo Finale.obj:** RE-Requisiti preserva le indicazioni da foto e calibro, comprese scanalature squadrate; RE-Geometria lavora su sezioni/loft, interni nominali e dettagli funzionali; RE-QA misura anche tra le sezioni e verifica riduzione, originale ed esportati separatamente. La baseline è esterno protetto e parete nominale interna 2 mm; i fori 4,75 mm e il tassello 17,09 mm sono riferimenti di questo pezzo da riconciliare con l'handoff e le foto. Non lisciare uno spigolo reale come rumore. RE-Interfacce usa solo riferimenti AIRBOX congelati e dichiarati idonei: se l'Airbox è ancora incompleto o l'utente ha escluso nuove misure, non misurarlo, non modificarlo e lasciare aperta la prova di accoppiamento.

## 8. Persistenza, costo e apprendimento su GitHub

Il coordinatore è l'unico integratore Git del progetto. Gli agenti consegnano analisi o patch in percorsi esclusivi; non effettuano push concorrenti. Individuare la repository operativa dall'handoff, senza usare dev-method come deposito CAD.

Riutilizzare i documenti esistenti. Se mancano, mantenere nel repository operativo un `docs/RE_TEAM.md` (ruoli, ownership, revisione del metodo, strumenti), un `docs/RE_PROGRESS.md` (regioni/requisiti/prove/blocchi) e un `docs/RE_LESSONS.md` (contesto, errore, correzione, prima/dopo, quando applicare e quando no). Non imporre questi nomi se esiste già un equivalente. I report corposi e i modelli restano nelle destinazioni autorizzate; niente segreti, token, ID chat o percorsi personali nel metodo pubblico.

Una revisione del modello o una milestone aggiorna i registri; non ogni messaggio. Misurare regioni/requisiti realmente chiusi, difetti eliminati, tempo fino al risultato verificato, rigenerazioni e costo degli agenti quando disponibile. Non usare numero di feature o subagenti come proxy di successo. Nessuna percentuale di accelerazione è dimostrata da questa proposta.

Il Valutatore conserva i limiti dell'audit: tentativi mirati sulla stessa ipotesi sono bounded, non si azzerano cambiando agente, e si interrompono prima del budget se non informativi; i limiti del proprietario prevalgono. Non abbassare i criteri per chiudere il goal. Proporre al metodo condiviso soltanto lezioni riutilizzabili con evidenza, mantenendo le proposte non provate come tali.

## Fonti e precedenza

Consultazione: **1 novembre 2026**. Non sono stati avviati subagenti o collaudi CAD dalla pubblicazione di questa procedura.

1. Audit TMART del 31 ottobre 2026, snapshot `92451cfdee51ba9939fa7973bf002bdecf1f88be`: [audit](https://github.com/mrhz1973/TMART-Fusion-RE/blob/92451cfdee51ba9939fa7973bf002bdecf1f88be/docs/research/scan-to-solid-20261031/AUDIT_RE_SCAN_TO_SOLID_20261031.md), [procedura regionale](https://github.com/mrhz1973/TMART-Fusion-RE/blob/92451cfdee51ba9939fa7973bf002bdecf1f88be/docs/research/scan-to-solid-20261031/RE_WORKFLOW_PROPOSTA.md), [template regionale](https://github.com/mrhz1973/TMART-Fusion-RE/blob/92451cfdee51ba9939fa7973bf002bdecf1f88be/docs/research/scan-to-solid-20261031/RE_REGION_JOB.template.json). PR #3 ancora non unita alla lettura: non presumere questi file in main.
2. [Metodo contestuale](context-adaptive-execution-and-acceptance.md) e [casi Airbox/Tubo](../examples/scanruler-airbox-tubo-context-pilot.md), PR dev-method #4. Le versioni stabili precedenti non cambiano automaticamente.
3. Skill installata Team App e Fusion, letti `skill.md`, `references/ruoli.md` e `references/valutatore.md`: ruoli reali, unica ownership live, valutazione del metodo. Qui adattati a ScanRuler, senza attivare Fusion o imporre quella skill al runtime Codex.
4. [ScanRuler MCP ufficiale](https://github.com/CNCKitchen/ScanRuler/blob/main/mcp/README.md), blob osservato `66b8999f593801e2a685a393ff4c2cbc7551a7b3`: holder/relay, job, batch, schema discovery e isolamento. La build in uso deve essere verificata separatamente.
5. [OpenAI: subagenti Codex](https://developers.openai.com/codex/subagents), [orchestrazione](https://developers.openai.com/api/docs/guides/agents/orchestration), [parallelismo e limiti](https://developers.openai.com/api/docs/guides/responses-multi-agent): fonti per capacità e tradeoff; non equivalenza tra tutte le API e ogni client Codex.

Precedenza: autorizzazioni e requisiti attuali del proprietario, vincoli reali dell'ambiente, metodo adottato dal progetto, quindi questa ricetta sperimentale. Nessuna richiesta ai subagenti scavalca un diniego, un gate o un requisito.
