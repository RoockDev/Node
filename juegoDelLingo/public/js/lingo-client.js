const API_BASE = "http://localhost:3000/api/games";
let currentGameId = null;

const newGameBtn = document.getElementById("newGameBtn");
const guessBtn = document.getElementById("guessBtn");
const wordInput = document.getElementById("wordInput");
const gameIdSpan = document.getElementById("gameId");
const output = document.getElementById("output");

//se crea una nueva partida
newGameBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(API_BASE, { method: "POST" });
    const data = await res.json();

    currentGameId = data.game.id;
    gameIdSpan.textContent = currentGameId;
    output.textContent = JSON.stringify(data, null, 2); //para mostrar el json bonito
  } catch (err) {
    console.error(err);
    output.textContent = "error al crear partida";
  }
  // Enviar intento
  guessBtn.addEventListener("click", async () => {
    if (!currentGameId) {
      alert("Primero crea una partida");
      return;
    }

    const word = wordInput.value.trim().toLowerCase();
    if (word.length !== 5) {
      alert("La palabra debe tener 5 letras");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/${currentGameId}/guess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });

      const data = await res.json();
      output.textContent = JSON.stringify(data, null, 2);

      if (data.isGameOver) {
        alert(data.isWin ? " has ganado" : " Game over");
      }
    } catch (err) {
      console.error(err);
      output.textContent = "mal";
    }
  });
});
