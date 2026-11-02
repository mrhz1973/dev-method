# RE — prima bozza rapida, affinamento soltanto su decisione del proprietario

**Direttiva del proprietario, 2 novembre 2026.** Priorità a un pezzo complessivo rapidamente disponibile, anche approssimato, invece di prolungare il lavoro per ridurre piccoli scarti. Il principio è riutilizzabile; budget e tolleranze di altri incarichi derivano dal loro mandato.

**Rettifica successiva prevalente:** applicare [affettamento obbligatorio e approvazione dei cambi di metodo](section-first-method-change-gate.md). Il budget rapido non autorizza a cambiare costruzione, scegliere un fallback o proseguire su altre regioni quando affettamento/metodo concordato sono bloccati. Fermare la lavorazione, riferire il motivo e attendere il consenso del proprietario prima di qualunque alternativa, anche su copia. La versione migliore già riconosciuta resta preservata; nessun riavvio o rollback è implicito.

## Precisazione successiva: preservare gli avanzamenti già avvenuti

Il proprietario non aveva ancora inviato il prompt precedente e chiarisce che il lavoro è avanzato. **Non ripartire da una vecchia revisione e non degradare geometrie migliori per applicare il target grossolano.** La lettura di questa direttiva non è autorizzazione a cambiare il CAD da parte del supervisore.

- **STL2 / Tubo:** il proprietario considera già soddisfacente la forma attuale. Conservare il candidato effettivamente più recente, salvare e predisporre la consegna del nativo modificabile e dello STEP se già disponibile o ottenibile direttamente. Niente altra ricostruzione, regolarizzazione o ricerca di minimi scarti. Riportare brevemente le verifiche ancora aperte, senza aprire campagne per chiuderle. Attendere nuove note esplicite per ulteriori modifiche. Non attribuire al consenso sulla forma una certificazione di spessore, montaggio o accuratezza.
- **AIRBOX:** il proprietario segnala che manca ancora la chiusura complessiva dopo oltre 24 ore. Il passaggio rapido autorizzato punta a **un solido CAD principale chiuso e coerente**, non a un'altra collezione di studi separati, preservando il migliore candidato riconosciuto. Budget complessivo di 20 minuti e deviazioni di forma fino a circa 5 mm per la bozza, soltanto entro il metodo approvato. Non perfezionare microdettagli non impeditivi. Un solido chiuso può mantenere bocche e passaggi funzionali: non tappare aperture fisiche per ottenere un PASS. Eventuali componenti realmente distinti restano distinti. Il successivo gate di approvazione del cambio metodo prevale e non consente di avviare automaticamente questo blocco se la strategia è contestata.

Queste sono priorità impartite dal proprietario, non un nuovo rilievo dello stato live. Ogni esecutore riconcilia soltanto il proprio candidato corrente e gli eventuali job pendenti, senza ricominciare l'audit.

## Contratto del passaggio rapido

**20 minuti totali**, non per contorno, regione, agente o tentativo. Il budget include preflight pertinente, analisi, costruzione, QA, deleghe, salvataggio e presentazione. È un limite al lavoro autonomo, non la garanzia di completare qualsiasi geometria. Riutilizzare lavoro ed evidenze valide; una bozza già idonea si mostra subito. Nessun reset del budget cambiando metodo, chat o nome del tentativo.

**Circa 5 mm di scarto dalla scansione** sono accettati sulla forma della bozza: non inseguire ora 0,5/0,8 mm o precisioni numeriche molto inferiori. È un cambio esplicito del requisito preliminare, non un criterio abbassato di nascosto dopo un test. Il dato non diventa massimo globale certificato senza misurazione: campioni, zone escluse e scarti maggiori si dichiarano. Non avviare una verifica esaustiva soltanto per certificare il numero 5.

Consegna del passaggio: candidato nativo realmente modificabile e salvato, viste reali consultabili, stato del solido e poche righe sui residui. STEP se direttamente disponibile; un problema di export non deve impedire di mostrare il nativo. Una mesh rinominata, un composto di corpi sovrapposti o un insieme di studi nascosti non sono il solido principale richiesto. Se non si riesce a chiuderlo nel budget, consegnare il miglior candidato e identificare esattamente la giunzione mancante: non fingere il successo e non prolungare in silenzio.

