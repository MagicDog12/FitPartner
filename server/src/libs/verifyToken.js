import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.jwtAccessTokenSecret);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.jwtRefreshTokenSecret);
};

export const verifyResetToken = (token) => {
    return jwt.verify(token, config.jwtEmailTokenSecret);
};