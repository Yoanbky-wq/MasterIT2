require("../firebase");
const { getAuth } = require("firebase-admin/auth");

async function verifierAuthentification(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentification requise. Connecte-toi pour continuer."
      });
    }

    const token = authorization.slice(7);
    const decodedToken = await getAuth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Session invalide ou expirée. Reconnecte-toi."
    });
  }
}

module.exports = verifierAuthentification;
