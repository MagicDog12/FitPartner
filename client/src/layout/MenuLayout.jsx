import { Header } from "./Header";
import { Footer } from "./Footer";
import Notification from '../util/Notification';


export const MenuLayout = ({ children }) => {

    return (
        <div className="container max-w-full h-screen bg-gray-200">
            <Header></Header>
            <main className="home">
                {children}
            </main>
           <Footer></Footer>
           <Notification />
        </div >

    )
};