import React,{useState,useEffect} from "react";
import {getMuscles,getEquipment,generateWokrout} from "src/front/services/backendServices.js";
import { useNavigate} from "react-router-dom";



export const GeneratorView = ({onGenerated,onClose})=>{
    const navigate = useNavigate();

    const [muscles,setMuscles]=useState([]);
    const [equipment,setEquipment] = useState([]);

    const [selection,setSelection]= useState ({
        muscle_id:"",
        max_time:20,
        equipment_ids: []
    });
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const loadData = async () => {
            const m = await getMuscles();
            const e = await getEquipment ();
            setMuscles(m);
            setEquipment (e);

        };
        loadData();
    },[]);

    const handleChange= (id) => {
        const current = selection.equipment_ids;
        const updated = current.includes(id)
        ? current.filter(item => item !== id)
        : [...current,id];
        setSelection ({...selection,equipment_ids:updated});
    };
    const handleSubmit = async (e)=> {
        
        e.preventDefault();
        const token= localStorage.getItem("token");
        if (!token) {
            alert("¡Atención! Debes estar registrado para generar un entrenamiento.");
            navigate("/login");
            return;
        }


        setLoading(true);
        const result = await generateWokrout(selection);
        if (result){
            onGenerated(result);

        }
        setLoading(false);
    };

   return (
        <div className="modal-overlay d-flex align-items-center justify-content-center">
            <div className="generator-container p-4 rounded text-white w-100 mx-3">
                <form className="container" onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4 fw-bold font-oswald">
                        WOD <span className="text-danger">GENERATOR</span>
                    </h2>

                    <label className="form-label small fw-bold text-secondary text-uppercase">Grupo Muscular Target</label>
                    <select 
                        className="form-select mb-3 form-select-custom"
                        required
                        onChange={(e) => setSelection({ ...selection, muscle_id: e.target.value })}
                    >
                        <option value="">Selecciona objetivo...</option>
                        {muscles.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>

                    <label className="form-label small fw-bold text-secondary text-uppercase">Equipamiento Disponible</label>
                    <div className="row w-100 mx-auto mb-3 g-2">
                        {equipment && equipment.map(eq => (
                            <div className="form-check col-6" key={eq.id}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id={`check-${eq.id}`}
                                    onChange={() => handleChange(eq.id)}
                                />
                                <label className="form-check-label small" htmlFor={`check-${eq.id}`}>
                                    {eq.name}
                                </label>
                            </div>
                        ))}
                    </div>

                    <label htmlFor="range2"
                     className="form-label small fw-bold text-secondary text-uppercase">
                        TIEMPO: <span className="text-danger">{selection.max_time} MIN</span>
                    </label>
                    <input 
                        type="range" 
                        className="form-range mb-4 custom-range" 
                        min="10" max="60" step="5"
                        id="range2"
                        value={selection.max_time}
                        onChange={(e) => setSelection({ ...selection, max_time: e.target.value })}
                    />

                    <div className="d-flex gap-2">
                        <button type="button" 
                        className="btn btn-outline-secondary w-50 fw-bold" 
                        onClick={onClose}>
                            CANCELAR
                        </button>
                        <button type="submit" 
                        className="btn btn-danger w-50 fw-bold" 
                        disabled={loading}>
                            {loading ? "..." : "GENERAR"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};