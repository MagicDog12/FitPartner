import jwt from "jsonwebtoken";

const sign = (payload, isAccessToken) => {
    return jwt.sign(
        payload,
        isAccessToken
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: 3600
        }
    );
};

export const generateAccessToken = (user) => {
    console.log(user);
    return sign({user}, true);
};

export const generateRefreshToken = (user) => {
    return sign({user}, false);
};