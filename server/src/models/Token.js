import {DataTypes} from 'sequelize';
import {sequelize} from '../database/db.js'

export const Token = sequelize.define('tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
});