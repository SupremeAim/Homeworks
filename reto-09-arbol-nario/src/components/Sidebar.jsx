
import { useState } from "react";

function OpcionMenu({ nodo, ruta }) {
  const [abierto, setAbierto] = useState(false);
  const tieneHijos = nodo.hijos.length > 0;

  return (
    <div className="opcion-menu">
      <div className={`fila-menu ${ruta === nodo.enlace ? "activo" : ""}`}>
        <a href={nodo.enlace}>
          {nodo.titulo}
        </a>

        {tieneHijos && (
          <button onClick={() => setAbierto(!abierto)}>
            {abierto ? "−" : "+"}
          </button>
        )}
      </div>

      {tieneHijos && abierto && (
        <div className="submenus">
          {nodo.hijos.map((hijo) => (
            <OpcionMenu
              key={hijo.enlace}
              nodo={hijo}
              ruta={ruta}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ arbol, ruta }) {
  return (
    <aside className="sidebar">
      <h2>Mi Portal</h2>
      <p>Menú de navegación</p>

      <nav>
        {arbol.raiz.hijos.map((nodo) => (
          <OpcionMenu
            key={nodo.enlace}
            nodo={nodo}
            ruta={ruta}
          />
        ))}
      </nav>
    </aside>
  );
}
