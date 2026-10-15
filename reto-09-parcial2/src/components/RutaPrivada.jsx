import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function RutaPrivada({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p>Cargando...</p>;
  return usuario ? children : <Navigate to="/acceso" replace />;
}