import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function Acceso() {
  const { iniciarSesion, registrar } = useAuth();
  const navigate = useNavigate();
  const [modoRegistro, setModoRegistro] = useState(false);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  async function enviar(evento) {
    evento.preventDefault();
    setError("");
    try {
      if (modoRegistro) {
        await registrar(correo, clave);
      } else {
        await iniciarSesion(correo, clave);
      }
      navigate("/");
    } catch {
      setError(
        modoRegistro
          ? "No se pudo registrar. Revisa el correo y usa mínimo 6 caracteres."
          : "Correo o contraseña incorrectos."
      );
    }
  }

  return (
    <main>
      <h1>{modoRegistro ? "Crear cuenta" : "Iniciar sesión"}</h1>
      <form onSubmit={enviar}>
        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <label htmlFor="clave">Contraseña</label>
        <input
          id="clave"
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">{modoRegistro ? "Registrarme" : "Entrar"}</button>
      </form>
      {error && <p role="alert">{error}</p>}
      <button type="button" onClick={() => setModoRegistro(!modoRegistro)}>
        {modoRegistro ? "Ya tengo cuenta" : "No tengo cuenta"}
      </button>
    </main>
  );
}