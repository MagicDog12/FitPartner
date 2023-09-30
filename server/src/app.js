import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import signupRoutes from './routes/signup.routes.js';
import loginRoutes from './routes/login.routes.js';
import usersRoutes from './routes/users.routes.js';
import todosRoutes from './routes/todos.routes.js';
import refreshTokenRoutes from './routes/refresh-token.routes.js';
import logoutRoutes from './routes/logout.routes.js';
import { authenticate } from './controllers/authenticate.js';

const app = express();

// Uso de middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // si recibe un body lo parsea a JSON

// // Rutas
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/user", authenticate, usersRoutes);
app.use("/api/todos", authenticate, todosRoutes);
app.use("/api/refresh-token", refreshTokenRoutes);
app.use("/api/logout", logoutRoutes);

export default app;