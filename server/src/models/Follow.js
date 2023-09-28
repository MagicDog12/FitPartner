import {DataTypes} from 'sequelize';
import {sequelize} from '../database/db.js'

export const Follow = sequelize.define('follows', {
    following_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    followed_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
});