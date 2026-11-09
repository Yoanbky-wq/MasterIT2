import { useEffect, useState } from "react";

import CourseCard from "../components/CourseCard";

import {
  obtenirFormations,
  ajouterFormation,
  supprimerFormation,
  modifierFormation
} from "../services/formationsService";

function Formations() {

  const [formations, setFormations] = useState([]);

  const [nom, setNom] = useState("");

  const [chargement, setChargement] = useState(true);

  const [erreur, setErreur] = useState("");

  const [envoi, setEnvoi] = useState(false);

  const [idEnSuppression, setIdEnSuppression] = useState(null);

  const [idEnModification, setIdEnModification] = useState(null);

  const [nouveauNom, setNouveauNom] = useState("");

  // Charger les formations au montage du composant
  useEffect(() => {

    async function chargerFormations() {

      try {

        setErreur("");

        const donnees = await obtenirFormations();

        setFormations(donnees);

      } catch (err) {

        setErreur(err.message);

      } finally {

        setChargement(false);

      }

    }

    chargerFormations();

  }, []);

  // Ajouter une formation
  async function handleAjouter(e) {

    e.preventDefault();

    const nomNettoye = nom.trim();

    if (nomNettoye.length < 2) {

      setErreur("Le nom doit contenir au moins 2 caractères.");

      return;

    }

    try {

      setEnvoi(true);

      setErreur("");

      const nouvelle = await ajouterFormation(nomNettoye);

      setFormations((actuelles) => [
        ...actuelles,
        nouvelle
      ]);

      setNom("");

    } catch (err) {

      setErreur(err.message);

    } finally {

      setEnvoi(false);

    }

  }

  // Supprimer une formation
  async function handleSupprimer(id) {

    try {

      setIdEnSuppression(id);

      setErreur("");

      await supprimerFormation(id);

      setFormations((actuelles) =>
        actuelles.filter(
          (formation) => formation.id !== id
        )
      );

    } catch (err) {

      setErreur(err.message);

    } finally {

      setIdEnSuppression(null);

    }

  }

  // Modifier une formation
  async function handleModifier(id) {

    const nomNettoye = nouveauNom.trim();

    if (nomNettoye.length < 2) {

      setErreur("Le nom doit contenir au moins 2 caractères.");

      return;

    }

    try {

      setIdEnModification(id);

      setErreur("");

      const formationModifiee = await modifierFormation(
        id,
        nomNettoye
      );

      setFormations((actuelles) =>
        actuelles.map((formation) =>
          formation.id === id
            ? formationModifiee
            : formation
        )
      );

      setNouveauNom("");

    } catch (err) {

      setErreur(err.message);

    } finally {

      setIdEnModification(null);

    }

  }

  // Afficher le chargement
  if (chargement) {

    return <p>Chargement des formations...</p>;

  }

  return (

    <main>

      <h1>Nos formations</h1>

      {erreur && (

        <p role="alert">
          {erreur}
        </p>

      )}

      {/* Formulaire d'ajout */}

      <form onSubmit={handleAjouter}>

        <label htmlFor="nomFormation">
          Nom de la formation
        </label>

        <input
          id="nomFormation"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Ex. Réseaux avancés"
        />

        <button type="submit" disabled={envoi}>

          {envoi ? "Ajout..." : "Ajouter"}

        </button>

      </form>

      {/* Formulaire de modification */}

      <div>

        <h2>Modifier une formation</h2>

        <input
          type="text"
          value={nouveauNom}
          onChange={(e) => setNouveauNom(e.target.value)}
          placeholder="Nouveau nom de formation"
        />

        <select
          value={idEnModification ?? ""}
          onChange={(e) => {
            setIdEnModification(
              e.target.value ? Number(e.target.value) : null
            );
          }}
        >

          <option value="">
            Choisir une formation
          </option>

          {formations.map((formation) => (

            <option
              key={formation.id}
              value={formation.id}
            >
              {formation.nom}
            </option>

          ))}

        </select>

        <button
          type="button"
          disabled={idEnModification === null}
          onClick={() => handleModifier(idEnModification)}
        >
          Modifier
        </button>

      </div>

      {/* Affichage des formations */}

      {formations.length === 0 ? (

        <p>Aucune formation disponible.</p>

      ) : (

        <section>

          {formations.map((formation) => (

            <CourseCard
              key={formation.id}
              formation={formation}
              onSupprimer={handleSupprimer}
              suppressionEnCours={
                idEnSuppression === formation.id
              }
            />

          ))}

        </section>

      )}

    </main>

  );

}

export default Formations;
