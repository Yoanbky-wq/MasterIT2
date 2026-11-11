require("dotenv").config();
const verifierAuthentification = require("./middleware/auth");
const express = require("express");
const cors = require("cors");
const formationsRoutes = require("./routes/formations");

const app = express();
const PORT = process.env.PORT || 3000;
// CONFIGURATION CORS
app.use(cors({
  origin: "http://localhost:5174"
}));

// MIDDLEWARE JSON
app.use(express.json());

// ROUTE D'ACCUEIL
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Master IT opérationnelle"
  });
});

// ROUTES DES FORMATIONS
app.use("/api/formations", verifierAuthentification, formationsRoutes);

// ROUTES INEXISTANTES
app.use((req, res) => {
  res.status(404).json({
    message: "Route introuvable sur l'API Master IT"
  });
});

// DEMARRAGE DU SERVEUR
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
