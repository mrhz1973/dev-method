# RE — prima le note del proprietario, poi la rifinitura concordata

**Direttiva del proprietario: 2 novembre 2026.** Valida per i suoi lavori di reverse engineering, con tattica adattata al motore e al pezzo. Non è una nuova checklist per ogni chiamata né una prova che il processo sia già più veloce.

## 1. Le note sono la coda di lavoro, non materiale da inventariare soltanto

Quando il proprietario indica scanalature, deformazioni, unioni o raccordi, il prossimo blocco utile deve correggere quelle richieste. Ordine: blocco reale di sicurezza/integrità → priorità esplicite del proprietario → altre note obbligatorie → rifiniture facoltative. Ogni eccezione deve indicare quale correzione viene impedita e da quale prova concreta; un dubbio generale non basta a bloccare tutte le note.

Riutilizzare il registro esistente con: ID/testo della nota, zona e revisione, effetto richiesto, stato, prova prima/dopo e prossimo passo. Distinguere APERTA, IN_LAVORO, CORRETTA_DA_VERIFICARE, VERIFICATA, BLOCCATA_DATO e IN_REVISIONE_UTENTE; i nomi si possono mappare al vocabolario del progetto. Leggere, misurare, produrre un report o creare una feature non chiude una nota. La verifica locale può chiuderla tecnicamente; l'approvazione della forma da parte del proprietario resta separata quando richiesta.

Se l'utente identifica un'ondulazione come rumore e chiede di lisciarla, quello è intento progettuale di ricostruzione nominale: non inseguire proprio quell'ondulazione per minimizzare lo scarto dalla mesh. Preservare invece i profili squadrati e i dettagli funzionali che l'utente ha dichiarato reali. Segnalare contraddizioni concrete senza riaprire indefinitamente l'identità del pezzo o l'intero audit. Un dubbio sull'esatta posizione di una nota si risolve mostrando la zona annotata e chiedendo soltanto la correzione indispensabile.

## 2. Ciclo corto per una nota o un piccolo gruppo adiacente

**Localizza → scegli la correzione → salva → modifica su copia recuperabile → verifica gli effetti pertinenti → mostra prima/dopo → aggiorna la nota.**

La diagnosi è limitata alla decisione che sblocca la correzione. Riutilizzare misure, sezioni e QA ancora validi; invalidare solo le prove dipendenti dalla geometria cambiata. Un solo confronto esteso a milestone o prima della consegna quando necessario, non un nuovo audit globale a ogni tentativo. I controlli essenziali su solidità, spessore, fori, interfacce e regressioni non si eliminano per accelerare.

Per un raccordo di finitura senza raggio prescritto, distinguere raggio fisicamente misurato e proposta nominale. Se il mandato lo consente e non tocca quote/interfacce critiche, provare una soluzione nominale recuperabile e mostrarla; non spendere ore cercando nelle fotografie una precisione inesistente. Se cambia una funzione critica, chiedere il solo dato o consenso necessario. Non arrotondare scanalature o spigoli che devono restare netti.

Ogni nuova analisi deve rispondere a: **quale nota sblocca, quale decisione cambierà e quale esito farà terminare il controllo?** Se non risponde, non avviarla. Una discrepanza diagnostica separata rimane registrata ma non diventa automaticamente prerequisito per tutte le finiture.

**Trigger anti-loop per questi goal:** dopo due cicli consecutivi sulla stessa correzione senza miglioramento verificabile né un nuovo dato che renda eseguibile il passo successivo, anticipare il confronto visivo con il proprietario. Non aprire una catena di subagenti o rinominare l'ipotesi per azzerare il conteggio. Non è un tetto universale di minuti: i calcoli utili già in corso e i vincoli del progetto si riconciliano prima. Fermare la sola rifinitura incerta; non cancellare lavori o interrompere processi altrui.

## 3. Revisione visiva quando resta circa il 20% del lavoro

«Al 20% dal termine» significa **circa l'80% del risultato previsto realizzato**, non dopo il 20% iniziale. È una stima di maturità motivata da forma complessiva, funzioni rappresentate e correzioni residue, non dal numero di feature, tool call, test o ore. Non inventare un 80% esatto e non pretendere tutte le certificazioni finali prima di mostrare il modello.

