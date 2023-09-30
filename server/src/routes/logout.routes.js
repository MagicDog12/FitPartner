import { Router } from 'express';
import { logout } from '../controllers/users.controllers.js';

const router = Router();

router.delete('/', logout);

export default router;