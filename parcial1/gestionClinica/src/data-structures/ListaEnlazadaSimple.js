class Nodo {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class ListaEnlazadaSimple {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(data) {
    const nuevo = new Nodo(data);

    if (!this.head) {
      this.head = nuevo;
      this.tail = nuevo;
    } else {
      this.tail.next = nuevo;
      this.tail = nuevo;
    }

    this.size++;
    return nuevo;
  }

  removeFirst() {
    if (!this.head) return null;

    const nodo = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = null;

    this.size--;
    return nodo.data;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.removeFirst();

    let anterior = this.head;
    for (let i = 0; i < index - 1; i++) anterior = anterior.next;

    const nodo = anterior.next;
    anterior.next = nodo.next;
    if (nodo === this.tail) this.tail = anterior;

    this.size--;
    return nodo.data;
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

  getAt(index) {
    if (index < 0 || index >= this.size) return null;

    let actual = this.head;
    for (let i = 0; i < index; i++) actual = actual.next;
    return actual;
  }
}

export default ListaEnlazadaSimple;
