# RE-METHOD-ROUTING — separazione organizzativa

Mandato del proprietario, 1 novembre 2026: separare repository e tattiche Fusion/ScanRuler, mantenendo il metodo generale comune e un ingresso inequivocabile per nuovi lavori.

Implementazione documentale: catalogo METHODS.md, registro JSON, dominio comune RE, adattatori separati e bootstrap senza quote ereditate. Non viene effettuato il merge della PR #4 né dichiarato validato il pilot multiagente. Tag stabili e vecchi snapshot rimangono immutati.

Separazione operativa proposta: TMART-Fusion-RE riservata a Fusion; nuova TMART-ScanRuler-RE privata per ScanRuler. Stato: creazione/verifica della destinazione e migrazione NON ESEGUITE. Il connettore GitHub disponibile permette le modifiche ai file ma non espone la creazione repository; il tunnel al computer ha risposto Session terminated e i dispositivi Remote Desktop Commander risultano offline.

Non rinominare il contenitore in un nome che cumuli i due motori. Non alterare visibilità, branch attivi, remoti locali o checkpoint. Il passaggio deve preservare storia, riferimenti e aggiornamenti dei writer correnti e terminare con readback remoto e handoff esplicito.

Il registro dichiara il blocco invece di presentare una repository inesistente come attiva. Finché il passaggio non è completato, i lavori esistenti usano i propri branch verificati; i nuovi lavori seguono il metodo corretto e segnalano il setup mancante.

Controlli da completare prima della chiusura fisica: repository destinazione privata accessibile; import selettivo e provenienza per file; confronto hash; fonti locali preservate; delta finali dei writer riconciliati; un solo owner per componente; stato ACTIVE pubblicato; vecchi ingressi trasformati in rimandi storici. Nessun CAD, server o scheduler è stato modificato dalla pubblicazione del catalogo.
