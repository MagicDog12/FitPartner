import { useState } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constants';

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    if (auth.isAuthenticated) {
        return (<Navigate to='/home' />);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "") {
            setErrorResponse("Llenar todos los campos");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify({
                    email
                })
            })
            if (response.ok) {
                console.log("El correo se envió correctamente");
                setErrorResponse("");
                const json = await response.json();
                console.log(json);
                if (json.body.accessToken && json.body.refreshToken) {
                    auth.saveUser(json);
                }
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
                        <h2 className='text-5xl font-semibold text-center'>¿Olvidaste tu contraseña?</h2>
                        <form className='mt-8' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label className='text-lg font-medium'>Correo electrónico</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder="example@example.cl" />
                            </div>
                            {!!errorResponse && <div className='errorMessage'>{errorResponse}</div>}
                            <div className='mt-8 flex flex-col gap-y-4'>
                                <button
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Obtener código</button>
                            </div>
                            <div className='mt-8 flex justify-center items-center'>
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