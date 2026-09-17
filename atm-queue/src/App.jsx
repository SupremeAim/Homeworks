import { useState } from 'react';
import { crearColaConMockData } from './models/datosMock';
import FormularioPersona from './components/FormularioPersona';
import ListaCola from './components/ListaCola';

function App() {
  const [cola, setCola] = useState(crearColaConMockData());

  const agregarPersona = (persona) => {
    cola.encolar(persona);
    setCola(Object.assign(Object.create(Object.getPrototypeOf(cola)), cola));
  };

  return (
    <div>
      <h1>Cola ATM</h1>
      <FormularioPersona onAgregar={agregarPersona} />
      <ListaCola personas={cola.obtenerTodos()} />
    </div>
  );
}

export default App;