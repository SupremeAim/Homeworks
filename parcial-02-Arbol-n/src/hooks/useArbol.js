import { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ArbolN from "../models/ArbolN.js";
import useAuth from "./useAuth.js";

const COLECCION = "nodos";

function datosDe(nodo) {
  return {
    id: nodo.id,
    nombre: nodo.nombre,
    tipo: nodo.tipo,
    creadoPor: nodo.creadoPor,
    padreId: nodo.padreId,
    creadoEn: Date.now(),
  };
}

export default function useArbol() {
  const { usuario } = useAuth();
  const [arbol, setArbol] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const snapshot = await getDocs(collection(db, COLECCION));
        if (!activo) return;

        const lista = snapshot.docs.map((d) => d.data());
        lista.sort((a, b) => a.creadoEn - b.creadoEn);

        if (lista.length === 0) {
          const nuevo = new ArbolN();
          const raiz = nuevo.crearRaiz(usuario.email);
          await setDoc(doc(db, COLECCION, raiz.id), datosDe(raiz));
          setArbol(nuevo);
        } else {
          setArbol(ArbolN.desdeLista(lista));
        }
      } catch {
        setError("No se pudo cargar el árbol.");
      } finally {
        setCargando(false);
      }
    }

    cargar();
    return () => {
      activo = false;
    };
  }, [usuario.email]);

  async function agregar(idPadre, { nombre, tipo }) {
    // 1. Se valida en una copia: si rompe una regla, lanza error y no se guarda nada
    const copia = ArbolN.desdeLista(arbol.aLista());
    const nuevo = copia.agregarHijo(idPadre, {
      nombre,
      tipo,
      creadoPor: usuario.email,
    });

    // 2. Se guarda en Firestore
    await setDoc(doc(db, COLECCION, nuevo.id), datosDe(nuevo));

    // 3. Se actualiza la pantalla
    setArbol(copia);
  }

  return { arbol, cargando, error, agregar };
} 