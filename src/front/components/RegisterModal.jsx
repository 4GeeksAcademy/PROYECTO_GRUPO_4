import { useState } from "react";
import { registerUser } from "../services/backendServices";


export const RegisterModal = ({ show, onClose }) => {

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

        const response = await registerUser(formData);

        if (response.success) {
            alert("Usuario registrado correctamente");
            onClose();
        } else {
            alert(response.message);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Registro</h5>
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
                                Registrarse
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};