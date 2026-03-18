import "/src/front/index.css";
import { WorkoutCard } from "../components/WorkoutCard";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <div className="container">
      
      <header className="headerSection">
        <div style={{ display: "flex", alignItems: "top", gap: "2rem" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              background: "#333",
              borderRadius: "50%",
            }}
          >
            {
              <img
                className="img"
                src=""
              />
            }
          </div>
          <div>
            <h1>Alex "Iron" Smith</h1>
            <p>CrossFit Athlete | Coach at MadCity Box</p>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
              <span>
                <strong>1.2k</strong> Seguidores
              </span>
              <span>
                <strong>450</strong> Seguidos
              </span>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            <Link to="/" className="btn btn-dark" style={{ marginLeft: "auto", height: "35px" }}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </Link>
            <Link to="/profile/settings" className="btn btn-dark" style={{ marginLeft: "auto", height: "35px" }}>
              <i className="fa-solid fa-gear"></i>
            </Link>
          </div>
        </div>
      </header>

     
      <div className="bottomGrid">
        
        <section className="contentBox">
          <h2 className="sectionTitle">Mis WODs</h2>
          
          <div style={{border: "1px solid #333", padding: "1rem",marginBottom: "1rem",}}>
              <WorkoutCard />
          </div>
        </section>
        
        <section className="contentBox">
          <h2 className="sectionTitle">Estadísticas</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "1rem" }}>
              <span>Clean & Jerk:</span> <strong>110kg</strong>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <span>Fran Time:</span> <strong>3:25</strong>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <span>Entrenamientos este mes:</span> <strong>18</strong>
            </li>
          </ul>
        </section>{" "}
      </div>
      
      <footer className="favoritesSection">
        <h2 className="sectionTitle">WODs Favoritos</h2>
        <div className="carouselContainer">
          
          <div className="carouselCard">
            <h4>WOD Favorito 1</h4>
            <small>For Time - 20 min</small>
          </div>
          <div className="carouselCard">
            <h4>WOD Favorito 2</h4>
            <small>EMOM - 12 min</small>
          </div>
          <div className="carouselCard">
            <h4>WOD Favorito 3</h4>
            <small>AMRAP - 10 min</small>
          </div>
          <div className="carouselCard">
            <h4>WOD Favorito 4</h4>
            <small>Chipper - 30 min</small>
          </div>
        </div>
      </footer>
    </div>
  );
};
