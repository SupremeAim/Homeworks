class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
    }
}

export default class ArbolBinario {
    constructor() {
        this.raiz = null;
    }

    insertar(valor) {
        const nuevo = new Nodo(valor);

        if (this.raiz === null) {
            this.raiz = nuevo;
            return true;
        }

        let actual = this.raiz;

        while (true) {
            if (valor === actual.valor) {
                return false;
            }
            if (valor < actual.valor) {
                if (actual.izquierda === null) {
                    actual.izquierda = nuevo;
                    return true;
                }
                actual = actual.izquierda;
            } else {
                if (actual.derecha === null) {
                    actual.derecha = nuevo;
                    return true;
                }
                actual = actual.derecha;
            }
        }
    }
      buscar(valor) {
    let actual = this.raiz;

    while (actual !== null) {
      if (valor === actual.valor) {
        return true;
      }

      actual = valor < actual.valor
        ? actual.izquierda
        : actual.derecha;
    }

    return false;
  }

  inorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      this.inorden(nodo.izquierda, resultado);
      resultado.push(nodo.valor);
      this.inorden(nodo.derecha, resultado);
    }
    return resultado;
  }

  preorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      resultado.push(nodo.valor);
      this.preorden(nodo.izquierda, resultado);
      this.preorden(nodo.derecha, resultado);
    }
    return resultado;
  }

  postorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      this.postorden(nodo.izquierda, resultado);
      this.postorden(nodo.derecha, resultado);
      resultado.push(nodo.valor);
    }
    return resultado;
  }
    convertirAD3(nodo = this.raiz) {
    if (nodo === null) return null;

    const resultado = {
      name: String(nodo.valor),
      children: [],
    };

    if (nodo.izquierda !== null) {
      resultado.children.push(this.convertirAD3(nodo.izquierda));
    }

    if (nodo.derecha !== null) {
      resultado.children.push(this.convertirAD3(nodo.derecha));
    }

    return resultado;
  }
}   