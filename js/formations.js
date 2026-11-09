const formations = [
  { id: 1, titre: "Administration réseau", description: "Gérer et sécuriser des infrastructures réseau." },
  { id: 2, titre: "Développement Web", description: "Maîtriser HTML, CSS, JS et frameworks." },
  { id: 3, titre: "Cybersécurité", description: "Protéger les systèmes contre les menaces." },
  { id: 4, titre: "Maintenance informatique", description: "Assurer le bon fonctionnement des systèmes." }
];

const liste = document.querySelector("#liste-formations");
const recherche = document.querySelector("#recherche-formation");

function afficherFormations(tableau) {
  liste.innerHTML = "";

  function afficherFormations(tableau) {
  liste.innerHTML = "";

  if (tableau.length === 0) {
    const message = document.createElement("p");
    message.className = "text-center text-muted mt-3";
    message.textContent = "Aucune formation trouvée.";
    liste.appendChild(message);
    return;
  }

  tableau.forEach((f) => {
    const carte = document.createElement("div");
    carte.className = "col-md-6 col-lg-3 mb-4";

    const corps = document.createElement("div");
    corps.className = "card h-100 formation-card";

    const body = document.createElement("div");
    body.className = "card-body";

    const titre = document.createElement("h5");
    titre.className = "card-title";
    titre.textContent = f.titre;

    const description = document.createElement("p");
    description.className = "card-text";
    description.textContent = f.description;

    const bouton = document.createElement("button");
    bouton.className = "btn btn-primary btn-voir-plus";
    bouton.dataset.id = f.id;
    bouton.textContent = "Voir plus";
    bouton.addEventListener("click", () => {
      const formation = formations.find((item) => item.id === f.id);
      if (formation) {
        alert(formation.titre + " : " + formation.description);
      }
    });

    body.appendChild(titre);
    body.appendChild(description);
    body.appendChild(bouton);
    corps.appendChild(body);
    carte.appendChild(corps);
    liste.appendChild(carte);
  });
}


  if (tableau.length === 0) {
    const message = document.createElement("p");
    message.className = "text-center text-muted mt-3";
    message.textContent = "Aucune formation trouvée.";
    liste.appendChild(message);
    return;
  }

  tableau.forEach((f) => {
    const carte = document.createElement("div");
    carte.className = "col-md-6 col-lg-3 mb-4";

    const corps = document.createElement("div");
    corps.className = "card h-100 formation-card";

    const body = document.createElement("div");
    body.className = "card-body";

    const titre = document.createElement("h5");
    titre.className = "card-title";
    titre.textContent = f.titre;

    const description = document.createElement("p");
    description.className = "card-text";
    description.textContent = f.description;

    const bouton = document.createElement("button");
    bouton.className = "btn btn-primary btn-voir-plus";
    bouton.dataset.id = f.id;
    bouton.textContent = "Voir plus";
    bouton.addEventListener("click", () => {
      const formation = formations.find((item) => item.id === f.id);
      if (formation) {
        alert(formation.titre + " : " + formation.description);
      }
    });

    body.appendChild(titre);
    body.appendChild(description);
    body.appendChild(bouton);
    corps.appendChild(body);
    carte.appendChild(corps);
    liste.appendChild(carte);
  });
}

if (liste && recherche) {
  afficherFormations(formations);

  recherche.addEventListener("input", () => {
    const valeur = recherche.value.trim().toLowerCase();
    const resultat = formations.filter((f) =>
      f.titre.toLowerCase().includes(valeur)
    );
    afficherFormations(resultat);
  });
}
