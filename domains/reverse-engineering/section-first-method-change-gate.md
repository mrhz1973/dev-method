# RE — affettamento obbligatorio e blocco dei cambi di metodo

**Direttiva esplicita del proprietario, 2 novembre 2026.** Si applica a tutti i suoi progetti di reverse engineering, presenti e futuri, con ScanRuler, Fusion o altri motori. Questa richiesta autorizza la presente modifica documentale, non modifiche ai modelli o un nuovo avvio delle lavorazioni.

## 1. Metodo iniziale e riferimento da preservare

Prima di costruire, identificare il metodo già concordato, il candidato corrente e il migliore risultato precedentemente riconosciuto dal proprietario. Il cambio di applicazione, chat o agente non annulla quel metodo e non autorizza a sostituire una costruzione riuscita con una strategia diversa. Se il metodo corrente non è identificabile, presentare una proposta e ottenere conferma prima di nuove modifiche CAD.

**Se il pezzo non è semplice, l'affettamento è obbligatorio:** sezioni significative della scansione → profili regolarizzati con gli strumenti nativi → costruzione coerente secondo il metodo concordato (per esempio loft/sweep). Scegliere sezioni sui cambi di forma e sulle interfacce; usare direzioni aggiuntive e piani obliqui quando necessari. Riutilizzare sezioni ancora valide: non rifare l'intero rilievo a ogni ripresa. Non copiare il rumore punto per punto né creare sezioni inutili per adempiere formalmente alla regola.

L'eccezione riguarda soltanto pezzi chiaramente semplici, descrivibili direttamente con primitive o un profilo elementare senza transizioni complesse. Motivarla brevemente nel registro già esistente. Non classificare come semplice ogni piccolo tassello di un pezzo complesso per eludere l'affettamento dell'insieme; nel dubbio applicare il percorso per pezzo non semplice. Anche per un pezzo semplice, cambiare un metodo già concordato richiede approvazione.

## 2. Qualunque cambio di metodo richiede consenso preventivo

**L'AI non può cambiare autonomamente il metodo.** Prima di applicare una strategia diversa deve fermarsi, spiegare il motivo e ottenere l'approvazione esplicita del proprietario. Il vincolo riguarda coordinatore, esecutori, supervisore e subagenti.

Sono cambi di metodo, anche se presentati come soluzione provvisoria: abbandonare sezioni/loft per superfici indipendenti ispessite e unite; cambiare rappresentazione o decomposizione del corpo principale; passare a un altro motore o a calcoli esterni in sostituzione della costruzione concordata; ricominciare da zero; modificare il percorso di spessore, le ipotesi progettuali, le tolleranze o i criteri di accettazione concordati. Anche una modifica normativa del metodo condiviso richiede approvazione prima della sua adozione/pubblicazione come regola attiva; le lezioni possono essere proposte, non autoapprovate.

L'esecuzione ordinaria del piano approvato non richiede conferma a ogni comando: aggiungere una sezione necessaria, regolarizzare un profilo o correggere un parametro entro i vincoli già autorizzati non costituisce di per sé cambio di metodo. Questo non autorizza a ignorare il blocco del paragrafo seguente. Una prova dell'alternativa su copia è già esecuzione del nuovo metodo e richiede consenso.

## 3. Affettamento impossibile o metodo bloccato: fermare il lavoro

Se non si riesce a effettuare l'affettamento, a ottenere profili utilizzabili oppure a proseguire con il metodo concordato, **bloccare l'avanzamento CAD dell'intera lavorazione interessata e informare subito il proprietario**. Non continuare su altre regioni dello stesso pezzo per evitare lo stop; non delegare a un altro agente il metodo alternativo. Altri progetti indipendenti non vengono interrotti.

Distinguere il motivo effettivo: accesso/permessi, trasporto o invio MCP, schema/input, disponibilità della funzione, dati insufficienti, oppure errore geometrico restituito dal kernel. **Un invio rifiutato prima dell'esecuzione o un timeout non provano che il loft o il metodo geometrico siano falliti.** Un diniego deve essere rispettato, non aggirato.

Durante lo stop sono consentiti soltanto diagnosi minima in lettura necessaria a spiegare il blocco, riconciliazione sicura degli eventuali job già in corso e salvataggio protettivo del lavoro esistente. Non avviare nuove mutazioni, esperimenti, audit estesi o costruzioni alternative. Non terminare alla cieca job o processi altrui per simulare un arresto immediato.

## 4. Comunicazione e sblocco

Comunicare in poche righe: metodo concordato; operazione bloccata ed evidenza; ultimo candidato preservato; alternativa eventualmente proposta con conseguenze; decisione richiesta. Non serve un nuovo protocollo Auto-Vai o un rapporto voluminoso. Nel registro esistente basta annotare «in attesa di approvazione del cambio di metodo».

Riprendere soltanto dopo consenso esplicito riferito alla proposta e al suo ambito. Silenzio, scadenza del budget, nuovi subagenti, pressione a finire, un goal automatico o un generico «continua» non autorizzano un cambio non approvato. Una risposta di assenso a una singola proposta chiaramente identificata è sufficiente; registrarla una volta con il riferimento alla decisione. L'approvazione non supera permessi o vincoli di sicurezza.

## 5. Precedenza e adozzione

Questa direttiva prevale sulle precedenti istruzioni di autonomia, cambio strategia dopo tentativi falliti, prosecuzione su regioni indipendenti, prima bozza in 20 minuti e affinamento adattivo. I budget e le tolleranze già autorizzati restano validi nel metodo concordato, ma non giustificano deroghe al blocco. Non richiede rollback, cancellazione di studi o ripartenza del CAD esistente. La versione che il proprietario indica come migliore resta preservata: nessuna sostituzione senza consenso.

Collegare questa pagina dal dominio comune, dagli ingressi degli agenti e dagli adattatori. Registrare la lettura una volta nel prossimo handoff/aggiornamento utile. Pubblicazione GitHub, ricezione della chat e applicazione effettiva sono fatti distinti: non dichiarare una sessione fermata o una regola recepita senza prova. La supervisione oraria deve riconoscere questa attesa come voluta e non chiedere ripartenze automatiche. Auto-Vai resta sospeso.
