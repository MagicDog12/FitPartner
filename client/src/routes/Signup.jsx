import { useState } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constants';

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();


    if (auth.isAuthenticated) {
        return (<Navigate to='/home' />);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username === "" || email === "" || password === "") {
            setErrorResponse("Llenar todos los campos");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            if (response.ok) {
                console.log("El usuario se registró correctamente");
                setErrorResponse("");
                goTo('/');
            } else {
                console.log("Algo ocurrió");
                const json = await response.json();
                setErrorResponse(json.body.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <h1>Registrarse</h1>
                {!!errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                <form className='formulario' onSubmit={handleSubmit}>
                    <label>Nombre de usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => { setUsername(e.target.value) }}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                    />
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    />
                    <button>Crear cuenta</button>
                    <ButtonLink to='/' >Volver</ButtonLink>
                </form>
            </section>
        </>
    );
};