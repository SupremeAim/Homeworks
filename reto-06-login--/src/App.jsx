import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Ejercicio1 from "./pages/Ejercicio1.jsx";
import Ejercicio2 from "./pages/Ejercicio2.jsx";
import Tareas from "./pages/Tareas.jsx";

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user && (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
          <span className="navbar-text text-white me-4">
            Usuario: {user.username}
          </span>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/ejercicio-1">
                Ejercicio 1
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ejercicio-2">
                Ejercicio 2
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tareas">
                Tareas
              </Link>
            </li>
          </ul>
          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            Logout
          </button>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        <Route
          path="/tareas"
          element={
            <PrivateRoute>
              <Tareas />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;