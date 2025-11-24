import {Router} from 'express';
import {
    createGame,
    makeGuess,
    getAllGames,
} from '../controllers/game.controller.js';

export const router = Router();

//POST /api/games crear partida
router.post('/',createGame);

// POST /api/games/:id/guess hacer intento
router.post('/:id/guess', makeGuess);

//GET /api/games devuelve todas las partidas
router.get('/', getAllGames);

