import { Router } from 'express';
import { jsonResponse } from '../libs/jsonResponse.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(jsonResponse(200, {message: 'Servidor funcionando!'}));
});

export default router;