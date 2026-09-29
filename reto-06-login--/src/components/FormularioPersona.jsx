import { useState } from 'react';
import { Persona } from '../models/Persona';

function FormularioPersona({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorMonto, setErrorMonto] = useState('');

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  const manejarEnvio = (e) => {
    e.preventDefault();
    let valido = true;

    if (!soloLetras.test(nombre) || nombre.trim().length < 3) {
      setErrorNombre('El nombre debe tener solo letras y mínimo 3 caracteres');
      valido = false;
    } else {
      setErrorNombre('');
    }

    if (!monto) {
      setErrorMonto('Ingresa un monto, solo números');
      valido = false;
    } else {
      setErrorMonto('');
    }

    if (!valido) return;

    const nuevaPersona = new Persona(nombre, Number(monto));
    onAgregar(nuevaPersona);

    setNombre('');
    setMonto('');
  };

  return (
    <div>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => {
            const valor = e.target.value;
            if (soloLetras.test(valor) || valor === '') {
              setNombre(valor);
            }
          }}
        />
        {errorNombre && <p style={{ color: 'red' }}>{errorNombre}</p>}

        <input
          type="text"
          placeholder="Monto a retirar"
          value={monto}
          onChange={(e) => {
            const valor = e.target.value;
            if (/^\d*$/.test(valor)) {
              setMonto(valor);
            }
          }}
        />
        {errorMonto && <p style={{ color: 'red' }}>{errorMonto}</p>}

        <button type="submit">Agregar a la cola</button>
      </form>
    </div>
  );
}

export default FormularioPersona;