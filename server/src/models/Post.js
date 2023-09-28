import {DataTypes} from 'sequelize';
import {sequelize} from '../database/db.js'
import { Like_post } from './Like_post.js';

export const Post = sequelize.define('posts', {
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
    title: {
        type: DataTypes.STRING(150),
    },
    body: {
        type: DataTypes.STRING,
    },
    day: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Enlace entre id (Post) y post_id (Like_post)
Post.hasMany(Like_post, {
    foreignKey: 'post_id',
    sourceKey: 'id'
});
Like_post.belongsTo(Post, {
    foreignKey: 'post_id',
    targetId: 'id'
});