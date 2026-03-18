import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/Logo-png.png";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);


    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const openLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleLogout = () => {
        dispatch({ type: "logout" });
        setShowDropdown(false);
        navigate("/");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top shadow">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" className="logo-img" style={{ height: "50px" }} />
                    </Link>

                    <div className="ms-auto">
                        {!store.token ? (
                            <div className="d-flex gap-2">
                                <button className="btn custom-btn" onClick={() => setShowLogin(true)}>
                                    Iniciar Sesión
                                </button>
                                <button className="btn custom-btn" onClick={() => setShowRegister(true)}>
                                    Registrarse
                                </button>
                            </div>
                        ) : (
                            
                            <div className="position-relative" ref={dropdownRef}>
                                <button
                                    className="btn custom-btn rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "45px", height: "45px" }}
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <i className="fas fa-user"></i>
                                </button>

                                {showDropdown && (
                                    <div className="dropdown-menu-custom show position-absolute end-0 mt-2 p-2 shadow-lg"
                                         style={{ background: "#1A1A1A", borderRadius: "8px", border: "1px solid #333", minWidth: "180px", zIndex: 1000 }}>

                                        <Link to="/profile" className="dropdown-item-custom d-block p-2 text-decoration-none text-white mb-1" onClick={() => setShowDropdown(false)}>
                                            <i className="fas fa-user-circle me-2 text-danger"></i> Mi Perfil
                                        </Link>

                                        <Link to="/profile/settings" className="dropdown-item-custom d-block p-2 text-decoration-none text-white mb-1" onClick={() => setShowDropdown(false)}>
                                            <i className="fas fa-cog me-2 text-danger"></i> Ajustes
                                        </Link>

                                        <hr className="my-2 border-secondary" />

                                        <button className="dropdown-item-custom d-block w-100 text-start p-2 bg-transparent border-0 text-white" onClick={handleLogout}>
                                            <i className="fas fa-power-off me-2 text-danger"></i> Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            
            <LoginModal
                show={showLogin}
                onClose={() => setShowLogin(false)}
                openRegister={() => { setShowLogin(false); setShowRegister(true); }}
            />
            <RegisterModal
                show={showRegister}
                onClose={() => setShowRegister(false)}
                openLogin={openLogin}
            />
        </>
    );
};