import './Home.css';
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from 'react';
import { API_URL } from '../auth/constants';
import { MenuLayout } from "../layout/MenuLayout";

export const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const response = await fetch(`${API_URL}/todos`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            });
            if (response.ok) {
                const json = await response.json();
                setTodos(json);
            } else {
                console.log("Algo ocurrió");
                const json = await response.json();
                console.log(json);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const auth = useAuth();
    const user = auth.getUser();
    const email = user.email;

    return (
        <>
            <MenuLayout>
                <div className='home'>
                    <h1>Hola {email}, bienvenido a Fit Partner</h1>
                    {todos.map((todo) => (<div key={todo.id}>{todo.title}</div>))}
                </div>
            </MenuLayout>
        </>
    )
};