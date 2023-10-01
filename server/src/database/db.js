import { Sequelize } from 'sequelize';
import config from "../config/config.js";

export const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: 'postgres',
    port: config.dbPort
});