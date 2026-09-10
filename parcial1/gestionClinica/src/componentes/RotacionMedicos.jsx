function RotacionMedicos({ medicoActual, medicos, intervaloMs, onRotar }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Rotación de médicos</h2>
        <span className="contador">{medicos.length} en rotación</span>
      </div>

      <div className="destacado">
        <span className="destacado-label">
          <svg className="icono-persona" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5 0-9 2.4-9 5.4V22h18v-2.6c0-3-4-5.4-9-5.4z" />
          </svg>
          Médico de guardia
        </span>
        <strong className="destacado-valor">{medicoActual ?? "Sin médicos registrados"}</strong>
        <p className="nota">La guardia rota automáticamente cada {intervaloMs / 1000} segundos</p>
      </div>

      <div className="acciones">
        <button className="btn btn-secundario" onClick={onRotar}>
          Rotar ahora
        </button>
      </div>

      <ul className="lista">
        {medicos.map((nombre, index) => (
          <li key={index} className={nombre === medicoActual ? "item item-activo" : "item"}>
            <span className="item-nombre">{nombre}</span>
            {nombre === medicoActual && <span className="etiqueta etiqueta-guardia">De guardia</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RotacionMedicos;
