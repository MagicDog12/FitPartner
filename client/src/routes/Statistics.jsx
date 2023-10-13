import { useAuth } from "../auth/AuthProvider";
import { MenuLayout } from "../layout/MenuLayout";

export const Statistics = () => {

    const auth = useAuth();
    const user = auth.getUser();
    const email = user.email;

    return (
        <>
            <MenuLayout>
                <div className='profile'>
                    <h1>Estadísticas</h1>
                </div>
            </MenuLayout>
        </>
    )
};