import { useState } from 'react';
import {ButtonLink} from '../components/ButtonLink';
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

export const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const auth = useAuth();
    if(auth.isAuthenticated){
        return(<Navigate to='/home' />);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "" || password === "") {
            setError(true);
            return;
        }
        setError(false);
        setUser([name]);
    };

    return (
        <>
            <section>
                <h1>Tu Gym Bro</h1>
                <form className='formulario' onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => { setName(e.target.value) }}
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
                {error && <p>Usuario o Contraseña incorrecto!</p>}
            </section>
        </>
    );
};