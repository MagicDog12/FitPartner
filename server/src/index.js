import config from './config/config.js';
import { sequelize } from './database/db.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { apiRouter } from "./routes/index.routes.js";

import { Token } from './models/Token.js';
import { User } from './models/User.js';
import { Follow } from './models/Follow.js';
import { Exercise} from './models/Exercise.js';
import { Like_post } from './models/Like_post.js';
import { Post } from './models/Post.js';
import { Training } from './models/Training.js';

const app = express();

// Uso de middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // si recibe un body lo parsea a JSON

// Ruta principal
app.use("/api", apiRouter);

const startServer = async () => {
  try {
    await sequelize.sync({force: true});
    console.log('Connection has been established succesfully.');
    // Se conecta al servidor
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`)
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();