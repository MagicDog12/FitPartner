import { useState } from 'react';
import {ButtonLink} from '../components/ButtonLink';
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

export const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const auth = useAuth();
    if(auth.isAuthenticated){
        return(<Navigate to='/home' />);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || password === "") {
            setError(true);
            return;
        }
        setError(false);
        setUser([name]);
    };

    return (
        <>
            <section>
                <h1>Registrarse</h1>
                <form className='formulario' onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => { setName(e.target.value) }}
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
                {error && <p>Todos los campos son obligatorios</p>}
            </section>
        </>
    );
};