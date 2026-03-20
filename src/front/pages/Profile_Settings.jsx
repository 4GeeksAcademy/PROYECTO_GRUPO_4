import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "/src/front/profile_styles.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Profile_Settings = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        height: "",
        weight: "",
        main_exercise: "",
        clean_and_jerk: "",
        snatch: "",
        deadlift: "",
        back_squat: "",
        fran_time: "",
        murph_time: "",
        current_password: "",
        new_password: "",
        confirm_password: ""

    });
    const [image, setImage] = useState("https://images.icon-icons.com/3868/PNG/512/profile_circle_icon_242774.png");

    // 👈 Carga los datos actuales del usuario al abrir la página
    useEffect(() => {
        if (store.user) {
            setFormData({
                username: store.user.username || "",
                bio: store.user.bio || "",
                height: store.user.height || "",
                weight: store.user.weight || "",
                main_exercise: store.user.main_exercise || "",
                clean_and_jerk: store.user.clean_and_jerk || "",
                snatch: store.user.snatch || "",
                deadlift: store.user.deadlift || "",
                back_squat: store.user.back_squat || "",
                fran_time: store.user.fran_time || "",
                murph_time: store.user.murph_time || ""
            });
            if (store.user.profile_picture) setImage(store.user.profile_picture);
        }
    }, [store.user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };
    const toNumberOrNull = (value) => value === "" ? null : Number(value);
    const toStringOrNull = (value) => value === "" ? null : value;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(import.meta.env.VITE_BACKEND_URL)
        const token = localStorage.getItem("token");
        const userId = store.user?.id || JSON.parse(localStorage.getItem("user"))?.id;

        console.log("userId:", userId);
        console.log("token:", token);

        if (!userId || !token) {
            alert("No hay sesión activa");
            return;
        }

        if (formData.new_password) {
            if (formData.new_password !== formData.confirm_password) {
                alert("Las contraseñas no coinciden");
                return;
            }
        }

        const dataToSend = {
            username: formData.username,
            bio: formData.bio,
            profile_picture: image,
            current_password: formData.current_password,
            new_password: formData.new_password,

            height: toNumberOrNull(formData.height),
            weight: toNumberOrNull(formData.weight),
            clean_and_jerk: toNumberOrNull(formData.clean_and_jerk),
            snatch: toNumberOrNull(formData.snatch),
            deadlift: toNumberOrNull(formData.deadlift),
            back_squat: toNumberOrNull(formData.back_squat),

            main_exercise: toStringOrNull(formData.main_exercise),
            fran_time: toStringOrNull(formData.fran_time),
            murph_time: toStringOrNull(formData.murph_time)
        };

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            const updatedUser = await response.json();
            dispatch({ type: "login", payload: { token, user: updatedUser } });
            localStorage.setItem("user", JSON.stringify(updatedUser));
            navigate(`/profile/${userId}`);
        } else {
            alert("Error al guardar los cambios");
        }
    };

    return (
        <div className="settingsWrapper gap-5">
            <div className="singleCard">
                <h2 className="title">Información Personal</h2>
                <div className="avatarSection">
                    <div className="avatarContainer">
                        <img src={image} alt="Foto de Perfil" />
                    </div>
                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                    <button className="btn btn-outline-danger btn-sm mt-2" onClick={() => fileInputRef.current.click()}>
                        <i className="fa-solid fa-camera me-2"></i> Cambiar Foto
                    </button>
                </div>


                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Usuario</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Tu nombre de usuario" />
                    </div>
                    <div className="inputGroup">
                        <label>Biografía</label>
                        <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Algo sobre tus entrenamientos..."></textarea>
                    </div>
                    <hr className="divider" />
                    <div className="inputGroup">
                        <label>Contraseña actual</label>
                        <input type="password" name="current_password" value={formData.current_password} onChange={handleChange} placeholder="••••••••" />
                    </div>
                    <div className="inputGroup">
                        <label>Nueva contraseña</label>
                        <input type="password" name="new_password" value={formData.new_password} onChange={handleChange} placeholder="••••••••" />
                    </div>
                    <div className="inputGroup">
                        <label>Confirmar nueva contraseña</label>
                        <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="••••••••" />
                    </div>
                    <hr className="divider" />
                    <button type="submit" className="saveBtn">Guardar Cambios</button>
                </form>

            </div>

            <div className="singleCard">
                <h2 className="title">Estadísticas</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Clean & Jerk (kg)</label>
                        <input type="number" name="clean_and_jerk" value={formData.clean_and_jerk} onChange={handleChange} placeholder="100" />
                    </div>
                    <div className="inputGroup">
                        <label>Snatch (kg)</label>
                        <input type="number" name="snatch" value={formData.snatch} onChange={handleChange} placeholder="80" />
                    </div>
                    <div className="inputGroup">
                        <label>Deadlift (kg)</label>
                        <input type="number" name="deadlift" value={formData.deadlift} onChange={handleChange} placeholder="180" />
                    </div>
                    <div className="inputGroup">
                        <label>Back Squat (kg)</label>
                        <input type="number" name="back_squat" value={formData.back_squat} onChange={handleChange} placeholder="140" />
                    </div>
                    <div className="inputGroup">
                        <label>Fran Time (mm:ss)</label>
                        <input type="text" name="fran_time" value={formData.fran_time} onChange={handleChange} placeholder="3:25" />
                    </div>
                    <div className="inputGroup">
                        <label>Murph Time (mm:ss)</label>
                        <input type="text" name="murph_time" value={formData.murph_time} onChange={handleChange} placeholder="45:00" />
                    </div>
                    <button type="submit" className="saveBtn">Guardar Estadísticas</button>
                </form>
            </div>

            <div className="singleCard">
                <h2 className="title">Datos de Atleta</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Altura (cm)</label>
                        <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="180" />
                    </div>
                    <div className="inputGroup">
                        <label>Peso (kg)</label>
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="85" />
                    </div>
                    <div className="inputGroup">
                        <label>Ejercicio principal</label>
                        <select className="form-select" name="main_exercise" value={formData.main_exercise} onChange={handleChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="Clean">Clean</option>
                            <option value="Snatch">Snatch</option>
                            <option value="Deadlift">Deadlift</option>
                        </select>
                    </div>
                    <button type="submit" className="saveBtn">Actualizar Atleta</button>
                </form>
            </div>
        </div>
    );
};