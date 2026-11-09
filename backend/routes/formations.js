const express = require("express");
const router = express.Router();

let formations = [
  { id: 1, nom: "Administration réseau" },
  { id: 2, nom: "Développement Web" },
  { id: 3, nom: "Cybersécurité" },
  { id: 4, nom: "Maintenance informatique" }
];

// GET : récupérer toutes les formations
router.get("/", (req, res) => {
  res.status(200).json(formations);
});

// GET : récupérer une formation par son identifiant
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const formation = formations.find((item) => item.id === id);

  if (!formation) {
    return res.status(404).json({ message: "Formation introuvable" });
  }

  res.status(200).json(formation);
});

// POST : ajouter une formation
router.post("/", (req, res) => {
  const nom = req.body.nom?.trim();

  if (!nom || nom.length < 2) {
    return res.status(400).json({
      message: "Le nom doit contenir au moins 2 caractères"
    });
  }

  const nouvelleFormation = {
    id: Date.now(),
    nom: nom
  };

  formations.push(nouvelleFormation);
  res.status(201).json(nouvelleFormation);
});

// PUT : modifier une formation (acquis du Module 5 conservé)
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const formation = formations.find((item) => item.id === id);
  const nom = req.body.nom?.trim();

  if (!formation) {
    return res.status(404).json({ message: "Formation introuvable" });
  }

  if (!nom || nom.length < 2) {
    return res.status(400).json({
      message: "Le nom doit contenir au moins 2 caractères"
    });
  }

  formation.nom = nom;
  res.status(200).json(formation);
});

// DELETE : supprimer une formation
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = formations.findIndex((item) => item.id === id);

  if (!Number.isInteger(id) || index === -1) {
    return res.status(404).json({ message: "Formation introuvable" });
  }

  formations.splice(index, 1);
  res.status(204).send();
});



module.exports = router;
