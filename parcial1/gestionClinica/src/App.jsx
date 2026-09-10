import { useEffect, useRef, useState } from "react";
import "./App.css";
import ListaEnlazadaSimple from "./data-structures/ListaEnlazadaSimple";
import ListaDobleEnlazada from "./data-structures/ListaDobleEnlazada";
import ListaCircular from "./data-structures/ListaCircular";
import ListaCircularDoble from "./data-structures/ListaCircularDoble";
import SalaEspera from "./componentes/SalaEspera";
import Historial from "./componentes/Historial";
import RotacionMedicos from "./componentes/RotacionMedicos";
import Comite from "./componentes/Comite";

const MEDICOS_INICIALES = ["Dra. Fuentes", "Dr. Salinas", "Dra. Contreras", "Dr. Vidal"];
const COMITE_INICIAL = ["Dra. Muñoz (directora)", "Dr. Bravo", "Dra. Escobar", "Dr. Tapia"];
const ROTACION_MS = 10000;

function App() {
  const [seccionActiva, setSeccionActiva] = useState("espera");
  const [, forceUpdate] = useState(0);
  const rerender = () => forceUpdate((n) => n + 1);

  const pacientesEspera = useRef(new ListaEnlazadaSimple()).current;
  const historial = useRef(new ListaDobleEnlazada()).current;

  const medicos = useRef(new ListaCircular()).current;
  if (medicos.size === 0) MEDICOS_INICIALES.forEach((m) => medicos.append(m));

  const comite = useRef(new ListaCircularDoble()).current;
  if (comite.size === 0) COMITE_INICIAL.forEach((m) => comite.append(m));

  useEffect(() => {
    const intervalo = setInterval(() => {
      medicos.siguiente();
      rerender();
    }, ROTACION_MS);

    return () => clearInterval(intervalo);
  }, [medicos]);

  const agregarPaciente = (nombre) => {
    pacientesEspera.append(nombre);
    rerender();
  };

  const atenderPaciente = () => {
    const paciente = pacientesEspera.removeFirst();
    if (paciente) {
      historial.append(paciente);
      rerender();
    }
  };

  const rotarMedico = () => {
    medicos.siguiente();
    rerender();
  };

  const comiteSiguiente = () => {
    comite.siguiente();
    rerender();
  };

  const comiteAnterior = () => {
    comite.anterior();
    rerender();
  };

  const SECCIONES = {
    espera: {
      label: "Sala de espera",
      componente: (
        <SalaEspera
          pacientes={pacientesEspera.toArray()}
          onAgregar={agregarPaciente}
          onAtender={atenderPaciente}
        />
      ),
    },
    historial: {
      label: "Historial",
      componente: <Historial registros={historial.toArrayReverso()} />,
    },
    rotacion: {
      label: "Rotación de médicos",
      componente: (
        <RotacionMedicos
          medicoActual={medicos.getActual()}
          medicos={medicos.toArray()}
          intervaloMs={ROTACION_MS}
          onRotar={rotarMedico}
        />
      ),
    },
    comite: {
      label: "Comité administrativo",
      componente: (
        <Comite
          miembroActual={comite.getActual()}
          miembros={comite.toArray()}
          onSiguiente={comiteSiguiente}
          onAnterior={comiteAnterior}
        />
      ),
    },
  };

  return (
    <div>
      <header className="app-header">
        <div className="marca">
          <span className="marca-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5 2h5v5.5H20v5h-5.5V18h-5v-5.5H4v-5h5.5z" />
            </svg>
          </span>
          <div>
            <h1>Gestión Clínica</h1>
            <p className="subtitulo">Panel de turnos y guardias</p>
          </div>
        </div>

        <div className="guardia">
          <span className="guardia-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5 0-9 2.4-9 5.4V22h18v-2.6c0-3-4-5.4-9-5.4z" />
            </svg>
          </span>
          <div>
            <span className="guardia-label">Médico de guardia</span>
            <strong className="guardia-nombre">{medicos.getActual()}</strong>
          </div>
        </div>
      </header>

      <nav className="tabs">
        {Object.entries(SECCIONES).map(([key, { label }]) => (
          <button
            key={key}
            className="tab"
            onClick={() => setSeccionActiva(key)}
            disabled={key === seccionActiva}
          >
            {label}
          </button>
        ))}
      </nav>

      {SECCIONES[seccionActiva].componente}
    </div>
  );
}

export default App;