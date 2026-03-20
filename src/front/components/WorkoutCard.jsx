import React, { useState, useEffect } from "react";

export const WorkoutCard = ({ workout, onFavorite, isFavorited }) => {
    const [isFavorite, setIsFavorite] = useState(isFavorited || false);

    useEffect(() => {                          
        setIsFavorite(isFavorited);
    }, [isFavorited]);

    const [loading, setLoading] = useState(false);

    if (!workout) return <div className="text-white text-center">Esperando un entrenamiento....</div>

    const handleFavorite = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debes iniciar sesión para guardar favoritos");
            return;
        }

        setLoading(true);

        if (!isFavorite) {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/${workout.id}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                setIsFavorite(true);
                if (onFavorite) onFavorite(workout);
            } else {
                alert("Error al guardar favorito");
            }
        } else {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/${workout.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                setIsFavorite(false);
            } else {
                alert("Error al eliminar favorito");
            }
        }

        setLoading(false);
    };

    return (
        <div className="card wod-card mx-auto shadow-lg border-0 mb-5" style={{ maxWidth: "600px" }}>
            <div className="card-header wod-header p-4 text-center animacion-entrada">
                <h2 className="display-6 fw-bold text-white mb-1">
                    {workout.name.toUpperCase()}
                </h2>
                <div className="d-flex justify-content-center gap-3 mt-2">
                    <span className="badge bg-danger text-uppercase px-3 py-2">{workout.type}</span>
                    <span className="text-secondary fw-bold align-self-center small">
                        {workout.time} MIN
                    </span>
                </div>
            </div>

            <div className="card-body p-0">
                <div className="list-group list-group-flush">
                    {workout.exercises && workout.exercises.map((item, index) => (
                        <div key={index} className="list-group-item wod-list-item py-3 px-4 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <span className="fs-3 wod-number me-3">{index + 1}</span>
                                <h5 className="mb-0 fw-bold text-uppercase small text-white">
                                    {item.exercise.name}
                                </h5>
                            </div>
                            <div className="text-end">
                                <span className="fw-bold text-white">
                                    {item.reps} <span className="text-danger small">REPS</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card-footer bg-transparent border-top border-secondary p-3">
                <div className="d-flex justify-content-between">
                    <button
                        className={`btn btn-sm text-uppercase fw-bold px-4 ${isFavorite ? "btn-danger" : "btn-outline-light"}`}
                        onClick={handleFavorite}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : (
                            <i className={`fas fa-heart me-2 ${isFavorite ? "text-white" : ""}`}></i>
                        )}
                        {isFavorite ? "Guardado" : "Guardar WOD"}
                    </button>
                </div>
            </div>
        </div>
    );
};