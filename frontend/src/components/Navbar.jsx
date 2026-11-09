import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const { utilisateur } = useAuth();
  return (
    <nav style={{ backgroundColor: "#1a237e", padding: "15px", marginBottom: "20px" }}>
      <ul style={{ listStyle: "none", display: "flex", justifyContent: "center", gap: "20px", margin: 0 }}>
        <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Accueil</Link></li>
        <li><Link to="/formations" style={{ color: "white", textDecoration: "none" }}>Formations</Link></li>
        <li><Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link></li>
        {utilisateur ? (
          <li><Link to="/profil" style={{ color: "white", textDecoration: "none" }}>Profil</Link></li>
        ) : (
          <>
            <li><Link to="/inscription" style={{ color: "white", textDecoration: "none" }}>Inscription</Link></li>
            <li><Link to="/connexion" style={{ color: "white", textDecoration: "none" }}>Connexion</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
