import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo-png.png";

import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

export const Navbar = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
                <div className="container">

                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" className="logo-img" />
                    </Link>

                    <div className="ms-auto">

                        <button
                            className="btn custom-btn me-2"
                            onClick={() => setShowLogin(true)}
                        >
                            Iniciar Sesión
                        </button>

                        <button
                            className="btn custom-btn"
                            onClick={() => setShowRegister(true)}
                        >
                            Registrarse
                        </button>

                    </div>

                </div>
            </nav>

            <LoginModal
                show={showLogin}
                onClose={() => setShowLogin(false)}
            />

            <RegisterModal
                show={showRegister}
                onClose={() => setShowRegister(false)}
            />

        </>
    );
};