## Esecuzione essenziale

Usare prima strumenti nativi, primitive, fit di linee/archi, spline semplici, pochi profili informativi e un master per dettagli uguali, entro il metodo approvato. In ScanRuler seguire [il percorso nativo](../../adapters/scanruler/native-section-sketch-workflow.md); gli altri motori usano il proprio adattatore. “Brute force” significa costruzione diretta semplificata, non ricerca combinatoria indiscriminata e non deroga all'affettamento dei pezzi non semplici.

Le note definiscono rumore da rimuovere, spigoli veri e priorità. Un dettaglio non bloccante può restare nominale o da rifinire; non impedisce la presentazione. Se una prova impedisce di proseguire con il metodo concordato, fermare l'avanzamento e proporre al proprietario la correzione o la diversa rappresentazione: non eseguirla autonomamente. Nessun nuovo fitter, framework o audit globale. Un solo esecutore live; al più un aiuto mirato se utile e autorizzato. Il tempo dei delegati rientra nel budget comune e il loro lavoro rispetta lo stesso stop.

Proteggere originali, candidato migliore e possibilità di ripristino. Mantenere scala, quote nominali note, aperture e spessore nominale entro la costruzione concordata. L'accettazione di 5 mm sulla forma non autorizza a modificare di 5 mm un foro quotato o a fingere una parete corretta. I requisiti non ancora verificati si annotano: non giustificano né un cambio di metodo né la prosecuzione durante il blocco previsto dalla direttiva prevalente.

Preflight versione/sessione breve e riuso delle prove ancora valide. Un problema di accesso o aggiornamento che assorbe il budget si dichiara; non fingere che il tempo di preparazione sia stato modellazione. Riservare tempo alla consegna, non avviare nuovi job lunghi a scadenza. Un job già pendente va riconciliato senza interromperlo o ripeterlo alla cieca; dichiarare eventuale sforamento e non avviare altra rifinitura.

## Presentazione, controlli e arresto

Controllo nativo di chiusura/validità, esame grossolano della forma, salvataggio e viste sono le prove pertinenti alla presentazione preliminare. Non sostituiscono la qualificazione finale di parete, funzione, interfacce o fedeltà globale. Il candidato resta una bozza non qualificata per impiego funzionale, salvo verifiche già dimostrate.

**Alla scadenza, o prima se il candidato è pronto da valutare, mostrarlo e fermare l'ottimizzazione autonoma.** Non attendere di certificare l'80% o tutte le note. Il proprietario sceglie se conservarlo, modificarlo manualmente o assegnare una rifinitura con note e nuovo budget. Nessun passaggio automatico da 5 a 2 a 0,5 mm. Per il tubo ora accettato non inizia nemmeno un nuovo blocco di finitura senza richiesta.

La consegna preliminare non equivale a DONE tecnico globale. L'attesa del proprietario va rispettata dai goal e dalla supervisione. Niente Auto-Vai, marcatori legacy, nuovi timer o ripartenze automatiche. Resoconto breve: risultato mostrato, tempo reale, limiti e scelta richiesta; nessuna promessa di risparmio token non misurato.

## Precedenza e adozione

Questo mandato prevale, nel passaggio preliminare, su precisione fine, QA esaustiva e prosecuzione indefinita fino alla validazione completa, ma è subordinato alla successiva direttiva di affettamento e approvazione preventiva di ogni cambio di metodo. Non abroga permessi, protezione del lavoro altrui e riconciliazione degli esiti incerti. Applicarlo al prossimo confine sicuro senza riavviare o interrompere alla cieca sessioni attive.

Leggere una volta e annotare l'adozione nel prossimo aggiornamento utile, senza nuovi rapporti dedicati. Pubblicazione, lettura dell'agente ed esecuzione sono eventi distinti. Fonte: istruzioni e successive precisazioni del proprietario del 2 novembre 2026. Nessuna modifica CAD o certificazione dei pezzi deriva da questa pubblicazione.
