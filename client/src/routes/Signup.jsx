import { useState } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constants';

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
        if (!checkUsername(username)) {
            setErrorResponse("Nombre de usuario no debe poseer espacios");
            return;
        }
        if (!checkEmail(email)) {
            setErrorResponse("Email no cumple el formato: example@example.com");
            return;
        }
        if (!checkPassword(password)) {
            setErrorResponse("Contraseña tiene que poseer minímo 8 caracteres y al menos un número, una letra mayúscula y minúscula");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
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
            <div className="flex w-full h-screen">
                <div className="w-full flex items-center justify-center lg:w-1/2">
                    <div className='lg:w-11/12 max-w-[700px] px-10 py-10 absolute inset-2 lg:static rounded-3xl bg-white border-2 border-gray-100'>
                        <h1 className='text-5xl font-semibold text-center'>Regístrate</h1>
                        <p className='font-medium text-lg text-gray-500 mt-4 text-center'>Y comienza tu aventura con Fit Partner!</p>
                        <form className='mt-1 lg:mt-8' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium'>Nombre de usuario</label>
                                <input
                                    value={username}
                                    onChange={e => { setUsername(e.target.value) }}
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder="example123" />
                                <label className='text-lg font-medium'>Correo electrónico</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder="example@example.cl" />
                            </div>
                            <div className='flex flex-col mt-4'>
                                <label className='text-lg font-medium'>Contraseña</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder="*********"
                                    type={"password"}
                                />
                            </div>
                            {!!errorResponse && <div className='errorMessage text-red-500 py-2'>{errorResponse}</div>}
                            <div className='mt-8 flex flex-col gap-y-4'>
                                <button
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Crear cuenta</button>
                            </div>
                            <div className='mt-3 lg:mt-8 flex justify-center items-center'>
                                <ButtonLink to='/' tailwind='ml-2 font-medium text-sm text-violet-800'>Volver</ButtonLink>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                    <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
                    <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
                </div>
            </div>
        </>
    );
};