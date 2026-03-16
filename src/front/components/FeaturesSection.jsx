export const FeaturesSection = () => {
    return (
        <section className="container py-5">
            <div className="row g-4 justify-content-center">
                <div className="col-lg-4">
                    <div className="tarjeta-feature p-4 h-100">
                        <div className="feature-icon-box mb-4"><i className="fas fa-th-list text-danger"></i></div>
                        <h4 className="font-oswald text-white">Crea tus tablas</h4>
                        <p className="text-secondary small">Organiza ejercicios y rondas de forma potente.</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="tarjeta-feature p-4 h-100">
                        <div className="feature-icon-box mb-4"><i className="fas fa-stopwatch text-danger"></i></div>
                        <h4 className="font-oswald text-white">Control del tiempo</h4>
                        <p className="text-secondary small">Ajusta la duración con presets y barras visuales.</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="tarjeta-feature p-4 h-100">
                        <div className="feature-icon-box mb-4"><i className="fas fa-dumbbell text-danger"></i></div>
                        <h4 className="font-oswald text-white">Entrena con enfoque</h4>
                        <p className="text-secondary small">Diseño limpio para que nada te distraiga del WOD.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};