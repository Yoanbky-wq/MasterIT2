
import { auth } from "../firebase";

// Adresse de l'API
const API_URL = `${import.meta.env.VITE_API_URL}/formations`;

// Récupérer le jeton Firebase de l'utilisateur connecté
async function obtenirHeaders(json = false) {
  const utilisateur = auth.currentUser;

  if (!utilisateur) {
    throw new Error("Tu dois être connecté pour effectuer cette opération.");
  }

  const token = await utilisateur.getIdToken();

  const headers = {
    Authorization: `Bearer ${token}`
  };

  if (json) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

// Vérifier les réponses du serveur
async function verifierReponse(response) {
  if (!response.ok) {
    let message = `Erreur HTTP ${response.status}`;

    try {
      const erreur = await response.json();

      if (erreur.message) {
        message = erreur.message;
      }
    } catch {
      // Réponse non JSON
    }

    throw new Error(message);
  }

  return response;
}

// GET : récupérer toutes les formations
export async function obtenirFormations() {
  const headers = await obtenirHeaders();

  const response = await fetch(API_URL, {
    headers
  });

  await verifierReponse(response);

  return response.json();
}

// POST : ajouter une formation
export async function ajouterFormation(nom) {
  const headers = await obtenirHeaders(true);

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ nom })
  });

  await verifierReponse(response);

  return response.json();
}

// DELETE : supprimer une formation
export async function supprimerFormation(id) {
  const headers = await obtenirHeaders();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers
  });

  await verifierReponse(response);

  return true;
}

// PUT : modifier une formation
export async function modifierFormation(id, nom) {
  const headers = await obtenirHeaders(true);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ nom })
  });

  await verifierReponse(response);

  return response.json();
}
