
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ListaTareas({ sesion }) {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [editando, setEditando] = useState(null);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [guardandoEdicion, setGuardandoEdicion] = useState(false);

  const userId = sesion.user.id;

  useEffect(() => {
    let activo = true;

    async function cargarTareas() {
      const { data, error } = await supabase
        .from("tareas")
        .select("id, titulo, completada, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!activo) return;

      if (error) {
        setError(error.message);
      } else {
        setTareas(data ?? []);
      }

      setCargando(false);
    }

    cargarTareas();

    return () => {
      activo = false;
    };
  }, [userId]);
  
  useEffect(() => {
    let activo = true;

    const canal = supabase
      .channel(`tareas-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tareas"
        },
        async () => {
          const { data, error } = await supabase
            .from("tareas")
            .select("id, titulo, completada, created_at")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

          if (!activo) return;

          if (error) {
            setError(error.message);
          } else {
            setTareas(data ?? []);
          }
        }
      )
      .subscribe();

    return () => {
      activo = false;
      supabase.removeChannel(canal);
    };
  }, [userId]);


  async function agregarTarea(e) {
    e.preventDefault();

    const texto = titulo.trim();
    if (!texto || guardando) return;

    setGuardando(true);
    setError("");

    const { data, error } = await supabase
      .from("tareas")
      .insert({
        titulo: texto,
        completada: false,
        user_id: userId
      })
      .select()
      .single();

    if (error) {
      setError(error.message);
    } else {
      setTareas((anteriores) => [data, ...anteriores]);
      setTitulo("");
    }

    setGuardando(false);
  }

  async function cambiarEstado(tarea) {
    setError("");

    const { data, error } = await supabase
      .from("tareas")
      .update({ completada: !tarea.completada })
      .eq("id", tarea.id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      setError(error.message);
    } else {
      setTareas((anteriores) =>
        anteriores.map((t) =>
          t.id === tarea.id ? data : t
        )
      );
    }
  }

  function empezarEdicion(tarea) {
    setEditando(tarea.id);
    setNuevoTitulo(tarea.titulo);
    setError("");
  }

  async function editarTarea(tarea) {
    const texto = nuevoTitulo.trim();

    if (!texto || guardandoEdicion) return;

    setGuardandoEdicion(true);
    setError("");

    const { data, error } = await supabase
      .from("tareas")
      .update({ titulo: texto })
      .eq("id", tarea.id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      setError(error.message);
    } else {
      setTareas((anteriores) =>
        anteriores.map((t) =>
          t.id === tarea.id ? data : t
        )
      );

      setEditando(null);
      setNuevoTitulo("");
    }

    setGuardandoEdicion(false);
  }

  async function eliminarTarea(tarea) {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar esta tarea?"
    );

    if (!confirmar) return;

    setError("");

    const { error } = await supabase
      .from("tareas")
      .delete()
      .eq("id", tarea.id)
      .eq("user_id", userId)
      .select("id")
      .single();

    if (error) {
      setError(error.message);
    } else {
      setTareas((anteriores) =>
        anteriores.filter((t) => t.id !== tarea.id)
      );
    }
  }

  return (
    <section style={{ marginTop: "30px" }}>
      <h2>Lista de tareas</h2>

      <form onSubmit={agregarTarea}>
        <input
          type="text"
          placeholder="Escribe una tarea"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : "Agregar tarea"}
        </button>
      </form>

      {error && <p role="alert">Error: {error}</p>}

      {cargando ? (
        <p>Cargando tareas...</p>
      ) : tareas.length === 0 ? (
        <p>Todavía no tienes tareas.</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id} style={{ marginBottom: "10px" }}>
              {editando === tarea.id ? (
                <>
                  <input
                    type="text"
                    value={nuevoTitulo}
                    onChange={(e) => setNuevoTitulo(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => editarTarea(tarea)}
                    disabled={guardandoEdicion}
                  >
                    {guardandoEdicion ? "Guardando..." : "Guardar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditando(null)}
                    disabled={guardandoEdicion}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {tarea.titulo} - {tarea.completada ? "Completada" : "Pendiente"}

                  <button
                    type="button"
                    onClick={() => cambiarEstado(tarea)}
                    style={{ marginLeft: "10px" }}
                  >
                    {tarea.completada ? "Marcar pendiente" : "Completar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => empezarEdicion(tarea)}
                    style={{ marginLeft: "5px" }}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => eliminarTarea(tarea)}
                    style={{ marginLeft: "5px" }}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
