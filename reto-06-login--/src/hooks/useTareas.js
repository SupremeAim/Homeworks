import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

export function useTareas(uid) {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!uid) {
      setTareas([]);
      setCargando(false);
      return;
    }

    const q = query(collection(db, "tareas"), where("uid", "==", uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      lista.sort((a, b) => a.creada - b.creada);
      setTareas(lista);
      setCargando(false);
    });

    return unsubscribe;
  }, [uid]);

  const agregar = (titulo) =>
    addDoc(collection(db, "tareas"), {
      titulo,
      hecha: false,
      uid,
      creada: Date.now(),
    });

  const editar = (id, titulo) => updateDoc(doc(db, "tareas", id), { titulo });

  const alternar = (id, hecha) =>
    updateDoc(doc(db, "tareas", id), { hecha: !hecha });

  const borrar = (id) => deleteDoc(doc(db, "tareas", id));

  return { tareas, cargando, agregar, editar, alternar, borrar };
}