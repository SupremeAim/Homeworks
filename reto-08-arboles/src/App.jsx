import { useState } from "react";
import ArbolBinario from "./models/ArbolBinario.js";
import VistaArbol from "./components/VistaArbol.jsx";

export default function App() {
  const [numero, setNumero] = useState("");
  const [valores, setValores] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const arbol = new ArbolBinario();
  valores.forEach((valor) => arbol.insertar(valor));

  function obtenerNumero() {
    if (numero.trim() === "" || !Number.isFinite(Number(numero))) {
      setMensaje("Escribe un número válido.");
      return null;
    }
    return Number(numero);
  }

  function insertar(evento) {
    evento.preventDefault();
    const valor = obtenerNumero();
    if (valor === null) return;

    if (!arbol.insertar(valor)) {
      setMensaje("Ese número ya está en el árbol.");
      return;
    }

    setValores([...valores, valor]);
    setMensaje(`Se insertó el número ${valor}.`);
    setNumero("");

    console.log("Inorden:", arbol.inorden());
    console.log("Preorden:", arbol.preorden());
    console.log("Postorden:", arbol.postorden());
  }

  function buscar() {
    const valor = obtenerNumero();
    if (valor === null) return;

    setMensaje(
      arbol.buscar(valor)
        ? `El número ${valor} está en el árbol.`
        : `El número ${valor} no está en el árbol.`
    );
  }

  return (
    <main>
      <h1>Árbol binario de búsqueda</h1>
      <form onSubmit={insertar}>
        <label htmlFor="numero">Número: </label>
        <input
          id="numero"
          type="number"
          step="any"
          value={numero}
          onChange={(evento) => setNumero(evento.target.value)}
        />
        <button type="submit">Insertar</button>
        <button type="button" onClick={buscar}>Buscar</button>
      </form>
      <p role="status">{mensaje}</p>
      <p>Números insertados: {valores.join(", ") || "Ninguno"}</p>
      <VistaArbol datos={arbol.convertirAD3()} />
    </main>
  );
}