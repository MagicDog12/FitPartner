import { User } from "../models/User.js";
import { jsonResponse } from '../libs/jsonResponse.js';

export const getUser = async (req, res) => {
    try {
        res.status(200).json(jsonResponse(200, req.user));
    } catch (error) {
        return res.status(500).json(jsonResponse(500, { error: error.message }));
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const user = await User.findByPk(id);
        user.username = username;
        user.email = email;
        user.password = password;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: 'Error de servidor' });
    }
};