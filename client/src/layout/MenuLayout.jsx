import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";


export const MenuLayout = ({ children }) => {

    const auth = useAuth();
    const user = auth.getUser();
    const email = user.email;

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`,
                },
            });
            if(response.ok) {
                auth.logout();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to='/home'>Inicio</Link>
                        </li>
                        <li>
                            <Link to='/profile'>Perfil</Link>
                        </li>
                        <li>
                            <Link to='/profile'>{user ? email : ""}</Link>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout}>Cerrar Sesión</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="home">
                {children}
            </main>
        </>
    )
};