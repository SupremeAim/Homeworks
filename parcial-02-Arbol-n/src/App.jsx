import { Routes, Route } from "react-router-dom";
import RutaPrivada from "./components/RutaPrivada.jsx";
import Acceso from "./pages/Acceso.jsx";
import Explorador from "./pages/Explorador.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/acceso" element={<Acceso />} />
      <Route
        path="/"
        element={
          <RutaPrivada>
            <Explorador />
          </RutaPrivada>
        }
      />
    </Routes>
  );
}