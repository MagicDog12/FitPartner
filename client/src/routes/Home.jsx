import './Home.css';

export const Home = ({user, setUser}) => {
    const handleLogout = () =>{
        setUser([]);
    };

    return (
        <>
            <div className='home'>
                <h1>Bienvenido {user} a TuGymBro</h1>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </>
    )
};