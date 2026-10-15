import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthContext } from "./auth.js";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Firebase avisa cada vez que la sesión cambia (login, logout, recarga)
    const cancelar = onAuthStateChanged(auth, (u) => {
      setUsuario(u);
      setCargando(false);
    });
    return cancelar;
  }, []);

  const registrar = (correo, clave) =>
    createUserWithEmailAndPassword(auth, correo, clave);
  const iniciarSesion = (correo, clave) =>
    signInWithEmailAndPassword(auth, correo, clave);
  const cerrarSesion = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ usuario, cargando, registrar, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}