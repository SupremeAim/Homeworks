
export class NodoMenu {
  constructor(titulo, enlace, componente) {
    this.titulo = titulo;
    this.enlace = enlace;
    this.componente = componente;
    this.hijos = [];
  }

  agregarHijo(nodo) {
    this.hijos.push(nodo);
  }
}

export class ArbolNario {
  constructor(raiz) {
    this.raiz = raiz;
  }
}
