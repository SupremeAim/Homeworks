import { useState } from "react";
//Profe se que aqui no hemos visto validaciones pero igual le agregue algunas con el fin de agregar robustez al software

const NOMBRE_REGEX = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
const MIN_LARGO = 3;
const MAX_LARGO = 40;

function SalaEspera({ pacientes, onAgregar, onAtender }) {
  const [nombre, setNombre] = useState("");

  const nombreNormalizado = nombre.trim().replace(/\s+/g, " ");

  const validarNombre = (valor) => {
    if (valor.length < MIN_LARGO) return `El nombre debe tener al menos ${MIN_LARGO} letras`;
    if (valor.length > MAX_LARGO) return `El nombre no puede superar los ${MAX_LARGO} caracteres`;
    if (!NOMBRE_REGEX.test(valor)) return "El nombre no puede contener números ni símbolos";
    if (pacientes.some((p) => p.toLowerCase() === valor.toLowerCase())) {
      return "Ese paciente ya está en la sala de espera";
    }
    return "";
  };

  const error = nombreNormalizado ? validarNombre(nombreNormalizado) : "";

  const handleAgregar = () => {
    if (!nombreNormalizado || error) return;
    onAgregar(nombreNormalizado);
    setNombre("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAgregar();
  };

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Sala de espera</h2>
        <span className="contador">{pacientes.length} en espera</span>
      </div>

      <div className="form-bloque">
        <div className="form-fila">
          <input
            className="campo"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nombre del paciente"
          />
          <button className="btn btn-primario" onClick={handleAgregar} disabled={!nombreNormalizado || !!error}>
            Agregar paciente
          </button>
        </div>
        {error && <p className="mensaje-error">{error}</p>}
      </div>

      {pacientes.length === 0 ? (
        <p className="vacio">No hay pacientes en espera.</p>
      ) : (
        <ol className="lista">
          {pacientes.map((p, index) => (
            <li key={index} className="item">
              <span className="turno">{index + 1}</span>
              <span className="item-nombre">{p}</span>
              {index === 0 && <span className="etiqueta etiqueta-siguiente">Siguiente</span>}
            </li>
          ))}
        </ol>
      )}

      <button className="btn btn-atender" onClick={onAtender} disabled={pacientes.length === 0}>
        Atender siguiente paciente
      </button>
    </section>
  );
}

export default SalaEspera;
