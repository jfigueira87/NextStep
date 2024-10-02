import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import burgerOpen from '../assets/images/burguer-open.svg'
import burgerClose from '../assets/images/burguer-close.svg'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 p-1 bg-slate-50 bg-opacity-90 backdrop-blur-sm w-full items-center flex flex-row justify-between z-30">
                {/* Logo */}
                <div className="flex items-center ml-[4%]">
                    <NavLink to="/">
                        <img
                            src={require('../assets/images/logoNextstep.png')}
                            alt="Logo"
                            className="w-16 h-16"
                        />
                    </NavLink>
                </div>
                <div className="hidden md:flex items-center justify-end mr-[4%] space-x-4">
                    <NavLink
                        to="/"
                        className="text-black transition-transform duration-300 ease-in-out hover:scale-105 hover:text-gray-600"
                    >
                        Pide tu cita
                    </NavLink>
                    <NavLink
                        to="/logout"
                        className="text-black transition-transform duration-300 ease-in-out hover:scale-105 hover:text-gray-600"
                    >
                        Cerrar sesión
                    </NavLink>
                </div>
                <div className="md:hidden flex items-center justify-end mr-[4%]">
                    <img
                        src={isMenuOpen ? burgerClose : burgerOpen}
                        alt="Menú"
                        className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${
                            isMenuOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                        onClick={toggleMenu}
                    />
                </div>
            </nav>
            <div
                className={`fixed right-0 top-[72px] w-full h-[14vh] bg-blue-200 bg-opacity-80 backdrop-blur-lg text-gray shadow-2xl z-40 transition-all ${
                    isMenuOpen
                        ? 'duration-700 ease-in-out'
                        : 'duration-300 ease-in'
                } transform ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <ul className="flex flex-col p-4 ">
                    <li className="py-1 text-xl text-center">
                        <NavLink
                            to="/"
                            className="text-black transition-transform duration-300 ease-in-out transform hover:scale-125 hover:text-gray-600"
                        >
                            Pide tu cita
                        </NavLink>
                    </li>
                    <li className="py-1 text-xl text-center">
                        <NavLink
                            to="/logout"
                            className="text-black transition-transform duration-300 ease-in-out transform hover:scale-125 hover:text-gray-600"
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Nav
