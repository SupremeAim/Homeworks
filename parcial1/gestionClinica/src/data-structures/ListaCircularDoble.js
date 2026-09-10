class NodoDoble {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class ListaCircularDoble {
  constructor() {
    this.head = null;
    this.current = null;
    this.size = 0;
  }

  append(data) {
    const nuevo = new NodoDoble(data);

    if (!this.head) {
      this.head = nuevo;
      nuevo.next = nuevo;
      nuevo.prev = nuevo;
      this.current = nuevo;
    } else {
      const ultimo = this.head.prev;
      ultimo.next = nuevo;
      nuevo.prev = ultimo;
      nuevo.next = this.head;
      this.head.prev = nuevo;
    }

    this.size++;
    return nuevo;
  }

  siguiente() {
    if (!this.current) return null;
    this.current = this.current.next;
    return this.current.data;
  }

  anterior() {
    if (!this.current) return null;
    this.current = this.current.prev;
    return this.current.data;
  }

  getActual() {
    return this.current ? this.current.data : null;
  }

  toArray() {
    const result = [];
    if (!this.head) return result;

    let actual = this.head;
    do {
      result.push(actual.data);
      actual = actual.next;
    } while (actual !== this.head);

    return result;
  }
}

export default ListaCircularDoble;
