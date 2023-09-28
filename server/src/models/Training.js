import {DataTypes} from 'sequelize';
import {sequelize} from '../database/db.js'

export const Training = sequelize.define('training', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    exercise_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'exercises',
            key: 'id'
        }
    },
    set: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    repetitions: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    distance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    time: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    extra_weight: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    extra_weight_type: {
        type: DataTypes.STRING(25),
        defaultValue: "kg" // o lbs
    },
    day: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});