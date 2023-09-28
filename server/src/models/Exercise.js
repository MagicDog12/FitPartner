import {DataTypes} from 'sequelize';
import {sequelize} from '../database/db.js'
import { Training } from './Training.js';

export const Exercise = sequelize.define('exercises', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
    },
    description: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING(25),
    },
    muscle1: {
        type: DataTypes.STRING(50),
        allowNUll: false 
    },
    muscle2: {
        type: DataTypes.STRING(50),
    },
    muscle3: {
        type: DataTypes.STRING(50),
    }
},  {
    timestamps: false
});

// Enlace entre id (Exercise) y excercise_id (Training)
Exercise.hasMany(Training, {
    foreignKey: 'exercise_id',
    sourceKey: 'id'
});
Training.belongsTo(Exercise, {
    foreignKey: 'exercise_id',
    targetId: 'id'
});