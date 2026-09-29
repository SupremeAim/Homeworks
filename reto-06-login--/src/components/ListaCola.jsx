function ListaCola({ personas }) {
  const personasOrdenadas = [...personas].sort(
    (a, b) => a.fechaLlegada - b.fechaLlegada
  );

  return (
    <div>
      <h2>Cola de personas</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto a retirar</th>
            <th>Fecha de llegada</th>
          </tr>
        </thead>
        <tbody>
          {personasOrdenadas.map((persona, index) => (
            <tr key={index}>
              <td>{persona.nombre}</td>
              <td>{persona.montoRetiro}</td>
              <td>{persona.fechaLlegada.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCola;