import { useState } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constants';

export const Login = () => {
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

        if (email === "" || password === "") {
            setErrorResponse("Llenar todos los campos");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (response.ok) {
                console.log("El usuario inició sesión correctamente");
                setErrorResponse("");
                const json = await response.json();
                if(json.body.accessToken && json.body.refreshToken){
                    auth.saveUser(json);
                }
                goTo('/home');
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
                <h1>Fit Partner</h1>
                {!!errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                <form className='formulario' onSubmit={handleSubmit}>
                    <label>Correo</label>
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
                    <button>Iniciar sesión</button>
                    <ButtonLink to='/signup' >Crear cuenta nueva</ButtonLink>
                </form>
            </section>
        </>
    );
};