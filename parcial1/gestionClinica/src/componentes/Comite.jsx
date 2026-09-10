function Comite({ miembroActual, miembros, onSiguiente, onAnterior }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Comité administrativo</h2>
        <span className="contador">{miembros.length} miembros</span>
      </div>

      <div className="destacado">
        <span className="destacado-label">Miembro seleccionado</span>
        <strong className="destacado-valor">{miembroActual ?? "Sin miembros registrados"}</strong>
        <p className="nota">Recorrido circular en ambos sentidos</p>
      </div>

      <div className="acciones">
        <button className="btn btn-secundario" onClick={onAnterior}>
          ← Anterior
        </button>
        <button className="btn btn-secundario" onClick={onSiguiente}>
          Siguiente →
        </button>
      </div>

      <ul className="lista">
        {miembros.map((nombre, index) => (
          <li key={index} className={nombre === miembroActual ? "item item-activo" : "item"}>
            <span className="item-nombre">{nombre}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Comite;