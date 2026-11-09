import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Accueil from "./pages/Accueil.jsx";
import Formations from "./pages/Formations.jsx";
import APropos from "./pages/Apropos.jsx";
import Contact from "./pages/Contact.jsx";
import Inscription from "./pages/Inscription.jsx";
import PageIntrouvable from "./pages/PageIntrouvable.jsx";
import Footer from "./components/Footer.jsx";
import Compteur from "./pages/Compteur.jsx";
import Connexion from "./pages/Connexion.jsx";
import RouteProtegee from "./components/RouteProtegee.jsx";
import Profil from "./pages/Profil.jsx";
import Brouillons from "./pages/Brouillons.jsx";







function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageIntrouvable />} />
          <Route path="/compteur" element={<Compteur />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/brouillons" element={<Brouillons />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
