import {Router} from 'express';
import {calcularFormaciones} from '../controllers/legiones.controller.js';

const router = Router();

router.get('/:soldados',calcularFormaciones);

export default router;