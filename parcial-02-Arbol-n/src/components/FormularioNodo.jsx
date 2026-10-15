import { useState } from "react";

export default function FormularioNodo({ carpeta, onCrear }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("carpeta");
  const [error, setError] = useState("");

  async function enviar(evento) {
    evento.preventDefault();
    setError("");
    try {
      await onCrear({ nombre, tipo });
      setNombre("");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <p>
        Crear dentro de: <strong>{carpeta.nombre}</strong>
      </p>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="carpeta">Carpeta</option>
        <option value="archivo">Archivo</option>
      </select>
      <button type="submit">Crear</button>
      {error && (
        <p className="formulario__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}