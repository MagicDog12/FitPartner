import { User } from "../models/User.js";
import { Token } from "../models/Token.js";
import { jsonResponse } from '../libs/jsonResponse.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, getTokenFromHeader } from '../libs/auth.js';
import { verifyRefreshToken } from "../libs/verifyToken.js";

const getUserByEmail = async (email) => {
    const data = await User.findOne({
        where: { email },
        attributes: ['id', 'email', 'password']
    });
    return data;
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Caso: No hay datos para crear usuario
        if (!!!email || !!!password) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Fields are required.'
            }));
        }
        // Caso: No hay ningun correo registrado
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Wrong credentials.'
            }));
        }
        // Caso: La contraseña no coincide
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Wrong credentials.'
            }));
        }
        // Creamos el token
        const newUser = { id: user.id, email: user, email };
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        await Token.create({
            token: refreshToken,
        });
        res.status(200).json(jsonResponse(200, { user: newUser, accessToken, refreshToken }));
    } catch (error) {
        return res.status(500).json(jsonResponse(500, { error: error.message }));
    }
};

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Caso: No hay datos para crear usuario
        if (!!!username || !!!email || !!!password) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Fields are required.'
            }));
        }
        // Caso: Correo ya está registrado
        const userExist = await getUserByEmail(email);
        if (userExist) {
            return res.status(400).json(jsonResponse(400, {
                error: 'User already exist.'
            }));
        }
        // Encriptación
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await User.create({
            username,
            email,
            password: hashPassword
        });
        res.status(200).json(jsonResponse(200, { message: 'User created successfully.' }));
    } catch (error) {
        return res.status(500).json(jsonResponse(500, { error: error.message }));
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers);
        if (refreshToken) {
            const found = await Token.findOne({
                where: {
                    token: refreshToken,
                }
            });
            if (!found) {
                return res.status(401).json(jsonResponse(401, { error: "Unauthorized1" }));
            }
            const payload = verifyRefreshToken(found.token);
            if (payload) {
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).json(jsonResponse(200, { accessToken }));
            } else {
                return res.status(401).json(jsonResponse(401, { error: "Unauthorized2" }));
            }
        } else {
            return res.status(401).json(jsonResponse(401, { error: "Unauthorized3" }));
        }
    } catch (error) {
        return res.status(500).json(jsonResponse(500, { error: error.message }));
    }
};

export const logout = async (req, res) => {
    try {
        console.log("cerrando sesion");
        const refreshToken = getTokenFromHeader(req.headers);
        if (refreshToken) {
            console.log(refreshToken);
            await Token.destroy({
                where: {
                    token: refreshToken
                }
            });
            res.status(200).json(jsonResponse(200, { message: 'Token deleted.' }));
        }
    } catch (error) {
        return res.status(500).json(jsonResponse(500, { error: error.message }));
    }
};