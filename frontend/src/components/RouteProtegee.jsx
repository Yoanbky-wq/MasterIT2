import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function RouteProtegee({ children }) {
  const { utilisateur, chargement } = useAuth();

  if (chargement) return <p>Chargement...</p>;
  if (!utilisateur) return <Navigate to="/connexion" replace />;

  return children;
}

export default RouteProtegee;
