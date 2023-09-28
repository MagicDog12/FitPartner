import {DataTypes} from 'sequelize';
import {sequelize} from '../database/db.js'

export const Like_post = sequelize.define('like_posts', {
    like_from_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    like_to_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id'
        }
    }
});