import config from './config/index.js';
import { sequelize } from './database/db.js';
import app from './app.js';

// import { Token } from './src/models/Token.js';
// import { User } from './src/models/User.js';
// import { Follow } from './src/models/Follow.js';
// import { Exercise} from './src/models/Exercise.js';
// import { Like_post } from './src/models/Like_post.js';
// import { Post } from './src/models/Post.js';
// import { Training } from './src/models/Training.js';

const main = async () => {
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

main();