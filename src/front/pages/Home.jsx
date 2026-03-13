import React, { useEffect,useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GeneratorView } from "../components/GeneratorView.jsx";
import { WorkoutCard } from "../components/WorkoutCard.jsx";
import { CarrousellWorkouts } from "../components/CarrousellWorkouts.jsx";



export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [showGenerator,setShowGenerator]= useState(false);
	const [workout,setWorkout]= useState(null);
	const [showCard,setShowCard]= useState(false);
	const handleGenerated = (data)=>{
		setWorkout(data);
		setShowGenerator(false);
		setShowCard(true);
	};

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="bg-black min-vh-100 text-center pt-5">
            {/* CABECERA PRINCIPAL */}
            <h1 className="text-white display-2 fw-bold mb-4 font-oswald">
                WOD <span className="text-danger">GENERATOR</span>
            </h1>
            <p className="text-secondary mb-5">PREPÁRATE PARA EL ENTRENO</p>

            
            {!showCard && (
                <button 
                    className="btn btn-danger btn-lg px-5 py-3 fw-bold animacion-entrada"
                    onClick={() => setShowGenerator(true)}
                >
                    + NUEVO ENTRENAMIENTO
                </button>
            )}

            
            {showGenerator && (
                <GeneratorView 
                    onGenerated={handleGenerated} 
                    onClose={() => setShowGenerator(false)} 
                />
            )}

           
            {showCard && workout && (
                <div className="modal-over d-flex align-items-center justify-content-center p-3">
                    <div className="position-relative w-100" style={{ maxWidth: "600px" }}>
                        
                        
                        <button 
                            className="btn btn-outline-danger position-absolute top-0 end-0 m-3 z-3 border-0 fs-4"
                            onClick={() => setShowCard(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        
                        <WorkoutCard data={workout} />
                        
                    </div>
                </div>
            )}
            <div>
                 <CarrousellWorkouts/>
            </div>
            
        </div>
    );
}; 