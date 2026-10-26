import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase.js";
import FormularioAuth from "./components/FormularioAuth.jsx";
import ListaTareas from "./components/ListaTareas";
import Avatar from "./components/Avatar";
import "./App.css";

export default function App() {
  const [sesion, setSesion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cerrando, setCerrando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      (_evento, nuevaSesion) => {
        setSesion(nuevaSesion);
        setCargando(false);
        setMensaje("");
      }
    );

    return () => data.subscription.unsubscribe();
  }, []);

  async function cerrarSesion() {
    setCerrando(true);
    setMensaje("");

    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
    } catch (error) {
      setMensaje(error.message || "No se pudo cerrar la sesión.");
    } finally {
      setCerrando(false);
    }
  }

  if (cargando) {
    return <main><p role="status">Cargando sesión...</p></main>;
  }

  
return (
  <main>
    {sesion ? (
      <section>
        <h1>Mis tareas</h1>
        <p>Sesión iniciada como: {sesion.user.email}</p>
        
        <Avatar sesion={sesion} />

        <button onClick={cerrarSesion} disabled={cerrando}>
          {cerrando ? "Cerrando..." : "Cerrar sesión"}
        </button>

        <p role="status">{mensaje}</p>

        <ListaTareas sesion={sesion} />
      </section>
    ) : (
      <FormularioAuth />
    )}
  </main>
);
}