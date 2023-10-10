import { ButtonLink } from "../components/ButtonLink";
import {
    FaLinkedin,
    FaTelegramPlane,
    FaGithubSquare
} from 'react-icons/fa';
import { FaComputer } from 'react-icons/fa6'


export const Footer = () => {

    return (
        <footer className="container max-w-full bg-gray-700 absolute bottom-0">
            <div className='max-w-[1240px] mx-auto py-2 px-4 grid lg:grid-cols-5 gap-8 text-gray-300'>
                <div className="lg:col-span-2 lg:col-start-1 pt-4">
                    <h1 className='w-full text-3xl font-bold text-[#1190cb]'>Fit Partner.</h1>
                    <p className='py-4'>Aplicación que permite mantener un registro de tus entrenamientos y aumentar tu motivación a llevar una vida más saludable.</p>
                    <div className='flex justify-between md:w-[75%] mt-1'>
                        <ButtonLink to='https://www.linkedin.com/in/cris-duran/'><FaLinkedin size={60} /></ButtonLink>
                        <ButtonLink to='https://github.com/MagicDog12/FitPartner'><FaGithubSquare size={60} /></ButtonLink>
                        <ButtonLink to='https://telegram.me/Magic_Dog'><FaTelegramPlane size={60} /></ButtonLink>
                        <ButtonLink to='https://cduran.cl/'><FaComputer size={60} /></ButtonLink>
                    </div>
                </div>
                <div className='lg:col-span-2 lg:col-start-4 flex justify-between mt-6'>
                    <div>
                        <h6 className='font-medium text-gray-400'>Stack tecnológico:</h6>
                        <ul>
                            <li className='py-2 text-sm'>React (Javascript)</li>
                            <li className='py-2 text-sm'>Nodejs (Javascript)</li>
                            <li className='py-2 text-sm'>Express</li>
                            <li className='py-2 text-sm'>Sequelize (PostgreSQL)</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Desarrollador:</h6>
                        <ul>
                            <li className='py-2 text-sm'>Cristian Durán</li>
                            <li className='py-2 text-sm'>Estudiante de Ingeniería Civil en Computación <br /> de la Universidad de Chile</li>
                            <li className='py-2 text-sm'>cristian.duran@ing.uchile.cl</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
};