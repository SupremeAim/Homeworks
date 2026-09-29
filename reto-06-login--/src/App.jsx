import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./pages/login.jsx";
import Ejercicio1 from "./pages/Ejercicio1.jsx";
import Ejercicio2 from "./pages/Ejercicio2.jsx";

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user && (
        <nav>
          <span>Usuario: {user.username}</span>{" "}
          <Link to="/ejercicio-1">Ejercicio 1</Link>{" "}
          <Link to="/ejercicio-2">Ejercicio 2</Link>{" "}
          <button onClick={logout}>Logout</button>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/ejercicio-1"
          element={
            <PrivateRoute>
              <Ejercicio1 />
            </PrivateRoute>
          }
        />
        <Route
          path="/ejercicio-2"
          element={
            <PrivateRoute>
              <Ejercicio2 />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
