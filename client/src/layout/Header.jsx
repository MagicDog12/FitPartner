import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import { ButtonLink } from "../components/ButtonLink";
import logo from "../assets/logo.png";
import logoutLogo from "../assets/logout.png";

export const Header = () => {

    const auth = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`,
                },
            });
            if (response.ok) {
                console.log("El usuario cerró sesión correctamente");
                auth.logout();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="px-28 py-5">
            <nav className="flex items-center">
                <ButtonLink to='/home'><img src={logo} alt="Fit Partner" className="w-40 cursor-pointer" /></ButtonLink>
                <ul className="flex-1 text-center">
                    <li className="list-none inline-block px-5">
                        <ButtonLink to='/search' tailwind="underline decoration-indigo-500/30 px-2">Buscar ejercicio</ButtonLink>
                    </li>
                    <li className="list-none inline-block px-5">
                        <ButtonLink to='/new' tailwind="underline decoration-indigo-500/30 px-2">Nuevo entrenamiento</ButtonLink>
                    </li>
                    <li className="list-none inline-block px-5">
                        <ButtonLink to='/statistics' tailwind="underline decoration-indigo-500/30 px-2">Estadísticas</ButtonLink>
                    </li>
                    <li className="list-none inline-block px-5">
                        <ButtonLink to='/profile' tailwind="underline decoration-indigo-500/30 px-2">Perfil</ButtonLink>
                    </li>
                </ul>
                <img src={logoutLogo} alt="Cerrar Sesión" className="w-8 cursor-pointer" onClick={handleLogout} />
            </nav >
        </header >
    )
};