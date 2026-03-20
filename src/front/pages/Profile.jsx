import "/src/front/index.css";
import { WorkoutCard } from "../components/WorkoutCard";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => navigate("/"));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${id}/workouts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => console.error("Error cargando workouts:", err));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.error("Error cargando favoritos:", err));

  }, [id]);

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="container">

      <header className="headerSection">
        <div style={{ display: "flex", alignItems: "top", gap: "2rem" }}>
          <div style={{ width: "120px", height: "120px", background: "#333", borderRadius: "50%", overflow: "hidden" }}>
            <img className="img" src={user.profile_picture || `https://ui-avatars.com/api/?name=${user.username || user.email}&size=120&background=333&color=fff`} alt="Profile Picture" />
          </div>
          <div>
            <h1>{user.username || user.email}</h1>
            <p>{user.bio || "Sin bio todavía "}</p>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
              <span><strong>1.2k</strong> Seguidores</span>
              <span><strong>450</strong> Seguidos</span>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
          </div>
        </div>
      </header>


      <div className="bottomGrid">


        <section className="contentBox">
          <h2 className="sectionTitle">Mis WODs</h2>
          {workouts.length === 0 ? (
            <p className="text-secondary">Aún no tienes WODs generados.</p>
          ) : (
            workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          )}
        </section>

        <section className="contentBox">
          <h2 className="sectionTitle">Estadísticas</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              { label: "Clean & Jerk", value: user.clean_and_jerk, unit: "kg" },
              { label: "Snatch", value: user.snatch, unit: "kg" },
              { label: "Deadlift", value: user.deadlift, unit: "kg" },
              { label: "Back Squat", value: user.back_squat, unit: "kg" },
              { label: "Fran Time", value: user.fran_time, unit: "" },
              { label: "Murph Time", value: user.murph_time, unit: "" },
            ].map(stat => (
              <li key={stat.label} style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#888" }}>{stat.label}</span>
                <strong style={{ color: stat.value ? "white" : "#444" }}>
                  {stat.value ? `${stat.value} ${stat.unit}` : "—"}
                </strong>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="favoritesSection">
        <h2 className="sectionTitle">WODs Favoritos</h2>
        <div className="carouselContainer">
          {favorites.length === 0 ? (
            <p className="text-secondary">Aún no tienes WODs favoritos.</p>
          ) : (
            favorites.map(fav => (
              <div className="carouselCard" key={fav.favorite_id}>
                <div className="carouselCardTop">
                  <span>{fav.workout.type}</span>
                </div>
                <div className="carouselCardBody">
                  <h4>{fav.workout.name}</h4>
                  <small>{fav.workout.time} min</small>
                </div>
              </div>
            ))
          )}
        </div>
      </footer>
    </div>
  );
};
