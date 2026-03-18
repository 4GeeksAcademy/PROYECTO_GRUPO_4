import React, { useState } from "react";
import { registerUser } from "../services/backendServices";
import logo from "../assets/img/Logo-png.png";
import "../styles/auth.css";

export const RegisterModal = ({ show, onClose, openLogin }) => {
   
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    
    const handleChange = (e) => {
        if (error) setError("");
        if (success) setSuccess("");

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Todos los campos son obligatorios");
            return;
        }

        
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

       
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError("La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial");
            return;
        }

        setLoading(true);

        
        const response = await registerUser({
            username: formData.username,
            email: formData.email,
            password: formData.password
        });

        if (response.error) {
            setError(response.error);
            setLoading(false);
        } else {
            setError("");
            setSuccess("¡Usuario creado correctamente! 🎉");

           
            setTimeout(() => {
                setSuccess("");
                setLoading(false);
                onClose();
                if (openLogin) openLogin(); 
            }, 2000);
        }
    };

    if (!show) return null;

    return (
        <div className="auth-overlay">
            <div className="auth-card auth-card-register shadow-lg">
                <button className="auth-close" onClick={onClose} type="button">
                    &times;
                </button>
                
                <div className="auth-top-bar"></div>
                
                <img src={logo} className="auth-logo" alt="Logo Generador WOD" />

                <div className="auth-body">
                   
                    {error && <div className="auth-error" role="alert">{error}</div>}
                    {success && <div className="auth-success" role="alert">{success}</div>}
                    
                    <h3 className="auth-title">Regístrate</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <i className="fas fa-user auth-icon"></i>
                            <input
                                type="text"
                                name="username"
                                placeholder="Nombre de usuario"
                                className="form-control auth-input"
                                onChange={handleChange}
                                value={formData.username}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <i className="fas fa-envelope auth-icon"></i>
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo Electrónico"
                                className="form-control auth-input"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <i className="fas fa-lock auth-icon"></i>
                            <input
                                type="password"
                                name="password"
                                placeholder="Crear Contraseña"
                                className="form-control auth-input"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <i className="fas fa-lock auth-icon"></i>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmar Contraseña"
                                className="form-control auth-input"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                required
                            />
                        </div>

                        <button className="btn auth-btn" type="submit" disabled={loading}>
                            {loading ? (
                                <><span className="auth-spinner"></span> Creando...</>
                            ) : (
                                "Crear Cuenta"
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-4">
                        ¿Ya tienes una cuenta? <br />
                        <span 
                            className="auth-link" 
                            onClick={openLogin} 
                            style={{cursor: 'pointer', fontWeight: 'bold'}}
                        >
                            Iniciar Sesión
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};