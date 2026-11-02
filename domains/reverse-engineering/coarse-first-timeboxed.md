# RE — prima bozza rapida, affinamento soltanto su decisione del proprietario

**Direttiva del proprietario, 2 novembre 2026.** Per AIRBOX e STL2 la priorità è ottenere e mostrare rapidamente il pezzo complessivo, anche approssimato, invece di prolungare il lavoro per ridurre piccoli scarti. Il principio è riutilizzabile; budget e tolleranze di altri incarichi derivano dal loro mandato, non si ereditano automaticamente.

## Contratto del primo passaggio

- **Budget: 20 minuti complessivi per il pezzo/candidato da presentare**, non per contorno, regione, agente o tentativo. È un limite al lavoro autonomo, non una garanzia che ogni pezzo risulti completo in quel tempo. Riutilizzare il modello corrente: non distruggere o degradare geometrie migliori e non ricominciare per consumare il budget. Se una bozza già esiste, mostrarla senza attendere altri 20 minuti.
- **Fedeltà grossolana: il proprietario accetta scostamenti fino a circa 5 mm dalla scansione per la bozza.** Non inseguire soglie da finitura (0,5/0,8 mm o precisioni numeriche molto inferiori) prima della presentazione. Questo è un cambio esplicito dello scopo del primo passaggio, non una modifica nascosta dei criteri dopo un test fallito. Migliorare sotto 5 mm non ha priorità sulla copertura del pezzo e sul tempo.
- **Consegna:** candidato CAD nativo salvato e realmente modificabile, viste reali consultabili e poche righe sui limiti. Preferire STEP se già producibile senza un nuovo ciclo lungo; non bloccare la visione del nativo perché il round-trip finale è aperto. Una mesh semplicemente rinominata o un insieme di studi nascosti non equivale a un CAD complessivo. Presentare una variante coerente; corpi/superfici separati o zone mancanti vanno evidenziati, non nascosti.
- **Limiti dichiarati:** 5 mm è un obiettivo/accettazione della forma, non un massimo globale certificato senza misura. Bastano controlli locali rappresentativi e visuali per questo stadio, indicando il campionamento. Scarti oltre il target, zone non confrontate, topologia non verificata o parti mancanti si mostrano comunque alla scadenza come residui, senza etichettare il risultato conforme. Nessuna nuova verifica esaustiva soltanto per certificare il numero 5.

## Esecuzione essenziale

Usare prima strumenti nativi, primitive, fit regolarizzato di linee/archi, spline semplici, pochi profili informativi e master per dettagli uguali. In ScanRuler seguire [il percorso nativo](../../adapters/scanruler/native-section-sketch-workflow.md); altri motori usano il proprio adattatore. “Brute force” significa qui costruzione diretta semplificata, non ricerca combinatoria indiscriminata.

Il coordinatore sceglie la rappresentazione che produce più geometria utile entro il budget. Le note del proprietario definiscono rumore da rimuovere, spigoli da preservare e priorità; non sospendere l'intero pezzo per perfezionare ogni nota. Un dettaglio non bloccante può essere rappresentato nominalmente o lasciato esplicitamente da rifinire. Una prova fallita non apre una campagna di analisi: cambiare rappresentazione in modo semplice o lasciare il limite visibile. Non creare nuovi fitter, framework, benchmark o gruppi di subagenti per una bozza.

Un solo esecutore CAD; al più un aiuto circoscritto se davvero indipendente e utile. Non avviare agenti per riempire l'attesa. Budget unico condiviso: analisi, QA, report e deleghe consumano lo stesso tempo. Registrare avvio/scadenza nel registro già esistente e riservare gli ultimi minuti a salvataggio e presentazione. Non azzerare il tempo cambiando chat, metodo, nome del tentativo o subagente. Interruzioni e operazioni ancora pendenti si dichiarano; nessuna promessa di esecuzione in background.

Preflight versione/sessione e conservazione degli originali restano necessari, ma sono brevi e riusano le prove ancora valide. Un problema di accesso, riavvio o aggiornamento che assorbe il budget si riferisce separatamente: non fingere 20 minuti di modellazione né prolungare il tentativo in silenzio. Non avviare un job lungo a ridosso della scadenza. Se un job la supera, non ripeterlo né interromperlo alla cieca: riconciliare l'esito, dichiarare lo sforamento e presentare l'ultimo candidato recuperabile, senza nuova rifinitura.

## Controlli proporzionati, non consegna finale anticipata

Mantenere integrità dei file, unità/scala e reversibilità. Conservare quote nominali già note, spessori e dettagli funzionali con la costruzione più semplice disponibile: la tolleranza di forma di 5 mm non è un permesso di alterare un foro quotato di 5 mm o usare una parete di spessore negativo. Dove il requisito non è ancora dimostrato, scrivere DA_VERIFICARE invece di trasformarlo in un audit infinito. Non presentare la bozza come pronta per montaggio, impiego o stampa funzionale verificata.

Validità del kernel quando disponibile, esame grossolano della forma, salvataggio e viste bastano alla **presentazione provvisoria**; non equivalgono a validazione finale di spessori, interfacce, autointersezioni, esportati o fedeltà globale. I controlli finali diventano parte di un incarico successivo se il proprietario lo richiede.

## Arresto e scelta umana obbligatoria

**Alla scadenza dei 20 minuti, oppure prima quando il candidato è leggibile, mostrare ciò che esiste e fermare l'ottimizzazione autonoma.** Non aspettare di dimostrare l'80% o di chiudere tutte le note. Questa direttiva anticipa il gate visivo precedente. Le sole attività consentite per chiudere il passaggio sono riconciliazione, protezione del risultato e presentazione.

Il proprietario decide: usare/conservare la bozza; correggerla manualmente; assegnare un altro blocco con note e budget specifici; oppure richiedere affinamento e validazione finale. Nessun passaggio automatico da 5 a 2 a 0,5 mm. Se la forma generale era già accettata, applicare il budget al blocco di finitura richiesto, non ricostruire l'intero pezzo. Non ripetere una revisione già eseguita solo per rimandare note già assegnate, ma mostrare il nuovo candidato alla fine del blocco.

La bozza può essere CONSEGNATA_PER_REVISIONE senza che il GOAL finale sia DONE. L'attesa del proprietario è intenzionale e va rispettata anche dai goal nativi e dalla supervisione; niente Auto-Vai, marcatori legacy o ripartenza automatica. Resoconto: risultato mostrato, tempo reale, limiti principali e decisione richiesta. Il risparmio di tempo/token è un obiettivo, non un risultato già misurato.

## Precedenza e adozione

Questa scelta esplicita prevale, per il primo passaggio, sugli obiettivi precedenti di precisione fine, QA esaustiva e prosecuzione fino alla validazione completa. Non abroga permessi, protezione del lavoro altrui o stop su esiti mutativi incerti. Applicarla al prossimo confine sicuro senza riavviare o interrompere alla cieca sessioni attive.

Leggere questa pagina una volta e annotare l'adozione nel prossimo aggiornamento utile: nessun nuovo ciclo di documentazione. Pubblicazione GitHub non prova ricezione dagli agenti. Fonte: mandato diretto del proprietario; nessun CAD modificato, benchmark o timer esecutivo creato dalla sola pubblicazione.
