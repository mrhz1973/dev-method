# Adattatore tattico — Autodesk Fusion

**Engine esclusivo:** `fusion`. Leggere prima [il dominio comune RE](../../domains/reverse-engineering/README.md), poi le istruzioni Fusion del progetto.

## Gate prevalente — 2 novembre 2026

Applicare [affettamento obbligatorio e approvazione dei cambi di metodo](../../domains/reverse-engineering/section-first-method-change-gate.md). Per pezzi non semplici, sezioni significative e profili regolarizzati precedono la costruzione concordata. Preservare il metodo e la migliore versione riconosciuta dal proprietario; **qualunque cambio richiede consenso esplicito preventivo**, anche se sperimentato su una copia. Se affettamento o metodo concordato non riescono, fermare l'avanzamento CAD dell'intera lavorazione e spiegare la causa; non proseguire su altre regioni. Sono consentiti soltanto diagnosi minima in lettura, riconciliazione sicura e salvataggio protettivo. Rifiuto di invio e timeout non provano un fallimento geometrico. Questo gate prevale sulle istruzioni storiche di cambio autonomo della strategia e sui subagenti.

Repository operativa: `mrhz1973/TMART-Fusion-RE`. Scheda del motore osservata nel branch `task/RE-ENGINE-SPLIT-20261031`, snapshot `6b83eb8b09844a86c77d85948c6ba858c15468d9`, percorso `docs/fusion/README.md`. Leggere lo stato corrente del proprio handoff prima di usare un checkpoint storico.

Verificare host, documento attivo, revisione, componente/corpo selezionato, frame/unità e unico owner live. Applicare gli schemi e i limiti del MCP Fusion realmente disponibile e le skill Fusion pertinenti. Le capacità di altri programmi o plugin non diventano capacità Fusion solo perché menzionate nell'audit.

Usare rappresentazioni, feature, superfici, solidi, timeline, salvataggio nativo e riapertura previsti dal workflow Fusion autorizzato; conservare la scansione originale e i checkpoint recuperabili. Rilevare versione runtime e compatibilità secondo il metodo Fusion, senza imporre automaticamente la regola delle release GitHub ScanRuler.

Non utilizzare comandi `reverse_*`, pairing, porte, holder/relay, job o formati nativi ScanRuler come istruzioni Fusion. Il nativo è quello Fusion del progetto (normalmente `.f3d`), non `.scanruler`. Nessuna installazione, migrazione di motore o cambio di file per nascondere un'operazione fallita.

I subagenti possono analizzare copie congelate entro l'incarico e gli eventuali stop; l'unico owner esegue le operazioni live e applica i gate Fusion. Il metodo generale è condiviso; la tattica e lo stato della sessione no.

Nuovi lavori: `engine=fusion`, progetto e directory propri, riferimento al metodo fissato e criteri derivati dal contesto tramite [bootstrap](../../templates/re-project-bootstrap.md). Le vecchie aree ScanRuler della repository sono contenuti in transizione, non autorizzano a usare entrambi i motori nello stesso goal.
