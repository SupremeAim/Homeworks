class NodoDoble {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class ListaDobleEnlazada {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(data) {
    const nuevo = new NodoDoble(data);

    if (!this.head) {
      this.head = nuevo;
      this.tail = nuevo;
    } else {
      nuevo.prev = this.tail;
      this.tail.next = nuevo;
      this.tail = nuevo;
    }

    this.size++;
    return nuevo;
  }

  toArray() {
    const result = [];
    let actual = this.head;
    while (actual) {
      result.push(actual.data);
      actual = actual.next;
    }
    return result;
  }

  toArrayReverso() {
    const result = [];
    let actual = this.tail;
    while (actual) {
      result.push(actual.data);
      actual = actual.prev;
    }
    return result;
  }

  getAt(index) {
    if (index < 0 || index >= this.size) return null;

    let actual = this.head;
    for (let i = 0; i < index; i++) actual = actual.next;
    return actual;
  }
}

export default ListaDobleEnlazada;
