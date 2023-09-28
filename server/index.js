import 'dotenv/config';
import { sequelize } from './src/database/db.js';
import app from './src/app.js';

const {PORT} = process.env;

const main = async () => {
  try {
    await sequelize.authenticate();
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