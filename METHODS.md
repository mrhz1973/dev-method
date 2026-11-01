# Catalogo dei metodi — ingresso unico per gli agenti

Decisione organizzativa del proprietario: 1 novembre 2026. Questa pagina chiarisce il routing; non promuove automaticamente i pilot a release stabile e non certifica migrazioni non eseguite.

## Quattro livelli, responsabilità diverse

| Livello | Sede | Contenuto |
|---|---|---|
| Generale, riutilizzabile fra progetti | `core/`, `patterns/`, `templates/` | Autonomia, prove, checkpoint, delega, sicurezza Git, apprendimento e decisioni contestuali. Nessun default CAD universale. |
| Dominio reverse engineering | [domains/reverse-engineering/README.md](domains/reverse-engineering/README.md) | Dal dato al modello, intenzione progettuale, regioni e interfacce, criteri di accettazione. Indipendente dal motore. |
| Tattica del motore | [ScanRuler](adapters/scanruler/README.md) oppure [Autodesk Fusion](adapters/fusion/README.md) | Solo MCP, comandi, formato nativo, versioni e vincoli dell'ambiente scelto. |
| Singolo lavoro | Repository operativa e directory del progetto/pezzo | Fonti, quote, tolleranze, stato, regioni, checkpoint, risultati, lezioni ed ownership correnti. Non appartengono al metodo globale. |

`dev-method` non contiene automaticamente tutti i metodi e tutti gli stati delle repository. È una biblioteca selettiva: regole generali, domini e adattatori chiaramente separati. Gli esempi e i vecchi rapporti non assegnano un nuovo goal.

## Selezione obbligatoria

1. Ricava dal mandato `domain`, `engine`, `project_id` e repository operativa; non dedurre il motore dal nome storico di una cartella.
2. Leggi il metodo generale pertinente, poi il dominio, poi **un solo adattatore**.
3. Leggi il manifest e l'handoff del pezzo. Registra ref/commit del metodo, branch operativo e owner live. Non usare solo `main` quando il lavoro corrente è su un branch dichiarato.
4. Se motore, sorgente, repository o revisione non coincidono, riconcilia prima delle modifiche. Un MCP collegato non è una prova sufficiente.
5. Un nuovo pezzo eredita il metodo, non i valori di Airbox/STL2, i loro ID, le loro porte, i loro criteri numerici o lo stato DONE.

Vedi [registro macchina](method-registry.json) e [bootstrap nuovo progetto](templates/re-project-bootstrap.md).

## Separazione delle repository operative

- **Autodesk Fusion:** repository dedicata `mrhz1973/TMART-Fusion-RE`; conserva storia e workflow Fusion.
- **ScanRuler:** destinazione proposta `mrhz1973/TMART-ScanRuler-RE`, da creare/verificare come repository **privata**, poi attivare con migrazione verificata. Al controllo di questa pubblicazione la destinazione non è stata creata o verificata: **non dichiararla disponibile**.
- I lavori ScanRuler già presenti nella vecchia repository restano al proprio branch durante la transizione. Non cambiare remote, spostare CAD, cancellare file o chiudere PR finché non sono riconciliati writer e copia di destinazione.

La separazione **logica dei metodi è disponibile qui**; la separazione fisica delle repository non è dichiarata completata. Nessun fallback silenzioso agli strumenti Fusion se manca la destinazione ScanRuler.

## Precedenza e adozione

Requisiti/permessi attuali del proprietario → contratto del progetto → metodo adottato e fissato a una revisione → adattatore dell'engine. Le release stabili già fissate restano immutate. Per le due chat correnti è richiesta lettura esplicita del nuovo routing; una pubblicazione non dimostra che un altro agente l'abbia letta.
