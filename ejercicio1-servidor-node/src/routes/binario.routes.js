import { Router } from 'express';
import { complemento } from '../controllers/binario.controller.js';

const router = Router();

router.get('/:tipo/:bin', complemento);

export default router;
