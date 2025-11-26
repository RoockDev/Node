import { Game } from "../models/Game.js";
import { getRandomWord } from "../database/words.js";
import { getClues } from "../utils/clues.js";

//la bbdd
const games = [];

// POST /api/games crear nueva partida
export const createGame = async (req,res) => {
  try{
    const id = games.length + 1; //id autoincremental en memoria
    const secret = await getRandomWord(); //ahora viene de la bbdd

    const newGame = new Game(id,secret); // se crea la partida
    games.push(newGame);

    res.status(201).json({
      message: 'partida creada correctamente',
      game: newGame
    });
  }catch(error){
    console.error('error al crear la partida', error);
    res.status(500).json({message: 'Error al crear la partida'});
  }
};

// POST /api/games/:id/guess hacer intento
export const makeGuess = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { word } = req.body;

  //se busca la partida
  const game = games.find((g) => g.id === id);

  if (!game) {
    return res.status(404).json({ message: "partida no encontrada" });
  }

  //se comprueban los intentos
  if (game.attempts >= game.maxAttempts) {
    return res.status(400).json({ message: "no quedan mas intentos" });
  }

  if (game.isFinished) {
    return res.status(400).json({ message: "La partida ya ha terminado" });
  }

  //se calculan las pistas
  const clues = getClues(game.secret, word);

  //se actualiza la partida
  game.attempts++;
  game.history.push({ word, clues });

  const isWin = word === game.secret;
  const isGameOver = isWin || game.attempts >= game.maxAttempts;

  if (isGameOver) {
    game.isFinished = true;
  }

  res.status(200).json({
    message: isWin ? 'has ganado' : "Intento procesado",
    clues,
    attempts: game.attempts,
    maxAttempts: game.maxAttempts,
    isWin,
    isGameOver,
    gameId: game.id,
  });
};

// GET /api/games devolver todas las partidas
export const getAllGames = (req, res) => {
  res.status(200).json({
    message: "Listado de partidas",
    games,
  });
};