Quando la forma principale è riconoscibile e rimangono soprattutto correzioni locali/rifiniture, oppure prima se il proprietario lo chiede o scatta l'anti-loop:
- salvare e identificare il candidato;
- mostrare immagini reali della revisione, con poche viste d'insieme, dettagli delle note prioritarie e confronto prima/dopo dove disponibile; niente rendering inventati o immagini di una revisione diversa;
- indicare in poche righe cosa è pronto, cosa manca e cosa non è verificato;
- chiedere al proprietario di annotare dove concentrare il lavoro finale.

Le immagini devono essere rese effettivamente consultabili nella chat o in un report accessibile: il solo percorso locale non equivale ad aver mostrato il pezzo. Se manca accesso alle viste, segnalarlo e conservare il checkpoint; non dichiarare la revisione effettuata.

Impostare **WAIT_OWNER_REVIEW** per la rifinitura che richiede le nuove priorità: non continuare a inventare miglioramenti mentre si attendono le note. Sono consentiti salvataggio, riconciliazione di job e verifiche essenziali non distruttive già autorizzate; nessuna nuova campagna diagnostica per riempire l'attesa. Dopo le note, eseguire il passaggio finale secondo quelle priorità e i gate tecnici ancora obbligatori.

Se il proprietario ha già approvato la forma generale e dato note di finitura, questa revisione è già avvenuta: registrarla e lavorare sulle note, senza ripartire dalla ricostruzione globale né richiedere la stessa approvazione. Se la geometria cambia sostanzialmente o resta ambiguo il risultato desiderato, mostrare il nuovo candidato. Una nuova richiesta di visione prevale sul precedente consenso.

## 4. Subagenti e misura del progresso

Il coordinatore resta l'unico esecutore live. Nella fase di finitura impiegare di norma un delegato per la correzione della nota attiva e un verificatore circoscritto, riusando ruoli e snapshot; gli specialisti aggiuntivi servono soltanto a una dipendenza esplicita. Non trasformare ogni dettaglio in più analisi indipendenti dell'intero modello. Nessun subagente crea altri incarichi o misure al di fuori dell'obiettivo assegnato senza decisione del coordinatore.

Il resoconto utile è: **note corrette/verificate; note ancora aperte; risultato visibile; blocco concreto; stato della revisione con il proprietario.** Separare tentativi applicati, scartati, QA e documentazione. Un backup ripetuto è protezione, non avanzamento geometrico; una modifica ai parametri può essere progresso anche senza nuove feature. Quantificare token/costi soltanto da telemetria disponibile, mai dai file o dalla durata.

DONE richiede le note obbligatorie risolte, le eventuali eccezioni esplicitamente concordate e le verifiche/consegne del contratto. L'approvazione visiva orienta il lavoro ma non sostituisce integrità CAD, funzione o sicurezza. La revisione umana è parte dell'autonomia richiesta: aspettarla non autorizza Auto-Vai o altri sistemi a inviare un nuovo comando.

## 5. Adozione e ambito

Applicare alle chat AIRBOX e STL2 e riutilizzare nei nuovi progetti RE del proprietario senza ereditare numeri di note, spessori o tolleranze dei pezzi attuali. Gli strumenti per viste, annotazioni e correzioni restano nei rispettivi adattatori ScanRuler/Fusion. La direttiva prevale sulle precedenti indicazioni generiche di proseguire fino a DONE quando è il momento della revisione umana.

Registrare lettura, ref del metodo e revisione esaminata nel prossimo handoff esistente. Nessun nuovo servizio, timer, file bridge, migrazione o cambiamento delle sessioni è implicito. Pubblicazione su GitHub, lettura dell'agente e applicazione concreta sono tre eventi diversi; non dichiarare recepita una regola senza riscontro.

Fonte normativa: richiesta esplicita del proprietario del 2 novembre 2026. I dettagli delle verifiche sul tubo restano nella repository operativa privata; non si promuove un esito locale a dimostrazione universale del metodo.
