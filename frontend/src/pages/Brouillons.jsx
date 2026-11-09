import { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthProvider";

function Brouillons() {
  const { utilisateur } = useAuth();
  const [brouillons, setBrouillons] = useState([]);
  const [erreur, setErreur] = useState("");

  const charger = async () => {
    if (!utilisateur) return;
    try {
      const q = query(collection(db, "brouillons"), where("uid", "==", utilisateur.uid));
      const snap = await getDocs(q);
      const liste = [];
      snap.forEach((d) => liste.push({ id: d.id, ...d.data() }));
      setBrouillons(liste);
      setErreur("");
    } catch (error) {
      setErreur("Erreur de lecture : " + error.message);
    }
  };

  useEffect(() => {
    charger();
  }, [utilisateur]);

  const ajouter = async () => {
    if (!utilisateur) return;
    try {
      await addDoc(collection(db, "brouillons"), {
        uid: utilisateur.uid,
        titre: "Nouveau brouillon",
        creeLe: new Date()
      });
      await charger();
    } catch (error) {
      setErreur("Erreur d'ajout : " + error.message);
    }
  };

  const supprimer = async (id) => {
    try {
      await deleteDoc(doc(db, "brouillons", id));
      setBrouillons(brouillons.filter((b) => b.id !== id));
      setErreur("");
    } catch (error) {
      setErreur("Erreur de suppression : " + error.message);
    }
  };

  return (
    <div>
      <h1>Mes brouillons</h1>
      <button onClick={ajouter}>Ajouter un brouillon</button>
      <p style={{ color: "red" }}>{erreur}</p>
      <ul>
        {brouillons.map((b) => (
          <li key={b.id}>
            {b.titre}{" "}
            <button onClick={() => supprimer(b.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Brouillons;
