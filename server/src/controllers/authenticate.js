import { getTokenFromHeader } from "./auth.js";
import { jsonResponse } from '../libs/jsonResponse.js';
import { verifyAccessToken } from "./verifyToken.js";

export const authenticate = (req, res, next) => {
    let token = getTokenFromHeader(req.headers);
    if (token) {
        const decoded = verifyAccessToken(token);
        if (decoded) {
            req.user = { ...decoded.user };
            next();
        } else {
            return res.status(401).json(jsonResponse(401, { message: "No token provided." }));
        }
    } else {
        return res.status(401).json(jsonResponse(401, { message: "No token provided." }));
    }
};