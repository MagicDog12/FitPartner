import { Router } from 'express';
import {todos} from '../controllers/todos.controllers.js';

const router = Router();

router.get('/', todos);

export default router;