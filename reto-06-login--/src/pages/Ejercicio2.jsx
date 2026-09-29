import ListaCola from "../components/ListaCola.jsx";
import { useQueue } from "../context/QueueContext.jsx";

function Ejercicio2() {
  const { personas } = useQueue();

  return (
    <div>
      <h1>Ejercicio 2: Cola ATM</h1>
      <ListaCola personas={personas} />
    </div>
  );
}

export default Ejercicio2;