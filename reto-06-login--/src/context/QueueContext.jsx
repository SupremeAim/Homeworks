import { createContext, useContext, useState } from "react";
import { crearColaConMockData } from "../models/datosMock.js";

const QueueContext = createContext(null);

export function QueueProvider({ children }) {
  const [cola, setCola] = useState(() => crearColaConMockData());

  const agregarPersona = (persona) => {
    cola.encolar(persona);
    setCola(Object.assign(Object.create(Object.getPrototypeOf(cola)), cola));
  };

  return (
    <QueueContext.Provider value={{ personas: cola.obtenerTodos(), agregarPersona }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}