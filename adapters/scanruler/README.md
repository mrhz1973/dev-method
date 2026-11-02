# Adattatore tattico — ScanRuler

**Engine esclusivo:** `scanruler`. Ingresso per qualsiasi nuovo progetto RE ScanRuler; AIRBOX e STL2 sono istanze, non il metodo. Leggere prima [il dominio comune](../../domains/reverse-engineering/README.md).

## Ordine operativo

1. Leggere il manifest e l'handoff del progetto, confermare scansione/revisione/frame e unico owner della sessione effettiva.
2. Applicare il [preflight versioni](https://github.com/mrhz1973/dev-method/blob/8b396f263de989f938a6aa1082534634571cab4d/patterns/scanruler-version-preflight.md): ultima release ufficiale GitHub, app/motore in esecuzione e connettore MCP distinti; checkpoint verificato prima di aggiornare e controllo del progetto dopo. Non aggiornare processi condivisi alla cieca.
3. Leggere gli schemi esposti dalla build collegata; usare solo comandi ScanRuler. Gestire job in coda e batch parziali riconciliando gli effetti prima del retry. Un nuovo client non dimostra isolamento dal vecchio holder.
4. Per contorni e sezioni applicare [fitting nativo e sketch regolari](native-section-sketch-workflow.md): usare prima linee, archi, spline a pochi punti, vincoli e riuso dei profili dell'applicazione. Non ricopiare il rumore punto per punto né reimplementare il fitter in script senza un limite nativo concreto. Appena il profilo è idoneo, costruire e verificare il blocco; non inseguire residui infinitesimali estranei alla funzione.
5. Applicare il [workflow subagenti ScanRuler](https://github.com/mrhz1973/dev-method/blob/8b396f263de989f938a6aa1082534634571cab4d/patterns/scanruler-subagent-orchestration.md): un solo esecutore live, delegati su snapshot revisionati, percorsi e branch distinti, QA separato. Pilot da valutare, non velocità garantita. Per un contorno semplice evitare più indagini parallele senza una decisione da sbloccare.
6. Salvare il nativo `.scanruler`, esportare e rileggere secondo il contratto del pezzo. Non scambiare tessellazione, fedeltà allo scan e validità B-Rep.

Restano prevalenti [note del proprietario e revisione visiva](../../domains/reverse-engineering/notes-first-visual-review.md) e [resoconti brevi senza Auto-Vai](../../domains/reverse-engineering/reporting-without-autovai.md), anche rispetto a prompt storici fissati a revisioni precedenti. Registrare l'adozione nel prossimo aggiornamento utile, non creare un audit aggiuntivo.

## Esclusioni

Non caricare automaticamente skill Fusion, usare Fusion MCP, chiamare comandi Fusion, convertire il nativo in `.f3d` o adottare limiti di finestra Fusion. Non riattivare Auto-Vai o imporre File Bridge come prerequisito al lavoro Codex. Se l'engine cambia, serve un handoff esplicito.

## Repository e progetti

Destinazione operativa separata: `mrhz1973/TMART-ScanRuler-RE` (**creazione/verifica e migrazione ancora da completare**). Il registro non autorizza a fingere che esista. Durante la transizione le chat in corso conservano repository/branch verificati nell'handoff, dichiarando `engine=scanruler` anche se il contenitore storico si chiama Fusion. Nessun nuovo progetto deve riutilizzare per errore il branch del tubo o i parametri dell'Airbox.

Nella destinazione, tenere metodo tramite riferimenti a dev-method e stato del singolo lavoro in `projects/<project_id>/`; componenti di uno stesso dispositivo possono condividere progetto e fonti, ma hanno directory e ownership separate. Usare [bootstrap](../../templates/re-project-bootstrap.md). I numeri 2/3 mm, 0,5/0,8 mm, 12 regioni e 44 note non sono default del motore.

I vecchi percorsi `patterns/scanruler-*.md` nelle revisioni fissate restano fonti di compatibilità; questo adattatore è il punto di selezione canonico, non un secondo metodo concorrente. Una revisione della procedura tattica deve aggiornare qui il riferimento senza modificare retroattivamente gli snapshot.
