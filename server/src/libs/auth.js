import jwt from "jsonwebtoken";
import config from '../config/config.js'

const sign = (payload, isAccessToken) => {
    return jwt.sign(
        payload,
        isAccessToken
            ? config.jwtAccessTokenSecret
            : config.jwtRefreshTokenSecret,
        {
            algorithm: 'HS256',
            expiresIn: 3600
        }
    );
};

export const generateAccessToken = (user) => {
    return sign({ user }, true);
};

export const generateRefreshToken = (user) => {
    return sign({ user }, false);
};

export const getTokenFromHeader = (headers) => {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};