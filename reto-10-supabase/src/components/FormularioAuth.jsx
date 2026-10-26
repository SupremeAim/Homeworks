import { useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function FormularioAuth() {
  const [registro, setRegistro] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function enviar(evento) {
    evento.preventDefault();
    if (ocupado) return;
    const campos = new FormData(evento.currentTarget);
    const credenciales = {
      email: campos.get("email").trim(),
      password: campos.get("password"),
    };
    setOcupado(true);
    setMensaje("");

    try {
      const { data, error } = registro
        ? await supabase.auth.signUp(credenciales)
        : await supabase.auth.signInWithPassword(credenciales);
      if (error) throw error;
      setMensaje(
        data.session
          ? "Sesión iniciada correctamente."
          : "Revisa tu correo para confirmar el registro."
      );
    } catch (error) {
      setMensaje(error.message || "No se pudo conectar con Supabase.");
    } finally {
      setOcupado(false);
    }
  }

  return (
    <section>
      <h1>{registro ? "Crear cuenta" : "Iniciar sesión"}</h1>
      <form onSubmit={enviar}>
        <fieldset disabled={ocupado}>
          <legend>Datos de acceso</legend>
          <label>Correo electrónico
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>Contraseña
            <input name="password" type="password" required
              minLength={registro ? 6 : undefined}
              autoComplete={registro ? "new-password" : "current-password"} />
          </label>
          <button type="submit">
            {ocupado ? "Procesando..." : registro ? "Registrarme" : "Entrar"}
          </button>
        </fieldset>
      </form>
      <p role="status">{mensaje}</p>
      <button type="button" disabled={ocupado}
        onClick={() => { setRegistro(!registro); setMensaje(""); }}>
        {registro ? "Ya tengo cuenta" : "Crear una cuenta"}
      </button>
    </section>
  );
}