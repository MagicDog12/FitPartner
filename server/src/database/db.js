import { Sequelize } from 'sequelize';
const { DB_USER, DB_NAME, DB_PASSW, DB_HOST, DB_PORT } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSW, {
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT
});