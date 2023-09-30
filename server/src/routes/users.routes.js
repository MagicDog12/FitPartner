import { Router } from 'express';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/users.controllers.js';

const router = Router();

router.get('/', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;