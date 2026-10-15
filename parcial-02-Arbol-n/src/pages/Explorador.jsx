import { useState } from "react";
import useAuth from "../hooks/useAuth.js";
import useArbol from "../hooks/useArbol.js";
import NodoVista from "../components/NodoVista.jsx";
import FormularioNodo from "../components/FormularioNodo.jsx";

export default function Explorador() {
  const { usuario, cerrarSesion } = useAuth();
  const { arbol, cargando, error, agregar } = useArbol();
  const [seleccionadoId, setSeleccionadoId] = useState(null);

  if (cargando) return <p>Cargando árbol...</p>;
  if (error) return <p role="alert">{error}</p>;

  // Si no hay nada seleccionado, se trabaja sobre la raíz
  const carpeta = arbol.buscar(seleccionadoId) ?? arbol.raiz;

  return (
    <main className="explorador">
      <header className="explorador__cabecera">
        <div>
          <h1>Explorador de archivos</h1>
          <p>Sesión: {usuario.email}</p>
        </div>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </header>

      <FormularioNodo
        carpeta={carpeta}
        onCrear={(datos) => agregar(carpeta.id, datos)}
      />

      <ul className="arbol">
        <NodoVista
          nodo={arbol.raiz}
          seleccionadoId={carpeta.id}
          onSeleccionar={setSeleccionadoId}
        />
      </ul>
    </main>
  );
}