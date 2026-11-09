import { useState } from "react";

function Compteur() {
  const [compteur, setCompteur] = useState(0);

  return (
    <div>
      <h1>Compteur</h1>
      <p>Valeur : {compteur}</p>
      <button onClick={() => setCompteur(compteur + 1)}>+1</button>
      <button
        onClick={() => setCompteur(0)}
        style={{ marginLeft: "10px", backgroundColor: "#c62828" }}
      >
        Réinitialiser
      </button>
    </div>
  );
}

export default Compteur;
