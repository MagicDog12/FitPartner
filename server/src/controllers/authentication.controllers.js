import { User } from "../models/User.js";
import { Token } from "../models/Token.js";
import { jsonResponse } from '../libs/jsonResponse.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, getTokenFromHeader } from '../libs/auth.js';
import { verifyRefreshToken, verifyResetToken } from "../libs/verifyToken.js";
import { generateEmailToken, transporter } from "../libs/email.js";
import config from "../config/config.js";


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

const changePassword = async (id, password) => {
    // Change everyone without a last name to "Doe"
    await User.update({ password }, {
        where: {
            id
        }
    });
}

const checkEmail = (email) => {
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return validEmail.test(email);
}

const checkPassword = (password) => {
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return validPassword.test(password);
}

const checkUsername = (username) => {
    const validUserName = /^[a-zA-Z0-9_.]+$/;
    return validUserName.test(username);

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Caso: No hay datos para crear usuario
        if (!!!email || !!!password) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Llenar todos los campos'
            }));
        }
        // Caso: Datos no cumplen el formato
        if (!checkEmail(email)) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Email no cumple el formato'
            }));
        }
        if (!checkPassword(password)) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Contraseña no cumple el formato'
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
        return res.status(200).json(jsonResponse(200, { user: newUser, accessToken, refreshToken }));
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
        // Caso: Datos no cumplen el formato
        if (!checkUsername(username)) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Nombre de usuario no cumple el formato'
            }));
        }
        if (!checkEmail(email)) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Email no cumple el formato'
            }));
        }
        if (!checkPassword(password)) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Contraseña no cumple el formato'
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

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Caso: No hay email para enviar
        if (!!!email) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Llenar todos los campos'
            }));
        }
        // Caso: Email no cumple el formato
        if (!checkEmail(email)) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Email no cumple el formato'
            }));
        }
        // Caso: No hay ningun correo registrado
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Email no registrado'
            }));
        }
        // Creamos el token de recuperación de contraseña y enviamos el correo con el link
        const token = generateEmailToken({ id: user.id, username: user.username });
        const link = `http://localhost:3000/reset-password/${token}`;
        const info = await transporter.sendMail({
            from: config.email,
            to: email,
            subject: "Cambiar tu contraseña",
            html: `<b>Ingresa <a href=${link}>aqui</a> para cambiar tu contraseña de Fit Partner.</b>`,
        });
        let message = "Email no enviado";
        if (info.accepted) {
            message = "Email enviado correctamente";
        }
        return res.status(200).json(jsonResponse(200, { message }));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(jsonResponse(500, { error: 'Error de servidor' }));
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;
        // Caso: No hay contraseñas para enviar
        if (!!!password || !!!confirmPassword || !!!token) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Llenar todos los campos'
            }));
        }
        // Caso: Contraseñas no cumplen el formato
        if (!checkPassword(password) || !checkPassword(confirmPassword)) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Contraseña no cumple el formato'
            }));
        }
        // Caso: Contraseñas no son identicas
        if (password !== confirmPassword) {
            return res.status(400).json(jsonResponse(400, {
                error: 'Contraseña no son identicas'
            }));
        }
        // Revisamos si el token es valido y obtenemos el id
        const payload = verifyResetToken(token);
        if (payload) {
            const {id} = payload;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            await changePassword(id, hashPassword);
            return res.status(200).json(jsonResponse(200, { message: "Contraseña cambiada con éxito" }));
        } else {
            return res.status(401).json(jsonResponse(401, { error: "Usuario no autorizado" }));
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(jsonResponse(500, { error: 'Error de servidor' }));
    }
}