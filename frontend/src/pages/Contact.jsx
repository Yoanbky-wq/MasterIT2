import { useState } from "react";

function Contact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [retour, setRetour] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom.trim().length < 2) {
      setRetour("Le nom doit contenir au moins 2 caractères.");
      return;
    }
    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValide) {
      setRetour("L'adresse email est invalide.");
      return;
    }
    if (message.trim().length < 10) {
      setRetour("Le message doit contenir au moins 10 caractères.");
      return;
    }
    setRetour("Message envoyé (simulation).");
    setNom("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <h1>Contactez-nous</h1>
      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: "500px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <button type="submit">Envoyer</button>
        <p style={{ marginTop: "10px", color: "red" }}>{retour}</p>
      </form>
    </div>
  );
}

export default Contact;
