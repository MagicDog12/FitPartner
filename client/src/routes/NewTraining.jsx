import { useAuth } from "../auth/AuthProvider";
import { MenuLayout } from "../layout/MenuLayout";

export const NewTraining = () => {

    const auth = useAuth();
    const user = auth.getUser();
    const email = user.email;

    return (
        <>
            <MenuLayout>
                <div className='profile'>
                    <h1>Nuevo entrenamiento</h1>
                </div>
            </MenuLayout>
        </>
    )
};