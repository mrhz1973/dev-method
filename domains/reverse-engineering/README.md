# Dominio comune — reverse engineering

Questo livello è condiviso da Fusion e ScanRuler. Non contiene comandi MCP, porte, versioni dell'app o checkpoint di un pezzo.

## Affettamento e cambio di metodo — direttiva prevalente del 2 novembre 2026

Applicare prima di ogni strategia [affettamento obbligatorio e consenso preventivo ai cambi di metodo](section-first-method-change-gate.md). Pezzi non semplici: sezioni significative, profili regolarizzati e costruzione concordata. **Qualunque cambio di metodo deve essere proposto e approvato dal proprietario prima dell'esecuzione.** Se affettamento o metodo concordato non riescono, fermare l'avanzamento CAD della lavorazione, spiegare la causa e attendere: non proseguire su altre regioni o con alternative. Sono consentiti soltanto diagnosi minima in lettura, riconciliazione e salvataggio protettivo. Un problema di invio non dimostra un fallimento geometrico. Questo gate vale anche per subagenti e proposte di modifica normativa del metodo; prevale su autonomia, cambio strategia dopo tentativi e budget rapido. Non annulla permessi o sicurezza e non autorizza rollback dei modelli.

## Prima bozza rapida — subordinata al consenso sui cambi di metodo

Applicare [prima bozza a tempo, poi affinamento scelto dal proprietario](coarse-first-timeboxed.md). Per AIRBOX/STL2: budget complessivo di 20 minuti per presentare il candidato, fedeltà iniziale anche grossolana fino a circa 5 mm, riuso del lavoro migliore già esistente. Non confondere questa accettazione della bozza con una certificazione metrologica o funzionale. Mostrare il risultato entro il budget anche se incompleto, dichiarare i limiti e attendere la scelta fra conservare, modificare manualmente o affinare con un nuovo incarico. Il gate visivo scatta alla scadenza o prima, senza aspettare l'80%; gli obiettivi di precisione fine e la QA finale non sono prerequisiti alla prima visione. Nessun affinamento automatico e nessun cambio di metodo non approvato. I numeri valgono per questo mandato, non come parametri impliciti di qualsiasi nuovo pezzo.

## Priorità delle note e revisione con il proprietario

Direttiva del 2 novembre 2026: leggere e applicare [prima le note, poi la rifinitura concordata](notes-first-visual-review.md). Le note sono la coda delle correzioni, non solo oggetto di analisi. Quando resta circa il 20% del lavoro, mostrare il candidato reale e attendere le annotazioni del proprietario prima della rifinitura finale; anticipare il confronto se i tentativi non producono risultati. Se forma generale e note finali sono già state approvate/assegnate, lavorare su quelle senza ripetere l'approvazione o riaprire l'intero audit. Non derogare ai controlli tecnici essenziali o al gate sui cambi di metodo.

## Metodo comune

Definire risultato e funzione dal contesto; preservare la sorgente; distinguere replica misurata, ricostruzione nominale e ridisegno autorizzato; suddividere in regioni funzionali con confini condivisi e dipendenze; scegliere rappresentazione e prova dello spessore prima di estendere il metodo; costruire e verificare per blocchi significativi. Se il progresso è insufficiente, proporre una diversa strategia al proprietario, senza applicarla prima del consenso.

Tenere distinti esito del comando, validità del solido, fedeltà alla sorgente, spessore, accoppiamenti, editabilità, esportazione e salvataggio/riapertura. Un singolo PASS non è DONE globale. Misure e tolleranze vengono dal contratto del pezzo, non da un altro progetto. Quote dedotte, geometrie non osservate e esclusioni devono restare esplicite.

Le evidenze devono identificare revisione, riferimento, unità, frame, dominio misurato, campionamento, metriche e limiti. Una tecnica si riusa quando contesto, prove e autorizzazioni lo giustificano; nessuna soglia di tempo o sequenza globale/locali è universale. Nei pezzi non semplici resta obbligatorio il sezionamento prescritto sopra.

## Fonti e stato

Audit scan-to-solid del 31 ottobre 2026: snapshot `92451cfdee51ba9939fa7973bf002bdecf1f88be` nella repository privata `mrhz1973/TMART-Fusion-RE`, directory `docs/research/scan-to-solid-20261031/`. Il nome storico del contenitore non rende l'audit una metodologia esclusivamente Fusion. Consultare `RE_WORKFLOW_PROPOSTA.md`, il rapporto e il template regionale quando pertinenti; non copiare materiali privati nel metodo pubblico.

Pilot di decisione adattiva: [snapshot verificato](https://github.com/mrhz1973/dev-method/blob/8b396f263de989f938a6aa1082534634571cab4d/patterns/context-adaptive-execution-and-acceptance.md). È una proposta applicabile per mandato, non prova di accelerazione misurata né nuova release stabile. Le disposizioni storiche sul cambio autonomo di metodo sono superate dal consenso preventivo prescritto sopra.

## Selezionare la tattica

- [ScanRuler](../../adapters/scanruler/README.md): progetto `.scanruler`, MCP ScanRuler e sua sessione.
- [Autodesk Fusion](../../adapters/fusion/README.md): documento Fusion, MCP Fusion e sua sessione.

Trasferimenti STEP/STL fra motori richiedono provenienza, revisione, unità/frame, originali preservati e verifiche delle proprietà alterate. Cambiare engine o costruzione dopo un'operazione fallita richiede consenso esplicito, non soltanto la disponibilità tecnica del nuovo strumento.

## Apprendimento

Stato, misure e decisioni del pezzo restano nella repository operativa. Proporre al livello comune solo lezioni indipendenti dal motore; una lezione su un comando ScanRuler riguarda l'adattatore ScanRuler, non quello Fusion. Registrare quando applicare, come, perché, prove e controindicazioni. Nessuna nuova regola attiva o modifica del metodo viene promossa senza approvazione del proprietario.
