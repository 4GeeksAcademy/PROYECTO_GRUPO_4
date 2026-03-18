import { useState } from "react";
import { registerUser } from "../services/backendServices";
import logo from "../assets/img/Logo-png.png";
import "../styles/auth.css";

export const RegisterModal = ({ show, onClose, openLogin }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("")
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
        setError("")

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
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
            email: formData.email,
            password: formData.password
        });

        if (response.error) {

            setError(response.error);
            setLoading(false);

        } else {

            setError("");
            setSuccess("Usuario creado correctamente 🎉");

            setTimeout(() => {
                setSuccess("");
                setLoading(false);
                onClose();
                openLogin();
            }, 2000);

        }
    };

    if (!show) return null;

    return (

        <div className="auth-overlay">

            <div className="auth-card auth-card-register">

                <button className="auth-close" onClick={onClose}>
                    ×
                </button>

                <div className="auth-top-bar"></div>

                <img src={logo} className="auth-logo" />

                <div className="auth-body">
                    {error && (
                        <div className="auth-error" role="alert">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-success" role="alert">
                            {success}
                        </div>
                    )}
                    <h3 className="auth-title">
                        Regístrate
                    </h3>



                    <form onSubmit={handleSubmit}>

                        <div className="auth-input-group">

                            <i className="fas fa-user auth-icon"></i>

                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre Completo"
                                className="form-control auth-input"
                                onChange={handleChange}
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
                                required
                            />

                        </div>

                        <button className="btn auth-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="auth-spinner"></span> Creando...
                                </>
                            ) : (
                                "Crear Cuenta"
                            )}
                        </button>

                    </form>

                    <p className="text-center mt-3">

                        ¿Ya tienes una cuenta?
                        <br />

                        <span
                            className="auth-link"
                            onClick={openLogin}
                        >
                            Iniciar Sesión
                        </span>

                    </p>



                </div>

            </div>

        </div>

    );
};