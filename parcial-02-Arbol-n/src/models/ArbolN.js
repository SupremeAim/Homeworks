export class Nodo {
  constructor({ id, nombre, tipo, creadoPor, padreId = null }) {
    this.id = id ?? crypto.randomUUID();
    this.nombre = nombre;
    this.tipo = tipo; 
    this.creadoPor = creadoPor; 
    this.padreId = padreId;
    this.hijos = [];
  }

  esCarpeta() {
    return this.tipo === "carpeta";
  }
}

export default class ArbolN {
  constructor() {
    this.raiz = null;
  }

  crearRaiz(creadoPor) {
    this.raiz = new Nodo({ nombre: "raíz", tipo: "carpeta", creadoPor });
    return this.raiz;
  }

  buscar(id, nodo = this.raiz) {
    if (nodo === null) return null;
    if (nodo.id === id) return nodo;

    for (const hijo of nodo.hijos) {
      const encontrado = this.buscar(id, hijo);
      if (encontrado !== null) return encontrado;
    }
    return null;
  }

  agregarHijo(idPadre, { nombre, tipo, creadoPor }) {
    if (!creadoPor) throw new Error("Debes iniciar sesión para crear.");
    if (tipo !== "carpeta" && tipo !== "archivo") {
      throw new Error("El tipo debe ser carpeta o archivo.");
    }

    const nombreLimpio = (nombre ?? "").trim();
    if (nombreLimpio === "") throw new Error("El nombre no puede estar vacío.");

    const padre = this.buscar(idPadre);
    if (padre === null) throw new Error("La carpeta padre no existe.");
    if (!padre.esCarpeta()) throw new Error("Un archivo no puede tener hijos.");

    if (padre.hijos.some((hijo) => hijo.nombre === nombreLimpio)) {
      throw new Error("Ya existe un elemento con ese nombre en esta carpeta.");
    }

    const nuevo = new Nodo({
      nombre: nombreLimpio,
      tipo,
      creadoPor,
      padreId: padre.id,
    });
    padre.hijos.push(nuevo);
    return nuevo;
  }

  aLista(nodo = this.raiz, resultado = []) {
    if (nodo === null) return resultado;

    resultado.push({
      id: nodo.id,
      nombre: nodo.nombre,
      tipo: nodo.tipo,
      creadoPor: nodo.creadoPor,
      padreId: nodo.padreId,
    });
    for (const hijo of nodo.hijos) {
      this.aLista(hijo, resultado);
    }
    return resultado;
  }

  static desdeLista(lista) {
    const arbol = new ArbolN();
    const nodos = new Map();

    lista.forEach((datos) => nodos.set(datos.id, new Nodo(datos)));
    lista.forEach((datos) => {
      const nodo = nodos.get(datos.id);
      if (datos.padreId === null) {
        arbol.raiz = nodo;
      } else {
        nodos.get(datos.padreId)?.hijos.push(nodo);
      }
    });
    return arbol;
  }
}