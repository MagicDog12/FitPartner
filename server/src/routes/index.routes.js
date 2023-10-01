import { Router } from 'express';

import { authenticate } from '../controllers/authenticate.js';

import signupRouter from './signup.routes.js';
import loginRouter from './login.routes.js';
import usersRouter from './users.routes.js';
import todosRouter from './todos.routes.js';
import refreshTokenRouter from './refresh-token.routes.js';
import logoutRouter from './logout.routes.js';

export const apiRouter = Router();
apiRouter.use('/signup', signupRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/user', authenticate, usersRouter);
apiRouter.use('/todos', authenticate, todosRouter);
apiRouter.use('/refresh-token', refreshTokenRouter);
apiRouter.use('/logout', logoutRouter);