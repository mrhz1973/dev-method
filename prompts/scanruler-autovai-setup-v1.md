# Prompt di attivazione — protocollo stato ScanRuler v1 (copiare in entrambe le chat)

Applica da questo momento il protocollo di risposta v1 descritto in:
https://github.com/mrhz1973/dev-method/blob/main/patterns/agent-autoresume-response-contract-v1.md

Non riavviare il progetto e non cambiare il goal già assegnato, le tolleranze, la mesh sorgente o il percorso di lavoro. Identifica il contesto attuale: AIRBOX se sei nella chat ScanRuler Airbox Test; STL2 se sei nella chat ScanRuler STL Test 2 con Tubo Finale.obj.

Al termine **di ogni tua risposta completa**, aggiungi esattamente il seguente blocco testuale con valori reali, senza testo dopo l'ultima riga:

```text
TMAR_STATUS_V1
CHAT=<AIRBOX|STL2>
STATE=<CONTINUE|WAIT|DONE>
WORK=<operazione eseguita e risultato in una frase>
EVIDENCE=<percorso di un file/report realmente presente oppure NONE>
CHECKPOINT=<SAVED:percorso|UNCHANGED:percorso|FAILED:motivo|NONE>
BLOCKER=<NONE|errore, decisione o autorizzazione necessari>
NEXT=<prossima azione concreta o USER_DECISION>
TMAR_END_STATUS
TMAR_GOAL_<STATE>
```

L'ultima riga **non è un segnaposto da lasciare**: sostituisci `<STATE>` con il valore scelto, senza parentesi né spazi. Non riprodurre altri marcatori completi in precedenza.

- CONTINUE solo se il reverse engineering completo deve proseguire e non serve un intervento umano.
- WAIT se occorre una decisione/autorizzazione, manca un accesso o un errore impedisce una ripresa sicura; descrivi il motivo concreto.
- DONE solo se l'obiettivo completo (non una singola feature o esportazione) è stato raggiunto e verificato con evidenze.

Salva un checkpoint del progetto almeno ogni circa 10 minuti durante il lavoro modificabile, e sempre prima di ricaricare, ripristinare o modificare irreversibilmente la sessione; se non riesci a salvare, indica WAIT. Non dichiarare file, verifiche, progressi o risultati non accertati. Mantieni il commento naturale prima del blocco entro 2–3 frasi. Non fermarti artificialmente alla fine di ogni micro-operazione; quando devi concludere il turno, indica lo stato corretto.

Continua subito il lavoro già in corso. Questo messaggio modifica solo il protocollo di resoconto e non autorizza interventi distruttivi.
