import React from "react";

export function CarrousellWorkouts() {
   
    const listaWods = [
        { id: 1, usuario: "Karlos_Box", grupo: "Cuerpo Completo", tiempo: "40 min", nivel: "Duro",ejercicios: ["20 Burpees", "15 Thrusters", "10 Pull-ups"] },
        { id: 2, usuario: "Marta_Fit", grupo: "Brazos y Pecho", tiempo: "20 min", nivel: "Medio",ejercicios: ["12 Push-ups", "15 Dips", "10 Bicep Curls"] },
        { id: 3, usuario: "Iron_Admin", grupo: "Abdominales", tiempo: "15 min", nivel: "Suave",ejercicios: ["30 Plank", "20 Sit-ups", "15 Leg Raises"] },
        { id: 4, usuario: "Strong_Paco", grupo: "Piernas", tiempo: "50 min", nivel: "Muy Duro",ejercicios: ["20 Squats", "15 Lunges", "10 Deadlifts"] }
    ];

   return (
        <div className="contenedor-comunidad py-5">
            <div className="container">
                <h3 className="titulo-seccion mb-4 text-white">WODS DE LA COMUNIDAD</h3>
                
                
                <div className="caja-deslizable">
                    {listaWods.map(function(item) {
                        return (
                            <div className="tarjeta-contenedor" key={item.id}>
                                <div className="tarjeta-interna p-3 h-100 mx-2">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="texto-rojo-pequeño">{item.nivel}</span>
                                        <span className="text-secondary small">@{item.usuario}</span>
                                    </div>
                                    
                                    <h5 className="text-white mb-3 text-uppercase">{item.grupo}</h5>
                                    
                                    
                                    <div className="lista-ejercicios">
                                        {item.ejercicios.map(function(ej, index) {
                                            return (
                                                <p key={index} className="text-secondary small mb-1">
                                                    <span className="text-danger">●</span> {ej}
                                                </p>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-3 border-top border-secondary pt-2">
                                        <p className="text-white small mb-0 fw-bold">
                                            TIEMPO: {item.tiempo}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="text-secondary text-center small mt-3">
                    <i className="fas fa-arrows-left-right me-2"></i> 
                    Desliza lateralmente para ver más
                </p>
            </div>
        </div>
    );
}