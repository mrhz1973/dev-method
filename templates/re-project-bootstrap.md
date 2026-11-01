# Bootstrap — nuovo progetto di reverse engineering

Questo è un template di avvio, non uno stato già verificato. Il coordinatore ricava dal mandato i dati disponibili; chiede solo quelli indispensabili non risolvibili. Non ricopiare parametri di Airbox/STL2.

## Manifest minimo del progetto

```yaml
schema: TMART_RE_PROJECT_V1
project_id: <identificatore univoco>
domain: reverse-engineering
engine: <scanruler oppure fusion>
operational_repository: <repository realmente verificata>
branch: <branch assegnato>
project_directory: projects/<project_id>/
method_repository: mrhz1973/dev-method
method_ref: <commit o tag realmente letto>
domain_method: domains/reverse-engineering/README.md
engine_method: adapters/<engine>/README.md
live_owner: <unico esecutore; identità privata nel perimetro corretto>
source_revision: <scansione/documento, hash e provenienza verificabili>
frame_units: <frame e unità>
requirements_ref: <requisiti correnti del pezzo>
acceptance_ref: <criteri contestuali>
last_checkpoint_ref: <checkpoint verificato oppure NONE>
status: NOT_STARTED
```

Nessun segnaposto vale come verifica. Se la repository ScanRuler destinata non è ancora disponibile, dichiarare `BLOCKED_REPOSITORY_SETUP` per bootstrap/scritture Git: non inventarla e non aprire il workflow Fusion. Analisi offline autorizzate possono continuare.

## Primo blocco dell'AI

Leggere `METHODS.md`, solo il dominio e l'adattatore selezionati, poi handoff e repository del progetto; confermare identità del motore e del writer; applicare il preflight specifico; definire output e criteri dal pezzo; assegnare incarichi indipendenti; avviare lavoro reversibile con checkpoint. Non creare un nuovo server, tool o bot per il solo fatto che il template ne menziona uno.

Mantenere nel progetto gli equivalenti di `METHOD.md`, `STATE.md`, `REQUIREMENTS.md` e `LESSONS.md`, senza duplicare una struttura già adatta. I documenti contengono riferimenti al metodo, non copie divergenti delle sue regole. Tolleranze, spessori, geometrie nominali e note sono per progetto.

## Fine handoff

Registrare repo, branch/head, engine, revisione metodo, source/checkpoint, prove aperte e prossimo passo. Una nuova chat deve poter identificare il percorso giusto senza consultare cronologie di altri pezzi. Nessuna nuova chat scrive nella sessione prima del rilascio dell'owner precedente.
