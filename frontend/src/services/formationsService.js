// Récupérer l'adresse de l'API depuis le fichier .env
const API_URL = `${import.meta.env.VITE_API_URL}/formations`;

// Fonction pour vérifier les réponses du serveur
async function verifierReponse(response) {
  if (!response.ok) {
    let message = `Erreur HTTP ${response.status}`;

    try {
      const erreur = await response.json();

      if (erreur.message) {
        message = erreur.message;
      }
    } catch {
      // La réponse n'est pas nécessairement au format JSON
    }

    throw new Error(message);
  }

  return response;
}

// GET : récupérer toutes les formations
export async function obtenirFormations() {
  const response = await fetch(API_URL);

  await verifierReponse(response);

  return response.json();
}

// POST : ajouter une formation
export async function ajouterFormation(nom) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ nom })
  });

  await verifierReponse(response);

  return response.json();
}

// DELETE : supprimer une formation
export async function supprimerFormation(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  await verifierReponse(response);

  // Le serveur retourne 204 sans contenu
  return true;
}

// PUT : modifier une formation
export async function modifierFormation(id, nom) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ nom })
  });

  await verifierReponse(response);

  return response.json();
}
