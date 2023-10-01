import config from './config/index.js';
import { sequelize } from './database/db.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { apiRouter } from "./routes/index.routes.js";

// import { Token } from './src/models/Token.js';
// import { User } from './src/models/User.js';
// import { Follow } from './src/models/Follow.js';
// import { Exercise} from './src/models/Exercise.js';
// import { Like_post } from './src/models/Like_post.js';
// import { Post } from './src/models/Post.js';
// import { Training } from './src/models/Training.js';

const app = express();

// Uso de middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // si recibe un body lo parsea a JSON

// Ruta principal
app.use("/api", apiRouter);

const startServer = async () => {
  try {
    await sequelize.sync({force: false});
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