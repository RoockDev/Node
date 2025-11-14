import { Router } from 'express';
import { obtenerFecha } from '../controllers/fechas.controller.js';


const router = Router();

router.get('/:num', obtenerFecha);

export default router;