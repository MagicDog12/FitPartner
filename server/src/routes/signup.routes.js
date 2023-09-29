import { Router } from 'express';
import { createUser } from '../controllers/users.controllers.js';

const router = Router();

router.post('/', createUser);

export default router;