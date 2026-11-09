import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Profil() {
  const { utilisateur } = useAuth();
  const navigate = useNavigate();
  const [profil, setProfil] = useState(null);
  const [nom, setNom] = useState("");
  const [retour, setRetour] = useState("");

  useEffect(() => {
    if (!utilisateur) return;
    const charger = async () => {
      try {
        const snap = await getDoc(doc(db, "users", utilisateur.uid));
        if (snap.exists()) {
          setProfil(snap.data());
          setNom(snap.data().nom || "");
        }
      } catch (error) {
        setRetour("Erreur de lecture : " + error.message);
      }
    };
    charger();
  }, [utilisateur]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!utilisateur) return;
    if (nom.trim().length < 2) {
      setRetour("Le nom doit contenir au moins 2 caractères.");
      return;
    }
    try {
      await updateDoc(doc(db, "users", utilisateur.uid), { nom: nom.trim() });
      setProfil({ ...profil, nom: nom.trim() });
      setRetour("Nom mis à jour.");
    } catch (error) {
      setRetour("Erreur de mise à jour : " + error.message);
    }
  };

  const handleDeconnexion = async () => {
    await signOut(auth);
    navigate("/connexion");
  };

  return (
    <div>
      <h1>Mon profil</h1>
      <p>Email : {utilisateur?.email}</p>
      <p>Rôle : {profil?.role || "non défini"}</p>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nouveau nom"
        />
        <button type="submit">Mettre à jour</button>
        <p style={{ color: "red" }}>{retour}</p>
      </form>
      <button onClick={handleDeconnexion}>Se déconnecter</button>
    </div>
  );
}

export default Profil;
