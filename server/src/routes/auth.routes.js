import { Router } from 'express';
import { signup, login, logout, refreshToken, forgotPassword, resetPassword } from '../controllers/authentication.controllers.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword )

export default router;