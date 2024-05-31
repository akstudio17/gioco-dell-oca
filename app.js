function toggleZoomScreen() {
  document.body.style.zoom = "85%";
}
toggleZoomScreen()
alert("benvenuti al gioco dell'oca! il gioco è ideato per 3 giocatori,tenetevi pronti, il mare è in tempesta")
// Inizializzazione degli elementi della mappa e delle pedine
let map = document.getElementById("map");

let vettore = document.querySelectorAll('.cell');

let pedina1 = document.createElement("img");

pedina1.src = "pedina1.jpg";
pedina1.classList.add("pedina");
let pedina2 = document.createElement("img");
pedina2.src = "pedina2.jpg";
pedina2.classList.add("pedina");
let pedina3 = document.createElement("img");
pedina3.src = "pedina3.jpg";
pedina3.classList.add("pedina");


// Definizione delle posizioni trappola e bonus
let vettoreTrappola = [8, 68, 45, 38, 12];
let vettoreGood = [3, 60, 2, 37, 15];


let giocata = 0; // Contatore del turno
let utente1 = 0;
let utente2 = 0;
let utente3 = 0;

// Assegna l'evento click alla mappa per iniziare il gioco
map.addEventListener("click", start);

// Definizione delle posizioni totali sulla mappa
let vettoreTot = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 21, 24, 32, 37, 44, 48, 57, 59, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 58, 49, 45, 38, 33, 25, 22, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 31, 36, 43, 47, 56, 55, 54, 53, 52, 51, 50, 46, 39, 34, 26, 27, 28, 29, 30, 35, 42, 41, 40
];

// Definizione dei giocatori con le loro pedine, posizione iniziale e stato trappola
const players = [
  { element: pedina1, pos: 0, forward: true }, // Aggiungi direzione di movimento
  { element: pedina2, pos: 0, forward: true },
  { element: pedina3, pos: 0, forward: true }
];

// Funzione che gestisce l'inizio del turno
function start() {
  // Tira i dadi per il movimento
  let lanciadadi1 = Math.round(Math.random() * 5 + 1);
  let lanciadadi2 = Math.round(Math.random() * 5 + 1);
  let somma = lanciadadi1 + lanciadadi2;

  alert("Dado 1: " + lanciadadi1 + "\nDado 2: " + lanciadadi2);
  giocata++;
  // Gestisci il turno del giocatore in base al contatore giocata
  switch (giocata) {
    case 1:
      utente1 += somma;
      alert("Tocca al giocatore 1,buona fortuna!");
      movimento(0, somma);
      break;
    case 2:
      utente2 += somma;
      alert("Tocca al giocatore 2,buona fortuna!");
      movimento(1, somma);
      break;
    case 3:
      utente3 += somma;
      alert("Tocca al giocatore 3,buona fortuna!");
      movimento(2, somma);
      giocata = 0; // Reset to player 1
      break;
  }
}


let img = document.createElement("img");
img.src = "tratteggio.png";
img.style.transform = "rotate(90deg)";
// Creazione dell'elemento img
let angoloA = document.createElement("img");
let bassoDx = document.createElement("img");
let bassoSx = document.createElement("img");
let altoSx = document.createElement("img");

// Assegnazione dell'immagine come sfondo
angoloA.src = "altoDx.png";
bassoDx.src = "bassoDx.png";
bassoSx.src = "bassoSx.png";
altoSx.src = "altoSx.png";

function creaBoard() {
  for (let i = 0; i < vettore.length; i++) {
    if ( i === 10 || i === 20 || i === 30 || i === 70 || i === 60 || i === 50 || i === 12 || i === 56 || i === 26 || i=== 42 || i === 40) {
      if( i === 10 ||i===20 || i===30){
        vettore[i].style.backgroundImage = `url('${angoloA.src}')`;
      }
    } else {
      vettore[i].style.backgroundImage = `url('${img.src}')`;
    }
    if ( i ===  22 || i ===  24 || i ===  32 ||i ===  39||i ===  46 ||i ===  43 || i === 47 || i === 23  ||i ===  31|| i === 36  || i ===  35 ||  i === 25 || i ===  34|| i === 33 || i ===  38 || i ===  45 || i ===  49 || i ===  58||  i ===  37 || i === 44 || i ===  48 || i ===  57 || i ===  59  || i === 21 || i === 11) {
      vettore[i].style.transform = "rotate(90deg)";
    }
    if (i===70||i===56||i===42){
      vettore[i].style.backgroundImage= `url('${bassoDx.src}')`;
    }
    if (i===60||i===50){
      vettore[i].style.backgroundImage= `url('${bassoSx.src}')`;
    }
    if (i===12||i===26){
      vettore[i].style.backgroundImage= `url('${altoSx.src}')`;
    }
  }
}

// Funzione che gestisce il movimento delle pedine
function movimento(playerIndex, steps) {
  let player = players[playerIndex];
  let direction = player.forward ? 1 : -1;

  function moveStep(currentIndex, stepsRemaining) {
    if (stepsRemaining > 0) {
      let nextIndex;
      if (direction === 1) {
        if (currentIndex + 1 < vettoreTot.length) {
          nextIndex = currentIndex + 1;
        } else {
          direction = -1; // Cambia direzione se raggiunge la fine
          nextIndex = currentIndex - 1;
        }
      } else {
        if (currentIndex - 1 >= 0) {
          nextIndex = currentIndex - 1;
        } else {
          direction = 1; // Cambia direzione se raggiunge l'inizio
          nextIndex = currentIndex + 1;
        }
      }
      setTimeout(function() {
        vettore[vettoreTot[nextIndex]].appendChild(player.element);
        moveStep(nextIndex, stepsRemaining - 1);
      }, 500); // Ridotto il delay per movimento più veloce
    } else {
      player.pos = currentIndex;
      player.forward = direction === 1; // Aggiorna la direzione corrente del giocatore
      checkTrappola(player); // Verifica se il giocatore è finito su una trappola
      casellaFortunata(player); //verifica se il giocatore è finito su una trappola
    }
  }

  moveStep(player.pos, steps);
  checkVittoria();
}

// Funzione per controllare se il giocatore è finito in una trappola
function checkTrappola(player) {
  if (vettoreTrappola.includes(vettoreTot[player.pos])) {
    alert("Che vento! Sei stato trasportato indietro di tre caselle");
    player.forward = false; // Imposta la direzione a indietro
    movimento(players.indexOf(player), 3); // Movimento indietro di 3 passi
  } else {
    player.inTrappola = false; // Resetta il flag trappola se non è in trappola
  }
  player.forward=true;
}

// Inizializza la board all'inizio del gioco
creaBoard();
// Funzione per gestire i bonus o premi per i giocatori
function casellaFortunata(player) {
  if (vettoreGood.includes(vettoreTot[player.pos])) {
    alert("Il vento è dalla tua parte! Avanzi di 2 passi.");
    movimento(players.indexOf(player), 2); // Movimento avanti di 2 passi
  }
}

// Funzione per verificare se uno dei giocatori ha vinto
function checkVittoria() {
  if (utente1 === 70 || utente2 === 70 || utente3 === 70) {
    let vincitore;
    if (utente1 === 70) {
      vincitore = "Giocatore 1";
    } else if (utente2 === 70) {
      vincitore = "Giocatore 2";
    } else {
      vincitore = "Giocatore 3";
    }
    alert(vincitore + " ha vinto! Congratulazioni!");
    map.removeEventListener("click", start); // Rimuovi l'evento di click per terminare il gioco
  }
}
