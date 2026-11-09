const btnEnSavoirPlus = document.querySelector("#btn-en-savoir-plus");
const formulaire = document.querySelector("#formulaire-contact");
const messageForm = document.querySelector("#message-formulaire");
const telephone = document.querySelector("#champ-telephone");
const champMessage = document.querySelector("#champ-message");
const compteur = document.querySelector("#compteur-message");

if (champMessage && compteur) {
  champMessage.addEventListener("input", () => {
    const nombre = champMessage.value.length;
    compteur.textContent = nombre + " / 200 caractères";
    compteur.style.color = nombre > 200 ? "red" : "gray";
  });
}

if (btnEnSavoirPlus) {
  btnEnSavoirPlus.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Redirection vers les formations.");
  });
}

if (formulaire && messageForm) {
  formulaire.addEventListener("submit", (event) => {
    event.preventDefault();

    const nom = document.querySelector("#champ-nom").value.trim();
    const email = document.querySelector("#champ-email").value.trim();
    const message = document.querySelector("#champ-message").value.trim();

    if (nom.length < 2) {
      messageForm.textContent = "Le nom doit contenir au moins 2 caractères.";
      messageForm.style.color = "red";
      return;
    }

    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValide) {
      messageForm.textContent = "L'adresse email est invalide.";
      messageForm.style.color = "red";
      return;
    }

    if (message.length < 10) {
      messageForm.textContent = "Le message doit contenir au moins 10 caractères.";
      messageForm.style.color = "red";
      return;
    }

    if (!telephone || telephone.value.replace(/\D/g, "").length < 8) {
  messageForm.textContent = "Le numéro de téléphone doit contenir au moins 8 chiffres.";
  messageForm.style.color = "red";
  return;
}


    messageForm.textContent =
      "Merci " + nom + ", votre message a bien été pris en compte (simulation).";
    messageForm.style.color = "green";
    formulaire.reset();
  });
}
