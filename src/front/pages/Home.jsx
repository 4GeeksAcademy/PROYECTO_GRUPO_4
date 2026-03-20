import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GeneratorView } from "../components/GeneratorView.jsx";
import { WorkoutCard } from "../components/WorkoutCard.jsx";
import { CarrousellWorkouts } from "../components/CarrousellWorkouts.jsx";
import { FeaturesSection } from "../components/FeaturesSection.jsx";


export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [showGenerator, setShowGenerator] = useState(false);
    const [workout, setWorkout] = useState(null);
    const [showCard, setShowCard] = useState(false);

    const handleGenerated = (data) => {
        console.log("WOD recibido:", data);
        setWorkout(data);
        setShowGenerator(false);
        setShowCard(true);
    };

    return (
        <div className="min-vh-100">


            <section className="container py-5 mt-5">
                <div className="row align-items-center g-5">


                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="titulo-pro mb-4 hero-title">WOD <span className="text-danger hero-title">GENERATOR</span></h1>
                        <p className="text-secondary fs-5 mb-5">Crea tus tablas de entrenamiento en segundos.</p>

                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                            <button className="custom-btn" onClick={() => setShowGenerator(true)}>
                                <i className="fas fa-dumbbell"></i>
                                Crear mi sesión
                            </button>
                            <button
                                className="btn-outline-custom"
                                onClick={() => document.getElementById('comunidad').scrollIntoView({ behavior: 'smooth' })}
                            >
                                <i className="fas fa-eye"></i>
                                Ver ejemplos
                            </button>
                        </div>
                    </div>


                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="position-relative">

                            <div style={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                width: '80%', height: '80%', background: 'rgba(220, 53, 69, 0.15)',
                                filter: 'blur(80px)', zIndex: 0
                            }}></div>

                            <video
                                autoPlay loop muted playsInline
                                className="video-bg img-fluid rounded-3 shadow-lg position-relative z-1"
                                style={{
                                    filter: 'grayscale(100%) brightness(0.8) contrast(1.2)',
                                    objectFit: 'cover', height: '450px', width: '100%'
                                }}
                            >
                                <source src="src/front/assets/videocrossfit.MP4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </section>


            <FeaturesSection />




            {showGenerator && (
                <GeneratorView
                    onGenerated={handleGenerated}
                    onClose={() => setShowGenerator(false)} />
            )}

            {showCard && workout && (
                <div className="modal-over d-flex align-items-center justify-content-center p-3" style={{ zIndex: 9999 }}>
                    <div >

                        <button className="btn-simple-close" onClick={() => setShowCard(false)}>
                            ×
                        </button>


                        <WorkoutCard workout={workout} isGenerated={true} />
                    </div>
                </div>
            )}


            <section id="comunidad" className="py-5">
                <div className="container">
                    <h2 className="titulo-seccion mb-5 text-white">WODS DE LA COMUNIDAD</h2>
                    <CarrousellWorkouts />
                </div>
            </section>



        </div>
    );
};