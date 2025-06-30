
const simboli = ['helmet', 'shield', 'colosseum', 'sword', 'gold'];
let crediti = localStorage.getItem('crediti') ? parseInt(localStorage.getItem('crediti')) : 1000;
let giriTotali = localStorage.getItem('giriTotali') ? parseInt(localStorage.getItem('giriTotali')) : 0;
let perditeConsecutive = localStorage.getItem('perditeConsecutive') ? parseInt(localStorage.getItem('perditeConsecutive')) : 0;
let freespin = localStorage.getItem('freespin') ? parseInt(localStorage.getItem('freespin')) : 0;

const creditiEl = document.getElementById("crediti");
const status = document.getElementById("status");
const reels = document.querySelectorAll(".reel img");
const btnRicarica = document.getElementById("btnRicarica");
const musicSpin = document.getElementById("musicSpin");
const musicWin = document.getElementById("musicWin");

function aggiornaStato() {
  creditiEl.textContent = crediti;
  localStorage.setItem('crediti', crediti);
  localStorage.setItem('giriTotali', giriTotali);
  localStorage.setItem('perditeConsecutive', perditeConsecutive);
  localStorage.setItem('freespin', freespin);
  btnRicarica.style.display = (crediti <= 0 && freespin <= 0) ? 'inline-block' : 'none';
}

function giraSlot() {
  if (crediti <= 0 && freespin <= 0) return;

  musicSpin.currentTime = 0;
  musicSpin.play();

  const costo = 50;
  let vincita = false;

  if (freespin > 0) {
    freespin--;
    status.textContent = `Freespin attivo! (${freespin} rimasti)`;
  } else {
    crediti -= costo;
    giriTotali++;
  }

  reels.forEach((reel, i) => {
    const simbolo = simboli[Math.floor(Math.random() * simboli.length)];
    reel.src = `images/${simbolo}.png`;
  });

  if (Math.random() < 0.2) {
    vincita = true;
    musicSpin.pause();
    musicWin.play();
    crediti += 300;
    status.textContent = "Hai VINTO 300 crediti!";
    perditeConsecutive = 0;
  } else {
    perditeConsecutive += costo;
    musicSpin.pause();
    status.textContent = "Hai perso...";
  }

  if (giriTotali % 40 === 0 || perditeConsecutive >= 1000) {
    freespin = 7;
    perditeConsecutive = 0;
    status.textContent += "\nHai ottenuto 7 FREESPIN!";
  }

  aggiornaStato();
}

function ricaricaCrediti() {
  crediti = 1000;
  giriTotali = 0;
  perditeConsecutive = 0;
  freespin = 0;
  status.textContent = "Crediti ricaricati!";
  aggiornaStato();
}

aggiornaStato();
