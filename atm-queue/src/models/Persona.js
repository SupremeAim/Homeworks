export class Persona{
    constructor (nombre, montoRetiro) {
        this.nombre = nombre;
        this.montoRetiro = montoRetiro;
        this.fechaLlegada = this.generarFechaAleatoria();
    }
    generarFechaAleatoria() {
        const inicio = new Date(2026, 0, 1).getTime();
        const fin = new Date(2026, 11, 31).getTime();
        const timestamp = inicio + Math.random() * (fin - inicio);
        return new Date(timestamp);
    }
}