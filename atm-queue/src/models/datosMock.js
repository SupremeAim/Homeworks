import { Persona } from './Persona';
import { ColaATM } from './ColaATM';

export function crearColaConMockData() {
  const cola = new ColaATM();

  cola.encolar(new Persona('Juan Pérez', 150000));
  cola.encolar(new Persona('María Gómez', 320000));
  cola.encolar(new Persona('Carlos Ruiz', 80000));
  cola.encolar(new Persona('Ana Torres', 500000));
  cola.encolar(new Persona('Luis Martínez', 210000));

  return cola;
}