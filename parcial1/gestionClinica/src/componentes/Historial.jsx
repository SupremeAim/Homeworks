function Historial({ registros }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Historial de atención</h2>
        <span className="contador">{registros.length} atendidos</span>
      </div>

      {registros.length === 0 ? (
        <p className="vacio">Todavía no se ha atendido a ningún paciente.</p>
      ) : (
        <>
          <p className="nota">Ordenado del más reciente al más antiguo</p>
          <ol className="lista lista-espaciada">
            {registros.map((nombre, index) => (
              <li key={index} className="item">
                <span className="marca-ok" aria-hidden="true">
                  ✓
                </span>
                <span className="item-nombre">{nombre}</span>
                <span className="orden">Atención #{registros.length - index}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}

export default Historial;
