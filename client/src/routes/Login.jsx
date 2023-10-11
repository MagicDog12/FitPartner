import { useState, useContext } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constants';
import NotificationContext from '../context/NotificationContext';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    const { notificationHandler } = useContext(NotificationContext);

    const handlerSuccessLogin = (message) => {
        notificationHandler({ type: 'success', message });
    }

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
                handlerSuccessLogin('Inicio de sesión correcto');
                setErrorResponse("");
                const json = await response.json();
                if (json.body.accessToken && json.body.refreshToken) {
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
            <div className="flex w-full h-screen">
                <div className="w-full flex items-center justify-center lg:w-1/2">
                    <div className='lg:w-11/12 max-w-[700px] px-10 py-10 absolute inset-2 lg:static rounded-3xl bg-white border-2 border-gray-100'>
                        <h1 className='text-5xl font-semibold text-center'>Fit Partner</h1>
                        <p className='font-medium text-lg text-gray-500 mt-4 text-center'>Bienvenido! <br></br> Por favor ingresa tus datos.</p>
                        <form className='mt-1 lg:mt-8' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
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
                            <div className='mt-3 lg:mt-8 flex justify-between items-center'>
                                <div>
                                    <input type="checkbox" id='remember' />
                                    <label className='ml-2 font-medium text-sm' htmlFor="remember">Recuérdame por 30 días</label>
                                </div>
                                <ButtonLink to='/forgot-password' tailwind='font-medium text-sm text-violet-800' >¿Olvidaste tu contraseña?</ButtonLink>
                            </div>
                            <div className='mt-3 lg:mt-8 flex flex-col gap-y-4'>
                                <button
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Iniciar sesión</button>
                            </div>
                            <div className='mt-3 lg:mt-8 flex justify-center items-center'>
                                <p className='mr-8 font-medium text-base'>¿No tienes una cuenta?</p>
                                <ButtonLink to='/signup' tailwind='ml-2 font-medium text-base text-violet-800'>Crear cuenta nueva</ButtonLink>
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