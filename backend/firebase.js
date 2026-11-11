
const {
  initializeApp,
  cert,
  getApps
} = require("firebase-admin/app");

const { getFirestore } = require("firebase-admin/firestore");

if (getApps().length === 0) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccountJson) {
    throw new Error(
      "La variable FIREBASE_SERVICE_ACCOUNT est absente."
    );
  }

  let serviceAccount;

  try {
    serviceAccount = JSON.parse(serviceAccountJson);
  } catch (error) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT n'est pas un JSON valide."
    );
  }

  if (!serviceAccount.project_id || !serviceAccount.private_key) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT est incomplet."
    );
  }

  initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id
  });
}

const db = getFirestore();

module.exports = { db };
