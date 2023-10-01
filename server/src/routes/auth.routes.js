import { Router } from 'express';
import { signup, login, logout, refreshToken } from '../controllers/authentication.controllers.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;