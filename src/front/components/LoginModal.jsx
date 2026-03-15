import { useState } from "react";
import { loginUser } from "../services/backendServices";
import { useNavigate } from "react-router-dom";


export const LoginModal = ({ show, onClose }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await loginUser(formData);

        if (response.token) {

            localStorage.setItem("token", response.token);

            onClose();

            navigate("/generator");

        } else {

            alert("Credenciales incorrectas");

        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Iniciar Sesión</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control mb-3"
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="modal-footer">

                            <button className="btn btn-secondary" onClick={onClose}>
                                Cerrar
                            </button>

                            <button type="submit" className="btn btn-primary">
                                Entrar
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};