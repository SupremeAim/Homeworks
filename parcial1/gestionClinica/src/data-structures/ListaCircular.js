class Nodo {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class ListaCircular {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.size = 0;
  }

  append(data) {
    const nuevo = new Nodo(data);

    if (!this.head) {
      this.head = nuevo;
      this.tail = nuevo;
      nuevo.next = nuevo;
      this.current = nuevo;
    } else {
      this.tail.next = nuevo;
      nuevo.next = this.head;
      this.tail = nuevo;
    }

    this.size++;
    return nuevo;
  }

  siguiente() {
    if (!this.current) return null;
    this.current = this.current.next;
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

export default ListaCircular;