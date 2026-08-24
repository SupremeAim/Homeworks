//Primero voy con las diferencias
//la primera ademas de la sintaxis es this, a que objeto se refieren
const obj={
    nombre: "Objeto",
    regular: function() {console.log(this.nombre);},
    flecha: () => {console.log(this.nombre);}
};
obj.regular();
obj.flecha();
//una funcion regular tiene su propio "this" que apunta al objeto que la esta llamando
//la arrow en cambio no tiene uno propio, toma el "this" de donde fue escrita, no de quien la llama por eso no encuentra nombre y retorna un undefined

function contenedorArguments() {
    function sumRegular() {console.log(arguments)};
    sumRegular(1, 2, 3);

    const sumaArrow = () => {console.log(arguments);};
    sumaArrow(1, 2, 3);
}
contenedorArguments();
//las funciones regulares pueden usar arguments, todos incluso sin ser nombrados
//las arrow no tienen ese objeto esta es la segunda diferencia, el objeto arguments
//las meti dentro de una funcion contenedora para que se vea limpio, si no arguments toma datos internos del modulo de node

console.log(saludarRegular());
function saludarRegular(){return "hola desde una funcion regular";}

try {
    console.log(saludarArrow());
} catch (error) {
    console.log("Error:", error.message);
}
const saludarArrow = () =>("hola desde una funcion arrow");
// ahora el hoisting, una funcion regular declarada con function se puede usar antes de donde aparece escrita en el archivo es como si JS la subiera mentalmente
//mientras que un arrow funciona guardada en const hasta que el codigo llega a esa linea, no existe
//el try/catch es para que el error esperado no detenga el resto del archivo

function PersonaRegular(nombre) {this.nombre =nombre;}
const p= new PersonaRegular("Cristobal");
console.log(p.nombre);

const personaarrow = (nombre) => {this.nombre = nombre;};
try {
    const p2 = new personaarrow ( "Juan");
} catch (error) {
    console.log("Error:", error.message);
}
//las funciones regulares si pueden usarse como constructores con new, crean un objeto nuevo sin problema
//las arrow no pueden usarse como constructores, JS lo bloquea directamente con un TypeError


//Ahora el reto que se indico, dos funciones que reciben  un  umero y dicen si es par o impar

function esparoimparRegular(numero){
    if (numero %2 === 0){
        console.log(numero + "es par");
    }else {
        console.log(numero + "es impar");
    }
}

const esparoimparArrow = (numero) =>{
    if (numero %2 === 0){
        console.log(numero + "es par");
    } else{
        console.log(numero + "es impar");
    }
};
esparoimparRegular(4);
esparoimparRegular(7);
esparoimparArrow(4);
esparoimparArrow(7);
esparoimparRegular(19);
esparoimparRegular(-2);
esparoimparArrow(0);
//aqui probe con algunos numeros para mostrar que si funciona incluso con negativos y el cero ya que 0%2 da 0
