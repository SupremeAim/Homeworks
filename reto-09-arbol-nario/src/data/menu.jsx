
import { NodoMenu, ArbolNario } from "../models/ArbolNario";

function Inicio() {
  return (
    <div>
      <h2>Inicio</h2>
      <p>Bienvenido al portal académico.</p>
    </div>
  );
}

function Academico() {
  return (
    <div>
      <h2>Académico</h2>
      <p>Aquí puedes consultar tu información académica.</p>
    </div>
  );
}

function Materias() {
  return (
    <div>
      <h2>Mis materias</h2>
      <p>Consulta las materias que estás cursando.</p>
    </div>
  );
}

function Calificaciones() {
  return (
    <div>
      <h2>Calificaciones</h2>
      <p>Revisa tus notas y resultados académicos.</p>
    </div>
  );
}

function Servicios() {
  return (
    <div>
      <h2>Servicios</h2>
      <p>Encuentra los servicios disponibles.</p>
    </div>
  );
}

function Biblioteca() {
  return (
    <div>
      <h2>Biblioteca</h2>
      <p>Consulta los recursos de la biblioteca.</p>
    </div>
  );
}

function Soporte() {
  return (
    <div>
      <h2>Soporte</h2>
      <p>Encuentra ayuda y soporte técnico.</p>
    </div>
  );
}

const raiz = new NodoMenu("Menú principal", "#/inicio", Inicio);

const inicio = new NodoMenu("Inicio", "#/inicio", Inicio);

const academico = new NodoMenu("Académico", "#/academico", Academico);
const materias = new NodoMenu("Materias", "#/materias", Materias);
const calificaciones = new NodoMenu("Calificaciones", "#/calificaciones", Calificaciones);

const servicios = new NodoMenu("Servicios", "#/servicios", Servicios);
const biblioteca = new NodoMenu("Biblioteca", "#/biblioteca", Biblioteca);
const soporte = new NodoMenu("Soporte", "#/soporte", Soporte);

raiz.agregarHijo(inicio);
raiz.agregarHijo(academico);
raiz.agregarHijo(servicios);

academico.agregarHijo(materias);
academico.agregarHijo(calificaciones);

servicios.agregarHijo(biblioteca);
servicios.agregarHijo(soporte);

export const arbolMenu = new ArbolNario(raiz);
