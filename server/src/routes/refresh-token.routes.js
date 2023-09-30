import { Router } from 'express';
import { refreshToken } from '../controllers/users.controllers.js';

const router = Router();

router.post('/', refreshToken);

export default router;