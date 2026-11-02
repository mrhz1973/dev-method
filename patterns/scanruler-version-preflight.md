# ScanRuler — controllo versione e aggiornamento prima del lavoro

**Direttiva del proprietario, 1 novembre 2026.** Ogni AI che avvia o riprende un lavoro ScanRuler deve verificare su GitHub l'ultima versione ufficiale, confrontarla con quella realmente in uso e, se necessario, aggiornare prima di iniziare nuove modifiche CAD. Non basta ricordare una versione letta in un'altra chat.

Questa regola riguarda tutti i progetti ScanRuler che la adottano, inclusi AIRBOX e STL2. Si applica anche con subagenti: la responsabilità è del coordinatore/unico esecutore live. L'aggiornamento ordinario, recuperabile e circoscritto alla propria istanza è autorizzato senza conferme ripetitive; non sono autorizzati perdita di dati, sovrascritture di modifiche locali, interruzioni del lavoro altrui o aggiramenti dei permessi.

## Quando eseguire il controllo

- All'avvio di una nuova sessione o chat, dopo handoff e a ogni ripresa del lavoro operativo.
- Dopo un riavvio, un cambio di istanza/backend o un avviso di incompatibilità delle versioni.
- Una volta per avvio/ripresa, condividendo il risultato con i subagenti. Non ripetere ricerche, installazioni o riavvii a ogni comando o alla creazione di ciascun delegato. Durante un blocco attivo non aggiornare a sorpresa: raggiungere un confine sicuro e ripetere il controllo prima della ripresa.

## 1. Fonte e confronto effettivo

Consultare le release della repository ufficiale **CNCKitchen/ScanRuler** e le relative note: https://github.com/CNCKitchen/ScanRuler/releases . Per impostazione predefinita, «ultima versione» significa **ultima release pubblica stabile**, non un branch main in sviluppo, una pull request o una prerelease. Se il proprietario richiede espressamente un diverso canale, registrarlo e seguirlo. Non fissare nel metodo un numero di versione che diventerà obsoleto.

Rilevare separatamente:
1. versione/build dell'app o del motore che sta realmente elaborando il progetto;
2. versione del connettore ScanRuler MCP realmente attivo;
3. release di destinazione, tag/commit verificabile e data/ora del controllo.

App e MCP hanno verifiche di versione distinte: non presumere che debbano avere lo stesso numero. La fonte per la versione dell'app è GitHub; per il connettore usare il canale ufficiale documentato dalla stessa repository e verificare la compatibilità con l'app. Se il client usa un relay, controllare anche il server holder che possiede la connessione: aggiornare un pacchetto inattivo non aggiorna necessariamente la sessione. La presenza di `@latest`, un'installazione riuscita o l'HEAD di un clone non provano la versione runtime.

Confrontare l'identità della build oltre al solo numero quando necessario. Una build locale/fork con modifiche non è automaticamente equivalente alla release ufficiale, né va cancellata o declassata alla cieca.

## 2. Proteggere il progetto prima di aggiornare

Se l'istanza è già aggiornata e compatibile, registrare l'esito e proseguire: nessuna reinstallazione inutile.

Se serve aggiornare, prima di qualsiasi reload, stop del server, ricompilazione o migrazione:
- identificare progetto/sessione, owner, endpoint/backend e altre sessioni eventualmente dipendenti dallo stesso processo;
- attendere e riconciliare gli eventuali job mutativi pendenti, senza rilanciare operazioni di esito incerto;
- salvare un nuovo checkpoint nativo con nome distinto e verificare file, contenuto atteso e integrità appropriata; conservare l'ultima copia valida e il riferimento alla build precedente;
- preservare scansione originale, allineamento, feature, note e configurazioni locali; predisporre una possibilità di rollback;
- impedire modifiche concorrenti alla sessione durante l'aggiornamento. I subagenti possono continuare analisi offline indipendenti su snapshot congelati.

Se non è possibile ottenere un checkpoint affidabile o il riavvio interromperebbe l'altro progetto, non forzare: sospendere solo l'azione dipendente e dichiarare il blocco. Questa verifica non autorizza a fermare altre chat o riavviare indiscriminatamente tutti i processi Codex/browser.

## 3. Aggiornare la componente corretta

