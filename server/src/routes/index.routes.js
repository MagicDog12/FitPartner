import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';

import statusRouter from './status.routes.js';
import authRouter from './auth.routes.js';
import usersRouter from './users.routes.js';
import todosRouter from './todos.routes.js';

export const apiRouter = Router();

apiRouter.use('/status', statusRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/user', authenticate, usersRouter);
apiRouter.use('/todos', authenticate, todosRouter);