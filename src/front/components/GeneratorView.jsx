import React, { useState, useEffect } from "react";
import { getMuscles, getEquipment, generateWorkout } from "../services/backendServices.js";
import { useNavigate } from "react-router-dom";

export const GeneratorView = ({ onGenerated, onClose }) => {
    const navigate = useNavigate();
    const [muscles, setMuscles] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [selection, setSelection] = useState({
        muscle_id: "",
        max_time: 20,
        equipment_ids: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const m = await getMuscles();
            const e = await getEquipment();
            setMuscles(m || []);
            setEquipment(e || []);
        };
        loadData();
    }, []);

    const handleChange = (id) => {
        const current = selection.equipment_ids;
        const updated = current.includes(id)
            ? current.filter(item => item !== id)
            : [...current, id];
        setSelection({ ...selection, equipment_ids: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("¡Atención! Debes estar registrado para generar un entrenamiento.");
            return;
        }
        setLoading(true);
        const result = await generateWorkout(selection);
        if (result) onGenerated(result);
        setLoading(false);
    };

    return (
        <div className="modal-over d-flex align-items-center justify-content-center p-3">
            {/* Contenedor con efecto Cristal y borde superior rojo */}
            <div className="tarjeta-interna p-4 p-md-5 w-100 shadow-lg" style={{ maxWidth: "850px", borderTop: "4px solid #dc3545" }}>
                <form onSubmit={handleSubmit}>
                    
                    <div className="text-center mb-5">
                        <h2 className="font-oswald display-6 mb-0">CONFIGURA TU <span style={{ color: "#dc3545" }}>SESIÓN</span></h2>
                        <p className="text-secondary small text-uppercase fw-bold mt-2">Ajusta los parámetros para tu WOD</p>
                    </div>

                    <div className="row g-4">
                        {/* COLUMNA 1: OBJETIVO Y TIEMPO */}
                        <div className="col-md-6 border-end border-secondary border-opacity-25 pe-md-4">
                            <label className="form-label font-oswald text-secondary small mb-3">GRUPO MUSCULAR TARGET</label>
                            <select 
                                className="form-select bg-black text-white border-secondary p-3 mb-4 shadow-none"
                                required
                                onChange={(e) => setSelection({ ...selection, muscle_id: e.target.value })}
                                style={{ borderRadius: "8px" }}
                            >
                                <option value="">Selecciona objetivo...</option>
                                {muscles.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>

                            <label className="form-label font-oswald text-secondary small mb-3 d-flex justify-content-between">
                                TIEMPO MÁXIMO 
                                <span style={{ color: "#dc3545" }}>{selection.max_time} MIN</span>
                            </label>
                            <input 
                                type="range" 
                                className="form-range custom-range" 
                                min="10" max="60" step="5"
                                value={selection.max_time}
                                onChange={(e) => setSelection({ ...selection, max_time: e.target.value })}
                            />
                            <div className="d-flex justify-content-between text-secondary mt-1 small font-oswald">
                                <span>10 MIN</span>
                                <span>60 MIN</span>
                            </div>
                        </div>

                        {/* COLUMNA 2: EQUIPAMIENTO */}
                        <div className="col-md-6 ps-md-4">
                            <label className="form-label font-oswald text-secondary small mb-3">MATERIAL DISPONIBLE</label>
                            <div className="p-3 border border-secondary rounded bg-black bg-opacity-40" style={{ maxHeight: "185px", overflowY: "auto" }}>
                                <div className="row g-2">
                                    {equipment.map(eq => (
                                        <div className="col-6" key={eq.id}>
                                            <div className="form-check custom-checkbox">
                                                <input 
                                                    className="form-check-input shadow-none" 
                                                    type="checkbox" 
                                                    id={`check-${eq.id}`}
                                                    onChange={() => handleChange(eq.id)}
                                                />
                                                <label className="form-check-label small text-uppercase" htmlFor={`check-${eq.id}`} style={{ cursor: "pointer" }}>
                                                    {eq.name}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="d-flex flex-column flex-md-row gap-3 mt-5">
                        <button type="button" className="btn-outline-custom w-100 py-3 order-2 order-md-1" onClick={onClose}>
                            VOLVER
                        </button>
                        <button type="submit" className="custom-btn w-100 py-3 order-1 order-md-2" disabled={loading}>
                            {loading ? <span className="spinner-border spinner-border-sm"></span> : "GENERAR ENTRENAMIENTO"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};