import FormularioPersona from "../components/FormularioPersona.jsx";
import { useQueue } from "../context/QueueContext.jsx";

function Ejercicio1() {
  const { agregarPersona } = useQueue();

  return (
    <div>
      <h1>Ejercicio 1: Agregar persona</h1>
      <FormularioPersona onAgregar={agregarPersona} />
    </div>
  );
}

export default Ejercicio1;