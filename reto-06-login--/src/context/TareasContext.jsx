import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useTareas } from "../hooks/useTareas.js";

const TareasContext = createContext(null);

export function TareasProvider({ children }) {
  const { user } = useAuth();
  const datos = useTareas(user?.uid);

  return (
    <TareasContext.Provider value={datos}>{children}</TareasContext.Provider>
  );
}

export function useTareasContext() {
  return useContext(TareasContext);
}