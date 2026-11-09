import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Inscription() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [retour, setRetour] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRetour("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        nom: "",
        role: "user",
        creeLe: serverTimestamp()
      });
      setRetour("Compte créé avec succès. Redirection...");
      setEmail("");
      setMotDePasse("");
      navigate("/profil");
    } catch (error) {
      setRetour("Erreur : " + error.message);
    }
  };

  return (
    <div>
      <h1>Créer un compte</h1>
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
        <button type="submit">S'inscrire</button>
        <p style={{ marginTop: "10px", color: "red" }}>{retour}</p>
      </form>
    </div>
  );
}

export default Inscription;
