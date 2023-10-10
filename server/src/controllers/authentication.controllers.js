import { User } from "../models/User.js";
import { Token } from "../models/Token.js";
import { jsonResponse } from '../libs/jsonResponse.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, getTokenFromHeader } from '../libs/auth.js';
import { verifyRefreshToken } from "../libs/verifyToken.js";


const createUser = async (username, email, password) => {
    const newUser = await User.create({
        username,
        email,
        password
    });
    return newUser;
};

const getUserByEmail = async (email) => {
    const data = await User.findOne({
        where: { email },
        attributes: ['id', 'email', 'password']
    });
    return data;
};

const createToken = async (token) => {
    const newToken = await Token.create({
        token,
    });
    return newToken;
};

const getToken = async (token) => {
    const data = await Token.findOne({
        where: {
            token,
        }
    });
    return data
};

const deleteToken = async (token) => {
    await Token.destroy({
        where: {
            token,
        }
    });
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Caso: No hay datos para crear usuario
        if (!!!email || !!!password) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Llenar todos los campos'
            }));
        }
        // Caso: No hay ningun correo registrado
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Credenciales incorrectas'
            }));
        }
        // Caso: La contraseña no coincide
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Credenciales incorrectas'
            }));
        }
        // Creamos el token
        const newUser = { id: user.id, email: user, email };
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        await createToken(refreshToken);
        res.status(200).json(jsonResponse(200, { user: newUser, accessToken, refreshToken }));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(jsonResponse(500, { error: 'Error de servidor' }));
    }
};

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Caso: No hay datos para crear usuario
        if (!!!username || !!!email || !!!password) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Llenar todos los campos'
            }));
        }
        // Caso: Correo ya está registrado
        const userExist = await getUserByEmail(email);
        if (userExist) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Usuario ya existe'
            }));
        }
        // Encriptación
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await createUser(username, email, hashPassword);
        res.status(200).json(jsonResponse(200, { message: 'Usuario creado satisfactoriamente' }));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(jsonResponse(500, { error: 'Error de servidor' }));
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers);
        if (refreshToken) {
            const found = await getToken(refreshToken);
            if (!found) {
                return res.status(401).json(jsonResponse(401, { error: "Usuario no autorizado" }));
            }
            const payload = verifyRefreshToken(found.token);
            if (payload) {
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).json(jsonResponse(200, { accessToken }));
            } else {
                return res.status(401).json(jsonResponse(401, { error: "Usuario no autorizado" }));
            }
        } else {
            return res.status(401).json(jsonResponse(401, { error: "Usuario no autorizado" }));
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(jsonResponse(500, { error: 'Error de servidor' }));
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers);
        if (refreshToken) {
            await deleteToken(refreshToken);
            return res.status(200).json(jsonResponse(200, { message: 'Token eliminado' }));
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(jsonResponse(500, { error: 'Error de servidor' }));
    }
};