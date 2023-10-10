import { useAuth } from "../auth/AuthProvider";
import { ButtonLink } from "../components/ButtonLink";
import { Header } from "./Header";
import { Footer } from "./Footer";
import {
    FaLinkedin,
    FaTelegramPlane,
    FaGithubSquare
} from 'react-icons/fa';
import {FaComputer} from 'react-icons/fa6'


export const MenuLayout = ({ children }) => {

    return (
        <div className="container max-w-full h-screen bg-gray-200">
            <Header></Header>
            <main className="home">
                {children}
            </main>
           <Footer></Footer>
        </div >

    )
};