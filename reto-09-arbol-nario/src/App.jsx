
import { useEffect, useState } from "react";
import { arbolMenu } from "./data/menu";
import Sidebar from "./components/Sidebar";
import "./App.css";

function buscarMenu(nodos, ruta) {
  for (const nodo of nodos) {
    if (nodo.enlace === ruta) {
      return nodo;
    }

    const encontrado = buscarMenu(nodo.hijos, ruta);

    if (encontrado) {
      return encontrado;
    }
  }

  return null;
}

export default function App() {
  const [ruta, setRuta] = useState(
    window.location.hash || "#/inicio"
  );

  useEffect(() => {
    function cambiarRuta() {
      setRuta(window.location.hash || "#/inicio");
    }

    window.addEventListener("hashchange", cambiarRuta);

    return () => {
      window.removeEventListener("hashchange", cambiarRuta);
    };
  }, []);

  const pagina = buscarMenu(arbolMenu.raiz.hijos, ruta)
    || arbolMenu.raiz.hijos[0];

  const Componente = pagina.componente;

  return (
    <div className="app">
      <Sidebar arbol={arbolMenu} ruta={ruta} />

      <main className="contenido">
        <div className="encabezado">
          <h1>Portal Académico</h1>
          <p>Organiza y consulta tu información</p>
        </div>

        <section className="tarjeta">
          <Componente />
        </section>
      </main>
    </div>
  );
}
