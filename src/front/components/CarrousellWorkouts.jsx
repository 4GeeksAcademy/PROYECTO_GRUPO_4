import React from "react";

export function CarrousellWorkouts() {
   
    const listaWods = [
        { id: 1, usuario: "Karlos_Box", grupo: "Cuerpo Completo", tiempo: "40 min", nivel: "Duro", ejercicios: ["20 Burpees", "15 Thrusters", "10 Pull-ups"] },
        { id: 2, usuario: "Marta_Fit", grupo: "Brazos y Pecho", tiempo: "20 min", nivel: "Medio", ejercicios: ["12 Push-ups", "15 Dips", "10 Bicep Curls"] },
        { id: 3, usuario: "Iron_Admin", grupo: "Abdominales", tiempo: "15 min", nivel: "Suave", ejercicios: ["30 Plank", "20 Sit-ups", "15 Leg Raises"] },
        { id: 4, usuario: "Strong_Paco", grupo: "Piernas", tiempo: "50 min", nivel: "Muy Duro", ejercicios: ["20 Squats", "15 Lunges", "10 Deadlifts"] }
    ];

   return (
        
        <div className="caja-deslizable">
            {listaWods.map(function(item) {
                return (
                    <div className="tarjeta-contenedor" key={item.id}>
                        <div className="tarjeta-interna p-3 h-100">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="texto-rojo-pequeño">{item.nivel}</span>
                                <span className="text-secondary small">@{item.usuario}</span>
                            </div>
                            
                            <h5 className="text-white mb-3 text-uppercase font-oswald">{item.grupo}</h5>
                            
                            <div className="lista-ejercicios flex-grow-1">
                                {item.ejercicios.map(function(ej, index) {
                                    return (
                                        <p key={index} className="text-secondary small mb-1">
                                            <span className="text-danger">●</span> {ej}
                                        </p>
                                    );
                                })}
                            </div>

                            <div className="mt-3 border-top border-secondary border-opacity-25 pt-2">
                                <p className="text-white small mb-0 fw-bold">
                                    TIEMPO: {item.tiempo}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}