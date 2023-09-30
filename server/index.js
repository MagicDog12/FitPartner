import 'dotenv/config';
import { sequelize } from './src/database/db.js';
import app from './src/app.js';

// import { Token } from './src/models/Token.js';
// import { User } from './src/models/User.js';
// import { Follow } from './src/models/Follow.js';
// import { Exercise} from './src/models/Exercise.js';
// import { Like_post } from './src/models/Like_post.js';
// import { Post } from './src/models/Post.js';
// import { Training } from './src/models/Training.js';


const {PORT} = process.env;

const main = async () => {
  try {
    await sequelize.sync({force: false});
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