export class ColaATM {
    constructor() {
        this.items = [];
    }

encolar(persona) {
    this.items.push(persona);
}

desencolar() {
    return this.items.shift();
}

Vacia() {
    return this.items.length === 0;
}

tamano() {
    return this.items.length;
}

obtenerTodos() {
    return [...this.items];
    }
}