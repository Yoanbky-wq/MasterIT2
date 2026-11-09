import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [retour, setRetour] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRetour("");
    try {
      await signInWithEmailAndPassword(auth, email, motDePasse);
      setRetour("Connexion réussie.");
      navigate("/profil");
    } catch (error) {
      setRetour("Erreur : " + error.message);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Mot de passe</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <button type="submit">Se connecter</button>
        <p style={{ marginTop: "10px", color: "red" }}>{retour}</p>
      </form>
    </div>
  );
}

export default Connexion;
