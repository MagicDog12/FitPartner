import { useState } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../auth/constants';

const checkPassword = (password) => {
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return validPassword.test(password);
}

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const {token} = useParams();

    const goTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === "" || confirmPassword === "") {
            setErrorResponse("Llenar todos los campos");
            return;
        }
        if (!checkPassword(password)) {
            setErrorResponse("Contraseña tiene que poseer minímo 8 caracteres y al menos un número, una letra mayúscula y minúscula");
            return;
        }
        if (!checkPassword(confirmPassword)) {
            setErrorResponse("Contraseña tiene que poseer minímo 8 caracteres y al menos un número, una letra mayúscula y minúscula");
            return;
        }
        if (password !== confirmPassword) {
            setErrorResponse("Contraseñas tiene que ser identicas");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify({
                    password,
                    confirmPassword,
                    token
                })
            })
            if (response.ok) {
                console.log("El usuario cambio la contraseña correctamente");
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
                        <h1 className='text-5xl font-semibold text-center'>No te preocupes.</h1>
                        <p className='font-medium text-lg text-gray-500 mt-4 text-center'>Cambia tu contraseña aqui:</p>
                        <form className='mt-1 lg:mt-8' onSubmit={handleSubmit}>
                            <div className='flex flex-col mt-4'>
                                <label className='text-lg font-medium'>Contraseña</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder="*********"
                                    type={"password"}
                                />
                                <label className='text-lg font-medium'>Confirma tu contraseña</label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder="*********"
                                    type={"password"}
                                />
                            </div>
                            {!!errorResponse && <div className='errorMessage text-red-500 py-2'>{errorResponse}</div>}
                            <div className='mt-8 flex flex-col gap-y-4'>
                                <button
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Enviar</button>
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