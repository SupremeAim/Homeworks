export default function NodoVista({ nodo, seleccionadoId, onSeleccionar }) {
  const esCarpeta = nodo.esCarpeta();
  const activo = nodo.id === seleccionadoId;

  return (
    <li className="nodo">
      <button
        type="button"
        className={`nodo__fila ${activo ? "nodo__fila--activa" : ""}`}
        onClick={() => esCarpeta && onSeleccionar(nodo.id)}
      >
        <span className={`nodo__icono nodo__icono--${nodo.tipo}`} />
        <span>{nodo.nombre}</span>
        <span className="nodo__correo">{nodo.creadoPor}</span>
      </button>

      {esCarpeta && nodo.hijos.length > 0 && (
        <ul className="nodo__hijos">
          {nodo.hijos.map((hijo) => (
            <NodoVista
              key={hijo.id}
              nodo={hijo}
              seleccionadoId={seleccionadoId}
              onSeleccionar={onSeleccionar}
            />
          ))}
        </ul>
      )}
    </li>
  );
}