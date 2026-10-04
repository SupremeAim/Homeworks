import { useState } from "react";
import { useTareasContext } from "../context/TareasContext.jsx";

function Tareas() {
  const { tareas, cargando, agregar, editar, alternar, borrar } =
    useTareasContext();

  const [titulo, setTitulo] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEditado, setTituloEditado] = useState("");

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    await agregar(titulo.trim());
    setTitulo("");
  };

  const empezarEdicion = (tarea) => {
    setEditandoId(tarea.id);
    setTituloEditado(tarea.titulo);
  };

  const guardarEdicion = async (id) => {
    if (!tituloEditado.trim()) return;
    await editar(id, tituloEditado.trim());
    setEditandoId(null);
  };

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" />
        <p className="mt-2">Cargando tareas...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="h3 mb-4">Mis tareas</h1>

          <form onSubmit={handleAgregar} className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Nueva tarea"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </form>

          {tareas.length === 0 && (
            <div className="alert alert-secondary">
              No tienes tareas todavía.
            </div>
          )}

          <ul className="list-group">
            {tareas.map((tarea) => (
              <li
                key={tarea.id}
                className="list-group-item d-flex align-items-center gap-2"
              >
                <input
                  type="checkbox"
                  className="form-check-input mt-0"
                  checked={tarea.hecha}
                  onChange={() => alternar(tarea.id, tarea.hecha)}
                />

                {editandoId === tarea.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={tituloEditado}
                      onChange={(e) => setTituloEditado(e.target.value)}
                    />
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => guardarEdicion(tarea.id)}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setEditandoId(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      className={
                        "flex-grow-1 " +
                        (tarea.hecha
                          ? "text-decoration-line-through text-secondary"
                          : "")
                      }
                    >
                      {tarea.titulo}
                    </span>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => empezarEdicion(tarea)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => borrar(tarea.id)}
                    >
                      Borrar
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tareas;