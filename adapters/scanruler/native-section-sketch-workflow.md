# ScanRuler — contorni regolari con gli strumenti nativi

**Direttiva operativa del proprietario, 2 novembre 2026.** Per ricostruire contorni da sezioni di scansioni, seguire il metodo dell'operatore CAD: selezionare la traccia utile, scegliere poche entità regolari, usare il fitting integrato, vincolare il profilo e costruire. Non ricopiare punto per punto la seghettatura della sezione e non sostituire una funzione nativa con una campagna di script e verifiche. Questa regola attua l'audit, non lo ripete. Non promette un tempo fisso o un risparmio di token non misurato.

## 1. Quando applicarla e quale forma ricostruire

Applicarla a contorni di sketch, profili di loft/sweep, scanalature, bordi e raccordi ricavati dalle sezioni. Non obbligare un passaggio a sketch se una primitiva o una superficie nativa già idonea risolve direttamente la regione. Un pezzo realmente libero non diventa prismatico per accelerare.

Le sezioni sono riferimenti, non il disegno da riprodurre senza interpretazione. Rettilineo previsto → linea; curvatura circolare sostenuta dai dati → arco; forma libera → spline con il minimo numero di punti che descrive la forma utile. Separare tratti e spigoli reali: non usare una spline unica per arrotondare scanalature squadrate. L'interpolazione di tutti i punti rumorosi non equivale a regolarizzazione.

Le note del proprietario che identificano rumore, planarità o elementi identici definiscono l'intento nominale. Non riaprire quell'intento con nuovi fit al rumore. Preservare quote, ingombri, aperture, accoppiamenti e spessore; distinguere geometria osservata da proposta nominale. Un difetto volumetrico o una misura incerta estranea al contorno non blocca automaticamente una correzione indipendente.

## 2. Capacità native verificate, non nomi inventati

Documentazione e schema ufficiali letti nel tag **v0.9.4** il 02/11/2026. È una baseline di capacità, non una certificazione della build live né l'ordine di installare questa versione. Prima dell'uso mantenere il preflight corrente e leggere una volta lo schema effettivamente esposto; riutilizzarlo finché la build non cambia. I nomi con punti nella documentazione sono normalmente esposti dal MCP con underscore.

| Azione manuale | Percorso nativo da usare quando pertinente |
|---|---|
| Esaminare il taglio e le entità adattate senza creare il CAD | `reverse.section.fit` / `reverse_section_fit`; selezionare la catena/regione pertinente, non leggere tutti i vertici a ogni passaggio. |
| **Fit all chains** nello sketch | `reverse.feature.add` con `feature.kind="sketch"`, piano verificato e `sketch.fit`: lo schema descrive il fitting corrispondente al pannello manuale. |
| Controllare complessità e scarto del fit | `detail`, `tolerance`, scelta `chains` e ritaglio `within`; selezione della pelle/direzione con `skin`/`facing` quando appropriata. |
| Curva regolare non descritta bene dal fit automatico | `sketch.fit.arcs` oppure `sketch.fit.spline`, sulla sola catena utile. Spline: pochi punti iniziali, aumentarli solo per una forma reale non rappresentata. |
| Congiungere e vincolare | `joinCorners`, vincoli dello sketch e candidati selezionati con `accept`; `alignAxes` solo se il datum conferma la direzione. |
| Riutilizzare bordi e stazioni | Geometria proiettata, `fit.share` e `fit.like` per la corrispondenza fra stazioni a linee/archi. Nello schema letto `like` non si combina con `arcs` o `spline`: non inventare una compatibilità. |
| Correggere uno sketch esistente | `reverse.sketch.edit` / `reverse_sketch_edit`, mantenendo le dipendenze. Per il refit lo schema indica rimozione dei soli pezzi interessati e `add.fit`; `reverse.feature.update` non accetta `sketch.fit` come refit. |
| Forma nominale già nota | Primitive e `sketch.shapes`/entità semplici con dimensioni e vincoli: non è necessario stimare di nuovo ogni punto della scansione. |

La presenza di queste capacità nel sorgente non autorizza chiamate fuori dagli strumenti consentiti. Se una capacità manca nella build collegata, riportare il nome e l'errore effettivo; usare un altro percorso nativo o UI autorizzata, oppure segnalare la lacuna. Non costruire automaticamente un nuovo framework o bypassare un diniego.

## 3. Ciclo breve: ottenere un contorno utilizzabile e proseguire

