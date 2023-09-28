import {DataTypes} from 'sequelize';
import {sequelize} from '../database/db.js'
import { Post } from './Post.js';
import { Training } from './Training.js';
import { Like_post } from './Like_post.js';
import { Follow } from './Follow.js';

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNUll: false 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    genre: {
        type: DataTypes.STRING(10),
    },
    height: {
        type: DataTypes.FLOAT, 
    },
    weight: {
        type: DataTypes.FLOAT,
    }, 
    image: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
});

// Enlace entre id (User) y like_from_user_id (Post)
User.hasMany(Post, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
    targetId: 'id'
});

// Enlace entre id (User) y user_id (Training)
User.hasMany(Training, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});
Training.belongsTo(User, {
    foreignKey: 'user_id',
    targetId: 'id'
});

// Enlace entre id (User) y like_from_user_id (Like_post)
User.hasMany(Like_post, {
    foreignKey: 'like_from_user_id',
    sourceKey: 'id'
});
Like_post.belongsTo(User, {
    foreignKey: 'like_from_user_id',
    targetId: 'id'
});

// Enlace entre id (User) y like_to_user_id (Like_post)
User.hasMany(Like_post, {
    foreignKey: 'like_to_user_id',
    sourceKey: 'id'
});
Like_post.belongsTo(User, {
    foreignKey: 'like_to_user_id',
    targetId: 'id'
});

// Enlace entre id (User) y following_user_id (Follow)
User.hasMany(Follow, {
    foreignKey: 'following_user_id',
    sourceKey: 'id'
});
Follow.belongsTo(User, {
    foreignKey: 'following_user_id',
    targetId: 'id'
});

// Enlace entre id (User) y followed_user_id (Follow)
User.hasMany(Follow, {
    foreignKey: 'followed_user_id',
    sourceKey: 'id'
});
Follow.belongsTo(User, {
    foreignKey: 'followed_user_id',
    targetId: 'id'
});