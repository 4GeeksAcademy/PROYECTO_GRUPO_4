import React from "react";
import { useEffect } from "react";

export function Aboutus() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-vh-100 py-5 mt-5">
            <div className="container text-white mt-4">
                
                
                <div className="text-center mb-5 pb-3">
                    <h1 className="titulo-pro display-3 fw-bold">NUESTRO <span className="text-danger">EQUIPO</span></h1>
                    <div className="divider-glow mx-auto" style={{ width: '150px' }}></div>
                </div>

                <div className="row justify-content-center g-4">
                    
                    
                    

                   
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="team-card p-4 text-center h-100">
                            <div className="team-img-wrapper mb-4 mx-auto">
                                <img 
                                    src="https://avatars.githubusercontent.com/u/211037302?v=4" 
                                    alt="Pablo Aristizabal"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="card-body">
                                <h4 className="font-oswald text-uppercase text-white mb-2">Pablo Aristizabal</h4>
                                <h6 className="text-danger mb-3 fw-bold extra-small">Full Stack Developer</h6>
                                <p className="small text-secondary lh-lg opacity-75">
                                    Responsable de la base de datos y la lógica de Python.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="team-card p-4 text-center h-100">
                            <div className="team-img-wrapper mb-4 mx-auto">
                                <img 
                                    src="https://avatars.githubusercontent.com/u/234033046?v=4" 
                                    alt="Marco Cebrian"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="card-body">
                                <h4 className="font-oswald text-uppercase text-white mb-2">Marco Cebrian</h4>
                                <h6 className="text-danger mb-3 fw-bold extra-small">Full Stack Developer</h6>
                                <p className="small text-secondary lh-lg opacity-75">
                                    Encargado de la parte técnica y el diseño de la aplicación.
                                </p>
                            </div>
                        </div>
                    </div>

                    
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="team-card p-4 text-center h-100">
                            <div className="team-img-wrapper mb-4 mx-auto">
                                <img 
                                    src="https://media.licdn.com/dms/image/v2/D5603AQHKomwxxWPhew/profile-displayphoto-scale_100_100/B56ZkbKP5RHkAo-/0/1757097296086?e=1775692800&v=beta&t=KTybIFVT1pIr2sSglROY7T3W3bFK2WZO9VTa14gblX4" 
                                    alt="Manuel Francisco"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="card-body">
                                <h4 className="font-oswald text-uppercase text-white mb-2">Manuel Francisco</h4>
                                <h6 className="text-danger mb-3 fw-bold extra-small">Full Stack Developer</h6>
                                <p className="small text-secondary lh-lg opacity-75">
                                    Especialista en estilos y componentes de React.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};