**App ospitata nel browser:** dopo il backup, usare il percorso di aggiornamento supportato dal servizio e verificare la build della pagina effettivamente caricata. Non svuotare storage, non cancellare cache globali e non ricaricare ripetutamente per tentativi. Se il deployment ospitato non espone ancora la release GitHub, dichiarare la discrepanza; non fingere di averlo aggiornato e non avviare una migrazione non autorizzata.

**Clone locale, app self-hosted o motore headless:** leggere le istruzioni della release, verificare stato del repository e modifiche locali, usare il tag/commit ufficiale e ricostruire i componenti pertinenti secondo la documentazione. Preservare fork e personalizzazioni; niente reset distruttivi, cancellazioni o sostituzioni silenziose. La versione avviata deve essere quella appena verificata, non un vecchio dist rimasto in memoria.

**Connettore MCP:** aggiornare il pacchetto/clone ufficiale e riavviare solo l'istanza interessata quando sicuro, secondo la configurazione realmente adottata. Controllare holder/relay e compatibilità, senza pubblicare token né cambiare automaticamente porte, permessi o impostazioni globali condivise.

## 4. Verifica dopo l'aggiornamento e via libera

Rileggere versione runtime dell'app/motore e MCP, verificare connessione e strumenti esposti, riaprire o riconciliare la copia del progetto salvata e controllare scansione, frame, feature/note attese e almeno un controllo non distruttivo pertinente. Aggiornare gli schemi dei comandi utilizzati; risultati e QA della build precedente non certificano automaticamente una geometria rigenerata dal nuovo kernel.

**Solo dopo esito positivo iniziare nuove operazioni di reverse engineering.** Un errore di aggiornamento/riapertura richiede recupero della copia valida e segnalazione esplicita; non continuare in silenzio su una versione vecchia o su un progetto svuotato. GitHub irraggiungibile, versione ignota, incompatibilità, deployment in ritardo o personalizzazioni non riconciliabili producono `WAIT_VERSION` / `NON_VERIFICATO` per le operazioni live interessate. Le analisi offline sicure possono proseguire. Un'eccezione al requisito dell'ultima versione richiede una decisione esplicita del proprietario.

## 5. Registrazione breve e riuso

Usare il report/checkpoint operativo già esistente, senza nuovi servizi o controlli periodici:

```text
SCANRULER_PREFLIGHT
CHECKED_AT_UTC=<istante reale>
UPSTREAM_RELEASE=<tag e riferimento ufficiale>
APP_BEFORE=<runtime rilevato>
APP_AFTER=<runtime verificato>
MCP_ACTIVE=<versione e holder/relay se pertinenti>
CHECKPOINT=<riferimento della copia protetta oppure NOT_NEEDED:nessuna modifica runtime>
RESULT=UP_TO_DATE | UPDATED_VERIFIED | WAIT_VERSION
EVIDENCE=<versioni, prova di preservazione e controllo realmente eseguiti>
```

I valori sono uno schema, non un test già eseguito. I subagenti ricevono questo risultato e non lanciano aggiornamenti autonomi. I percorsi privati e i dati di connessione restano nel perimetro autorizzato del progetto, non nel metodo pubblico.

## Adozione e precedenza

Collegare questa regola dagli ingressi degli agenti e dai prompt ScanRuler. Nei due goal Codex, la direttiva del proprietario si adotta esplicitamente anche se il resto della metodologia resta in PR. Aggiornare il riferimento del metodo nel repository operativo. Una pubblicazione su GitHub non prova che una chat già in corso l'abbia letta: al primo refresh devono essere registrati revisione letta e adozione.

La regola precisa le indicazioni generiche precedenti sulla versione e non autorizza Auto-Vai, scheduler, installazioni estranee o modifiche ai criteri geometrici. Non vengono modificati automaticamente i tag stabili di dev-method né i vecchi prompt che puntano a commit immutabili.

## Riferimenti

Verificati il **1 novembre 2026**: [release ufficiali ScanRuler](https://github.com/CNCKitchen/ScanRuler/releases) e [README del connettore MCP, sezioni Staying current e Several agents](https://github.com/CNCKitchen/ScanRuler/blob/main/mcp/README.md), blob osservato `66b8999f593801e2a685a393ff4c2cbc7551a7b3`. Consultare nuovamente le fonti al momento di applicare la regola; questo documento non certifica la versione installata sul computer.
