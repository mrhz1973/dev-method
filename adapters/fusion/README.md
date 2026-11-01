# Adattatore tattico — Autodesk Fusion

**Engine esclusivo:** `fusion`. Leggere prima [il dominio comune RE](../../domains/reverse-engineering/README.md), poi le istruzioni Fusion del progetto.

Repository operativa: `mrhz1973/TMART-Fusion-RE`. Scheda del motore osservata nel branch `task/RE-ENGINE-SPLIT-20261031`, snapshot `6b83eb8b09844a86c77d85948c6ba858c15468d9`, percorso `docs/fusion/README.md`. Leggere lo stato corrente del proprio handoff prima di usare un checkpoint storico.

Verificare host, documento attivo, revisione, componente/corpo selezionato, frame/unità e unico owner live. Applicare gli schemi e i limiti del MCP Fusion realmente disponibile e le skill Fusion pertinenti. Le capacità di altri programmi o plugin non diventano capacità Fusion solo perché menzionate nell'audit.

Usare rappresentazioni, feature, superfici, solidi, timeline, salvataggio nativo e riapertura previsti dal workflow Fusion autorizzato; conservare la scansione originale e i checkpoint recuperabili. Rilevare versione runtime e compatibilità secondo il metodo Fusion, senza imporre automaticamente la regola delle release GitHub ScanRuler.

Non utilizzare comandi `reverse_*`, pairing, porte, holder/relay, job o formati nativi ScanRuler come istruzioni Fusion. Il nativo è quello Fusion del progetto (normalmente `.f3d`), non `.scanruler`. Nessuna installazione, migrazione di motore o cambio di file per nascondere un'operazione fallita.

I subagenti possono analizzare copie congelate; l'unico owner esegue le operazioni live e applica i gate Fusion. Il metodo generale è condiviso; la tattica e lo stato della sessione no.

Nuovi lavori: `engine=fusion`, progetto e directory propri, riferimento al metodo fissato e criteri derivati dal contesto tramite [bootstrap](../../templates/re-project-bootstrap.md). Le vecchie aree ScanRuler della repository sono contenuti in transizione, non autorizzano a usare entrambi i motori nello stesso goal.
