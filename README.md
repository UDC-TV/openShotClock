# OpenShotClock

🇬🇧 OpenShotClock is a web app to manage and customize a digital shot clock. The project, still in alpha, is designed both for training purposes and for tournament matches. Hardware not provided.

> OpenShotClock is designed to help understand the logic behind the device, to gain a deep understanding of the meaning of the numbers shown on the display, the reset values, and the impact these variables have on the game.

🇮🇹 OpenShotClock è una web app per gestire e personalizzare uno shot clock digitale. Il progetto, ancora in fase alpha, è pensato sia per scopi di allenamento che per partite di torneo. Hardware non fornito.

> OpenShotClock è pensato per comprendere il funzionamento della logica alla base dell’apparecchio, per conoscere a fondo il significato dei numeri mostrati a display, dei valori di reset e le ripercussioni che queste variabili hanno sul gioco

# Guida SUPER rapida

- Collegati a [udc-tv.github.io/OpenShotClock](https://udc-tv.github.io/OpenShotClock) oppure scarica i file e apri `index.html`
- Configura le scorciatoie da tastiera nelle impostazioni o usa quelle di default
- Scegli le impostazioni di `BLANK`, `DECIMALS` e `STOP ON RESET`
- Apri il display esterno dalla console e abilita l'audio cliccando una volta sul display
- Sei pronto per usare lo shot clock!

Configurazioni di esempio e manuale illustrato [disponibili qui](output/notes.pdf)

# Guida completa

## Indice
1. [Introduzione](#introduzione)
2. [Primo Avvio](#primo-avvio)
3. [Utilizzo Base](#utilizzo-base)
4. [Funzioni Avanzate](#funzioni-avanzate)
5. [Configurazione](#configurazione)
6. [Risoluzione Problemi](#risoluzione-problemi)
7. [Domande Frequenti](#domande-frequenti)

## Introduzione

**OpenShotClock** è uno shot clock (_cronometro dei 24 secondi_) digitale per esercitarsi nella comprensione del funzionamento dello strumento a 360º. Il sistema è composto da due componenti principali:

- **Console di Controllo** (`index.html`) - Gestione dello shot clock.
- **Display Esterno** (`display.html`) - Per la visualizzazione su scheda separata/monitor/etc.

### Caratteristiche Principali

- **Display LED digitale** con caratteri rossi su sfondo nero
- **Due tempi preimpostati** configurabili (default: 24s e 14s)
- **Scorciatoie da tastiera** personalizzabili
- **Sirena** quando il tempo scade. Possibilità di caricare file audio personalizzati
- **Stop-lamp arancione** visibile a tempo scaduto (DEMO)
- **Tempo trascorso** visualizzato in tempo reale
- **Sezioni comprimibili** per un'interfaccia pulita

## Primo Avvio

### Requisiti di Sistema

- Browser moderno (Chrome, Firefox, Safari, Edge)
- Utilizzo senza installare (online): su [udc-tv.github.io/OpenShotClock](https://udc-tv.github.io/OpenShotClock)
- Utilizzo con installazione in locale: nessun server richiesto - funziona completamente offline

### Struttura File

Assicurati di avere tutti questi file nella stessa cartella:

```
OpenShotClock/
├── index.html          # Console di controllo
├── display.html        # Display esterno
├── app.js             # Logica applicazione
├── style.css          # Stili e design
├── fonts/
│   └── DSEG7.woff2    # Font LED digitale
└── static/
    └── horn.m4a       # Suono allarme
```

### Avvio dell'Applicazione

1. **Apri la Console di Controllo**
   - Fai doppio clic su `index.html`
   - Si aprirà nel tuo browser predefinito
   - Vedrai il cronometro impostato a 24.0 secondi

2. **Apri il Display Esterno**
   - Nella console, scorri fino alla sezione "External Display"
   - Clicca sul pulsante **"Open Display in New Window"**
   - Si aprirà una nuova finestra con il display

3. **Posiziona il Display**
   - Posiziona la finestra del display nella posizione desiderata
   - **IMPORTANTE**: Clicca una volta sul display per abilitare l'audio

4. **Sei Pronto!**
   - La console e il display sono ora sincronizzati
   - Puoi iniziare a usare il cronometro

## Utilizzo Base

### Interfaccia Console

**Elementi Principali:**

1. **Timer Principale** (grande, grigio)
   - Mostra il tempo rimanente con 1 decimale (sempre)
   - Esempio: "24.0", "15.3", "0.0"

2. **Tempo Trascorso** (piccolo, in basso a destra)
   - Mostra quanto tempo è passato _dall'ultimo reset_
   - Formato: SS.D (secondi con 1 decimale)
![Elapsed Time Example](img/t-el.png)

### Operazioni Base

#### Avviare e fermare il dispositivo

**Metodo 1 - Pulsante:**
1. Clicca sul pulsante **"Start"**
2. Il cronometro inizia il conto alla rovescia
3. Il pulsante diventa **"Stop"**
4. Clicca sul pulsante **"Stop"**
2. Il cronometro si ferma
3. Il pulsante torna a **"Start"**

**Metodo 2 - Tastiera:**
1. Premi la **Barra Spaziatrice** (default, personalizzabile)
2. Il cronometro si avvia immediatamente
3. Premi di nuovo la **Barra Spaziatrice**
4. Il cronometro si ferma

#### Resettare il dispositivo

**Reset a Time-1 (24 secondi):**
- Clicca **"Reset to Time-1"**, OPPURE
- Premi il tasto **"1"** sulla tastiera (default, personalizzabile)

**Reset a Time-2 (14 secondi):**
- Clicca **"Reset to Time-2"**, OPPURE
- Premi il tasto **"2"** sulla tastiera (default, personalizzabile)
> **Nota**: È possibile configurare se il cronometro si ferma automaticamente quando avviene un reset.

#### Ripristinare il tempo precedente

Se hai fatto un reset per errore:

1. Clicca sul pulsante **"Recall Previous"**
2. Il cronometro torna al valore precedente al reset
3. Utile per correggere errori rapidamente

### Display Esterno

**Caratteristiche:**

- **Sfondo nero** per massimo contrasto
- **Numeri rossi LED** grandi e leggibili. Font familiare
- **Stop-lamp arancione** in alto quando il tempo scade
- **Sincronizzazione automatica** con la console

**Quando il Tempo Scade (0.0):**

1. **Stop-lamp arancione appare**
   - Una barra luminosa arancione appare in alto
   - Rimane visibile finché non resetti il cronometro
   - Molto visibile anche da lontano

2. **Sirena**
   - Viene riprodotto il file audio `horn.m4a` (già fornito)
   - Suona una sola volta quando si raggiunge 0.0
   - Suono personalizzabile nelle impostazioni

## Funzioni Avanzate

### Regolazione manuale del tempo

Per impostare un tempo personalizzato:

1. **Espandi "Time Adjustment"**
   - Clicca sull'intestazione **"Time Adjustment"**
   - La sezione si espande mostrando il campo di input

2. **Inserisci il Tempo**
   - Digita il tempo desiderato in secondi (formato `S / SS / SS.D`)
   - Esempi: "1", "02", "13.5"
   - Puoi usare decimali (e.g., 14.5 = 14 secondi e mezzo)

3. **Applica il Tempo**
   - Clicca sul pulsante **"Set Time"**
   - Il cronometro si aggiorna immediatamente
   - Il campo di input si svuota

4. **Chiudi la Sezione** (opzionale)
   - Clicca di nuovo su **"Time Adjustment"**
   - La sezione si comprime per risparmiare spazio

> **Importante**: Puoi regolare il tempo solo quando il cronometro è fermo

### Sezioni Comprimibili

L'interfaccia ha sezioni che puoi aprire/chiudere:

**Time Adjustment:**
- Clicca sull'intestazione per aprire/chiudere
- Contiene il campo per regolare manualmente il tempo
- **Chiusa di default** all'avvio

**Settings:**
- Clicca sull'intestazione per aprire/chiudere
- Contiene tutte le configurazioni
- **Chiusa di default** all'avvio

**Indicatori Visivi:**
- **▼** = Sezione aperta
- **▶** = Sezione chiusa

### Tempo Trascorso

Il tempo trascorso viene mostrato in basso a destra del timer principale:

**Funzionamento:**
- Inizia da 0.0 **quando resetti** il cronometro
- Aumenta mentre il cronometro è in esecuzione
- Si ferma quando fermi il cronometro
- Si azzera quando fai un reset

**Utilizzo:**
- Evita di dover calcolare mentalmente il tempo passato
- Mostra quanto tempo è effettivamente passato
- Formato: SS.D (e.g., "5.3" = 5.3 secondi trascorsi)

## Configurazione

### Accedere alle Impostazioni

1. Scorri verso il basso nella console
2. Trova la sezione **"Settings"**
3. Clicca sull'intestazione per espandere
4. Modifica le impostazioni desiderate
5. Clicca **"Save Settings"** per salvare

> **Nota**: Le impostazioni vengono salvate automaticamente nel browser e persistono tra le sessioni

### Configurare i Tempi Preimpostati

**Time-1 (Tempo principale):**
1. Trova il campo **"Time-1 (seconds)"**
2. Inserisci il valore desiderato (e.g., "24")
3. Questo è il tempo usato dal pulsante "Reset to Time-1"

**Time-2 (Tempo secondario):**
1. Trova il campo **"Time-2 (seconds)"**
2. Inserisci il valore desiderato (e.g., "14")
3. Questo è il tempo usato dal pulsante "Reset to Time-2"

**Esempi Comuni:**
- **Basket NBA**: Time-1 = 24, Time-2 = 14
- **Basket FIBA**: Time-1 = 24, Time-2 = 14
- **Allenamento**: Time-1 = 30, Time-2 = 15

### Personalizzare le Scorciatoie da Tastiera

Puoi cambiare i tasti per controllare il cronometro:

**Start/Stop Key (default: Barra Spaziatrice):**
1. Clicca sul campo **"Start/Stop Key"**
2. Premi il tasto che vuoi usare
3. Il campo mostra il nuovo tasto (vuoto se Barra Spaziatrice)

**Reset Time-1 Key (default: "1"):**
1. Clicca sul campo **"Reset Time-1 Key"**
2. Premi il tasto desiderato
3. Esempio: puoi usare "v"

**Reset Time-2 Key (default: "2"):**
1.  Clicca sul campo **"Reset Time-2 Key"**
2.  Premi il tasto desiderato
3.  Esempio: puoi usare "n"

> **Suggerimento**: Usa tasti facili da raggiungere

### Comportamento Reset

**Stop timer on reset:**
- [X] **Attivato (Default)**: Quando resetti, il cronometro si ferma automaticamente.
- [ ] **Disattivato**: Quando resetti, il cronometro continua a correre (o resta fermo se era già fermo).

**Funzione "Hold to Reset" (Tieni premuto):**
**NB**. Se "Stop timer on reset" è **disattivato**:
1. Tieni premuto il tasto di reset (e.g., "1").
2. Il tempo si resetta e rimane "congelato" finché tieni premuto.
3. Rilascia il tasto per far ripartire il conteggio immediatamente.

### Opzioni display

**Blank display when reset to Time-1:**
- [X] **Attivato**: Il display diventa nero quando il tempo è **uguale o superiore** a Time-1 (e.g., 24.0).
- [ ] **Disattivato**: Il display mostra sempre il valore numerico.

**Utilizzo:**
- Funzionamento codificato da FIBA.
- Il display si riaccende automaticamente appena il tempo scende (e.g., 23.9).
- **Indicatore Attività**: Quando il display è nero, appare un **puntino rosso** al centro per indicare che il sistema è acceso e connesso.
- Utile per nascondere il tempo durante le azioni morte, avendo però la possibilità di verificare immediatamente che il sistema è attivo.

**Show decimals on display (≤4.9s):**
- [X] **Attivato**: Mostra i decimali negli ultimi 5 secondi (4.9, 4.8, ..., 0.0).
  - NB: in caso di decimali attivi, il "valore vuoto" sarà 24 (i.e., dopo il reset a 24.0, il display mostrerà "23" dopo un decimo di secondo).
- [ ] **Disattivato**: Mostra sempre il valore arrotondato per eccesso.
  - NB: in caso di decimali NON attivi, per i valori da 0.9 a 0.1, il display mostrerà "1".

**Logica con decimali attivati:**

| Tempo | Display |
|-------|---------|
| 24.0s | 24 |
| 23.7s | 23 |
| 5.0s  | 5 |
| 4.9s  | 4.9 |
| 4.5s  | 4.5 |
| 1.2s  | 1.2 |
| 0.0s  | 0.0 |

**Logica con decimali disattivati:**

| Tempo | Display |
|-------|---------|
| 24.0s | 24 |
| 23.7s | 24 |
| 5.0s  | 5 |
| 4.9s  | 5 |
| 4.5s  | 5 |
| 1.2s  | 2 |
| 1.0s  | 1 |
| 0.1s  | 1 |
| 0.0s  | 0 |

### Personalizzare la sirena

**Cambiare il file audio:**

1. Espandi la sezione **"Settings"**
2. Scorri fino a **"Horn Sound File"**
3. Clicca su **"Scegli file"** o **"Choose File"**
4. Seleziona il tuo file audio (MP3, M4A, WAV, ecc.)
5. Il file viene caricato e convertito automaticamente
6. Clicca **"Save Settings"**

**File supportati:**
- MP3 (consigliato)
- M4A
- WAV
- OGG
- Altri formati audio standard

**Suggerimenti:**
- Usa file brevi (1-3 secondi)
- Assicurati che il volume sia adeguato
- Testa il suono


**File Predefinito:**
- Percorso: `static/horn.m4a`
- Puoi sostituire questo file direttamente (stesso nome e percorso)
- Oppure carica un file personalizzato tramite l'interfaccia

## Risoluzione Problemi

### Il Suono non funziona

**Problema**: L'allarme non suona quando il tempo scade

**Soluzioni:**

1. **Abilita l'Audio sul Display**
   - Quando apri il display, vedrai "🔊 Click to Enable Sound"
   - **Clicca una volta** ovunque sul display
   - Questo è richiesto dai browser moderni per motivi di sicurezza

2. **Controlla il Volume**
   - Verifica che il volume del sistema non sia a zero
   - Controlla che il browser non sia silenziato
   - Verifica l'uscita audio corretta (cuffie/altoparlanti)

3. **Verifica il File Audio**
   - Assicurati che `static/horn.m4a` esista
   - Prova a caricare un file audio diverso
   - Controlla che il file non sia corrotto

4. **Console del Browser**
   - Premi F12 per aprire gli strumenti sviluppatore
   - Vai alla scheda "Console"
   - Cerca messaggi di errore relativi all'audio
   - Potrebbero esserci informazioni utili

### La Barra Arancione Non Appare

**Problema**: La barra di avviso non si vede quando il tempo scade

**Soluzioni:**

1. **Verifica che il Tempo Raggiunga 0.0**
   - Controlla che il cronometro arrivi effettivamente a 0.0
   - La barra appare solo quando il tempo è $\le$ 0.0005 secondi

2. **Ricarica il Display**
   - Chiudi la finestra del display
   - Clicca di nuovo "Open Display in New Window"
   - Prova di nuovo

3. **Svuota la Cache**
   - Premi Ctrl+F5 (Windows) o Cmd+Shift+R (Mac)
   - Questo ricarica completamente la pagina
   - Risolve problemi di CSS non aggiornato

### Display e Console Non Sincronizzati

**Problema**: Il display mostra un tempo diverso dalla console

**Soluzioni:**

1. **Ricarica Entrambe le Pagine**
   - Chiudi la finestra del display
   - Ricarica la console (F5)
   - Riapri il display

2. **Verifica localStorage**
   - Assicurati che localStorage sia abilitato nel browser
   - Vai in Impostazioni $\rightarrow$ Privacy $\rightarrow$ Assicurati che i cookie siano abilitati

3. **Usa lo Stesso Browser**
   - Console e display devono essere nello stesso browser
   - Non funziona tra browser diversi (e.g., Chrome e Firefox)

4. **Controlla le Estensioni**
   - Alcune estensioni del browser possono bloccare localStorage
   - Prova in modalità incognito/privata
   - Disabilita temporaneamente le estensioni

### Le Scorciatoie da Tastiera Non Funzionano

**Problema**: Premere i tasti non controlla il cronometro

**Soluzioni:**

1. **Controlla il Focus**
   - Clicca sulla finestra della console
   - Assicurati che nessun campo di input sia selezionato
   - Le scorciatoie non funzionano quando stai scrivendo

2. **Verifica i Tasti Assegnati**
   - Apri Settings
   - Controlla quali tasti sono configurati
   - Prova a riassegnarli se necessario

3. **Tasti Riservati dal Browser**
   - Alcuni tasti sono riservati (e.g., F11, Ctrl+T)
   - Usa tasti semplici come lettere o numeri
   - Evita combinazioni con Ctrl, Alt, Cmd

### Problemi di Prestazioni

**Problema**: Il cronometro è lento o scatta

**Soluzioni:**

1. **Chiudi Schede Inutilizzate**
   - Troppo schede aperte rallentano il browser
   - Chiudi applicazioni pesanti

2. **Riduci la Dimensione della Finestra**
   - Usa la risoluzione nativa del monitor

3. **Aggiorna il Browser**
   - Assicurati di usare l'ultima versione
   - I browser vecchi possono avere problemi di prestazioni

## Domande Frequenti

### Posso usare più display contemporaneamente?

**Sì!** Puoi aprire più finestre di display:

1. Clicca "Open Display in New Window" più volte
2. Ogni finestra si sincronizza automaticamente
3. Posiziona ogni display su monitor diversi
4. Tutti mostrano lo stesso tempo

### Posso usare OpenShotClock su tablet/smartphone?

**Sì, ma con limitazioni:**

- ✅ La console funziona su tablet
- ✅ Il display funziona su smartphone/tablet
- ⚠️ Le scorciatoie da tastiera non sono disponibili su touchscreen
- ⚠️ Alcuni browser mobile limitano l'audio automatico

**Consiglio**: Usa un computer per la console e tablet/smartphone solo per display aggiuntivi.

### Le impostazioni vengono salvate?

**Sì!** Tutte le impostazioni sono salvate automaticamente:

- Tempi preimpostati (Time-1, Time-2)
- Scorciatoie da tastiera
- Opzioni display
- File audio personalizzato

**Dove vengono salvate:**
- Nel localStorage del browser
- Persistono anche dopo aver chiuso il browser
- **Sono specifiche per ogni browser** (Chrome, Firefox, ecc.)

**Per resettare tutto:**
```javascript
// Apri la Console del browser (F12) e incolla:
localStorage.clear();
location.reload();
```

### Posso personalizzare i colori?

**Sì!** Modifica il file `style.css`:

```css
:root {
  /* Cambia questi valori */
  --text-timer-console: #888888;  /* Grigio console */
  --text-timer-display: #ff0000;  /* Rosso display */
  --accent-primary: rgb(233, 162, 59);  /* Arancione */
  --accent-tertiary: rgb(51, 118, 205);  /* Blu */
}
```

### Funziona offline?

**Sì, completamente!**

- Non richiede connessione internet
- Tutti i file sono locali
- Funziona anche in aereo 😄

**Eccezione**: I font Google Fonts richiedono internet la prima volta, poi vengono memorizzati nella cache. Nel caso in cui non siano disponibili, viene usato un font di riserva.

### Posso contribuire al progetto?

**Assolutamente!** OpenShotClock è open source:

- Segnala bug o problemi
- Suggerisci nuove funzionalità
- Contribuisci con codice
- Migliora la documentazione

### Quanto è preciso il cronometro?

**Molto preciso:**

- Aggiornamento ogni 100ms (0.1 secondi)
- Decremento di 0.1 secondi per tick
- Precisione sufficiente per uso sportivo professionale

**Nota**: La precisione dipende dal browser e dal carico del sistema. 

## Consigli per l'uso

### Per un'esercitazione ottimale

**Checklist**

- [ ] Verifica che tutti i file siano presenti
- [ ] Testa la sirena
- [ ] Configura i tempi corretti (24s, 14s, ecc.)
- [ ] Posiziona il display affinché sia visibile
- [ ] Abilita l'audio sul display (clicca una volta)
- [ ] Testa le scorciatoie da tastiera
- [ ] Verifica la sincronizzazione console-display
- [ ] Prepara un cronometro di backup (sempre!)

### Segnalare Problemi

Se trovi un bug o hai suggerimenti:

1. Annota esattamente cosa è successo
2. Includi screenshot se possibile
3. Specifica browser e sistema operativo
4. Descrivi i passaggi per riprodurre il problema

## Glossario

**Console**: La pagina di controllo (`index.html`) usata dall'operatore

**Display**: La pagina di visualizzazione (`display.html`)

**Time-1**: Il tempo preimpostato principale (default 24 secondi)

**Time-2**: Il tempo preimpostato secondario (default 14 secondi)

**Recall Previous**: Funzione per ripristinare il tempo prima dell'ultimo reset

**Elapsed Time**: Tempo trascorso dall'ultimo reset

**Horn Sound**: Suono allarme riprodotto quando il tempo scade

**Yellow stop-lamp**: Barra arancione che appare in alto sul display a tempo scaduto

**localStorage**: Memoria del browser dove vengono salvate le impostazioni

**Collapsed**: Sezione compressa/chiusa dell'interfaccia

## Appendice: Scorciatoie Rapide

### Tastiera (Default)

| Azione | Tasto |
|--------|-------|
| Start/Stop | Barra Spaziatrice |
| Reset Time-1 | 1 |
| Reset Time-2 | 2 |

### Operazioni Console

| Azione | Metodo |
|--------|--------|
| Espandi/Comprimi Sezione | Clicca intestazione |
| Regola Tempo | Time Adjustment $\rightarrow$ Inserisci $\rightarrow$ Set Time |
| Salva Impostazioni | Settings $\rightarrow$ Save Settings |
| Apri Display | External Display $\rightarrow$ Open Display |

### Operazioni Display

| Azione | Metodo |
|--------|--------|
| Abilita Audio | Clicca una volta ovunque |
| Schermo Intero | F11/fn+F |
| Esci Schermo Intero | ESC/F11/fn+F |

**Versione Guida**: 0.1 
**Data**: 24 Dicembre 2025  
**Compatibile con**: OpenShotClock v0.1
