import { jsonResponse } from '../libs/jsonResponse.js';

export const todos = async (req, res) => {
    try {
        res.json([
            {
                id: 1,
                title: 'Miami',
                completed: false
            },
            {
                id: 2,
                title: 'Orlando',
                completed: false
            },
        ]);
    } catch (error) {
        console.error(error.message)
        return res.status(500).json(jsonResponse(500, { error: 'Error de servidor' }));
    }
};