import { useState } from "react";
import { loginUser } from "../services/backendServices";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/Logo-png.png";
import "../styles/auth.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const LoginModal = ({ show, onClose, openRegister }) => {



    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        if (error) setError("");

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await loginUser(formData);

        if (response.token) {

            setError("");

            dispatch({
                type: "login",
                payload: response.token
            });

            onClose();

            navigate("/generator");

        } else {

            setError(response.error || "Credenciales incorrectas");

        }
    };

    if (!show) return null;

    return (

        <div className="auth-overlay">

            <div className="auth-card">
                <button className="auth-close" onClick={onClose}>
                    ×
                </button>

                <div className="auth-top-bar"></div>

                <img src={logo} className="auth-logo" />

                <div className="auth-body">

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <h3 className="auth-title">
                        Iniciar Sesión
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="auth-input-group">

                            <i className="fas fa-envelope auth-icon"></i>

                            <input
                                type="email"
                                name="email"
                                placeholder="Correo Electrónico"
                                className="form-control auth-input"
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="auth-input-group">

                            <i className="fas fa-lock auth-icon"></i>

                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                className="form-control auth-input"
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button className="btn auth-btn">
                            Ingresar
                        </button>

                    </form>

                    <p className="text-center mt-3">
                        ¿Aún no tienes una cuenta?
                        <br />
                        <span
                            className="auth-link"
                            onClick={openRegister}
                        >
                            Regístrate
                        </span>
                    </p>



                </div>

            </div>

        </div>

    );
};