import react from "react";

export const WorkoutCard = ({ data }) => {
    if (!data) return <div className="text-white text-center">Esperando un entrenamiento....</div>
    return (
        <div className="card wod-card mx-auto shadow-lg border-0 mb-5" style={{ maxWidth: "600px", }

        }>
            <div className=" card-header wod-header p-4 text-center animacion-entrada">
                <h2 className="display-6 fw-bold text-white mb-1">
                    {data.name.toUpperCase()}

                </h2>
                <div className="d-flex justify-content-center gap-3 mt-2">
                    <span className="badge bg-danger text-uppercase px-3 py-2">{data.type}</span>
                    <span className="text-secondary fw-bold align-self-center small">
                        {data.time} MIN
                    </span>

                </div>


            </div>
            <div className="card-body p-0">
                <div className="list-group list-group-flush">
                    {data.exercises && data.exercises.map ((item,index)=>(
                        <div key={index} className="list-group-item wod-list-item py-3 px-4 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <span className="fs-3 wod-number me-3">
                                    {index + 1}
                                </span>
                                <h5 className="mb-0 fw-bold text-uppercase small text-white">
                                    {item.exercise.name}
                                </h5>
                            </div>
                            <div className="text-end">
                                <span className="fw-bold text-white">
                                    {item.reps} <span className="text-danger small ">REPS</span>
                                </span>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
            <div className="card-footer bg-transparent border-top border-secondary p-3">
                <div className=" d-flex justify-content-between">
                    <button className="btn btn-sm btn-outline-light text-uppercase fw-bold px-4">
                        <i className="fas fa-heart me-2"></i>Guardar WOD

                    </button>
                </div>

            </div>

        </div>
        
    )


}