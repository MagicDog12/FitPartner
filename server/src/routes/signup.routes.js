import { Router } from 'express';
import { signup } from '../controllers/users.controllers.js';

const router = Router();

router.post('/', signup);

export default router;