1. **Definire il risultato locale:** nota/regione, contorno aperto o chiuso, pelle, piano/frame, tratti regolari e spigoli da conservare. Riutilizzare la sezione e i dati già disponibili. Una vista utile e le quote pertinenti sono preferibili a un nuovo audit globale.
2. **Scegliere prima la rappresentazione semplice:** fitting nativo di linee/archi; spline soltanto sui tratti realmente liberi; primitive nominali quando l'intento è già confermato. Scegliere la catena corretta: `all` o `largest` non sono prove che si stia ricostruendo il contorno giusto.
3. **Lasciare il calcolo all'applicazione:** tolleranza di fit coerente con rumore e contratto della regione, dettaglio non superiore a quello necessario. Non confondere tolleranza al dato acquisito, precisione di chiusura CAD ed equivalenza degli esportati. Il valore numerico CAD di un altro controllo non obbliga a inseguire il rumore della sezione. Non allentare il criterio di accettazione per nascondere un fallimento.
4. **Correggere soltanto i difetti rimasti nel profilo:** estremi coincidenti, tangenza dove prevista, spigoli dove richiesti, aperture e connessioni. `closeGaps` si usa solo per lacune d'acquisizione riconosciute, mai per chiudere automaticamente fori o scanalature fisiche. Verificare che `share`/allineamento non cancellino un piccolo gradino funzionale.
5. **Controllo locale sufficiente alla prossima operazione:** vista del contorno sovrapposto alla sezione; chiusura, autointersezioni e regioni secondo la destinazione; scarti pertinenti, quote e dettaglio funzionale. Se idoneo, passare a estrusione/loft/sweep invece di continuare a minimizzare residui senza utilità. Un profilo costruibile non è ancora un pezzo finale validato.
6. **Verificare il risultato del blocco:** per loft, controllare anche fra le stazioni e preservare corrispondenza/orientamento; per pareti, verificare lo spessore risultante. Un offset in uno sketch non dimostra spessore normale costante di una superficie 3D. Conservare i controlli finali previsti dal contratto, senza ripeterli tutti per ogni vertice.

Non prendere il massimo numero ammesso di punti spline o il dettaglio massimo come impostazione predefinita. Non imporre tangenza attraverso uno spigolo reale. I bordi di regioni confinanti si condividono, non si riadattano indipendentemente fino a ottenere fessure. Per geometrie ripetute dichiarate uguali, completare un master e riutilizzarlo; verificare separatamente pose e attacchi locali.

## 4. Stop alla ricerca indefinita

Prima scelta nativa → controllo locale → sola correzione motivata. Dopo due cicli senza miglioramento o nuova informazione azionabile applicare il confronto visivo anticipato già previsto dal metodo; non azzerare il conteggio cambiando agente o script. Un fallimento nativo giustifica una diagnosi circoscritta alla causa, non una ricerca generica su tutta la mesh.

In questa fase basta il coordinatore/esecutore e, quando utile, un verificatore locale. Un contorno semplice non richiede una squadra di ricostruzione, metrologia, registrazione fotografica e audit globale in parallelo. Python può aggregare dati o fare un controllo indipendente necessario; un nuovo fitter deve avere un limite nativo concreto documentato e rientrare nel mandato, non essere il percorso abituale.

Nessuna nuova obbligazione di report per chiamata. Nel progresso già esistente bastano nota/contorno corretto, strumento nativo usato, esito e prova prima/dopo. Se il fit soddisfa lo scopo, non rilanciarlo solo perché si può ottenere un residuo minore. Misurare l'efficacia dal tempo fino al contorno utilizzabile e dalle note risolte, non dal numero di campioni, feature, report o agenti.

Rimangono prevalenti [priorità alle note e revisione visiva](../../domains/reverse-engineering/notes-first-visual-review.md), [resoconti senza Auto-Vai](../../domains/reverse-engineering/reporting-without-autovai.md), unico esecutore, checkpoint protettivi e riconciliazione dei job incerti. Al momento della revisione umana mostrare il candidato reale; nessuna ripresa automatica durante l'attesa richiesta.

## Fonti e limiti della pubblicazione

- [ScanRuler v0.9.4 — Reverse engineer, How to use it](https://github.com/CNCKitchen/ScanRuler/blob/v0.9.4/plugins/reverse/README.md): Fit all chains, Fit options, spline, vincoli e costruzione.
- [Schema ufficiale v0.9.4](https://github.com/CNCKitchen/ScanRuler/blob/v0.9.4/plugins/reverse/app/reSchemas.ts), blocco `fitIn`, righe 443–485; [implementazione degli input sketch](https://github.com/CNCKitchen/ScanRuler/blob/v0.9.4/plugins/reverse/app/reSketchInput.ts). Prima dell'esecuzione usare lo schema della build reale.
- QUICKSURFACE, tutorial ufficiale **Fit primitives in 2D Sketch mode / Auto Sketcher** e **Fit 2D Sketch entities**: selezione della traccia e ricostruzione con entità adattate. È un precedente di metodo manuale, non prova che i due software abbiano identiche opzioni o prestazioni.
- Audit TMART del 31/10/2026, `RE_WORKFLOW_PROPOSTA.md` al commit `92451cfdee51ba9939fa7973bf002bdecf1f88be`: riuso di sezioni, operazioni integrate, regioni e prove mirate. Il riferimento privato rimane nella repository operativa autorizzata.

Consultazione: **2 novembre 2026**. Questa pubblicazione modifica istruzioni, non CAD o codice applicativo. Non è stato eseguito un benchmark sui pezzi: capacità disponibile, effettivo uso della chat e beneficio misurato restano tre fatti distinti.
