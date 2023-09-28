import 'dotenv/config';
import { sequelize } from './src/database/db.js';
import app from './src/app.js';

import './src/models/User.js';
import './src/models/Exercise.js';
import './src/models/Follow.js';
import './src/models/Like_post.js';
import './src/models/Post.js';
import './src/models/Training.js';

const {PORT} = process.env;

const main = async () => {
  try {
    await sequelize.sync({force: true});
    console.log('Connection has been established succesfully.');
    // Se conecta al servidor
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();