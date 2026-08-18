//Voy a crear una variable para trabajarla con cada funcion mas adelante
let numeros = [5, 12, 8, 1, 20, 3];
console.log("Array original:", numeros);

//Encontre 41 metodos usando los 34 que nos mostro en clase mas otros que busque, repartidos en 7 grupos: Creacion, mutadores, versiones copia de los mutadores, no mutadores, bsqueda y comprobacion, iteracion y transformacion e iteradores.

//Creacion: Metodos estaticos que viven en Array, no en el array individual

console.log(Array.isArray(numeros));
// revisa si algo es un array

console.log(Array.of(1, 2, 3));
//con los argumentos que recibimos creamos un array

console.log(Array.from("hola"));
//tambien creamos un array a partir de un iterable

//GRUPO 1. MUTADORES

numeros.push(99, 15);
console.log(numeros);
//Agrega todos los valores que queramos al final

numeros.pop();
console.log(numeros);
//devuelve el array quitando SOLO el ultimo elemento

numeros.unshift(3);
console.log(numeros);
//agrega un nuevo valor al inicio del array

numeros.shift();
console.log(numeros);
//quita el que se añade al inicio pero SOLO el primero elemento

numeros.splice(1, 1, 100);
console.log(numeros);
//en esta me confundi un poquito lo que entendi es que el primer valor de splice es mas una coordenada o un punto de referencia, el segundo es el valor que indica cuantos elementos del array van a modificarse y los que siguen deben coincidir con el segundo valor, si editaste 3 posiciones a partir de la posicion 1 los hay que escribir los 3 valores que quieres que queden en su lugar, ahora si queremos insertar solo ponemos la posicion o referencia y en el segundo valor ponemos un 0, luego los numeros que queremos insertar y se insertaran a partir de la referencia que hayamos puesto.

numeros.sort((a, b)=> a - b);
console.log(numeros);
//lo que hace sort es que convierte los numeros a texto y los compara como si fueran palabras del diccionario si no escribimos el comparador podria tener errores al usar numeros de mas de un digito entonces con la funcion (a, b) va llamando en parejas y se restan, con base en ese resultado los va ordenando y asi sort funciona para ordenar el array. 

numeros.reverse();
console.log(numeros);
// invierte el orden del array

let relleno = [1, 2, 3, 4, 5];
relleno.fill(0, 1, 3);
console.log(relleno);
//fill sirve para rellenar un rango de posiciones con un mismo valor de un array, (cree otro para mostrarlo mas facil)
// el primer argumento (0) es el valor con el que rellenamos
// el segundo (1) es la posicion o referencia desde la que empezamos y esa posicion tambien se rellena
// el ultimo argumento (3) es la posicion donde termina y no se incluye esta posicion

relleno.sort((a, b)=> a - b);
console.log(relleno);
//aqui solo estaba probando el sort y si funciona igual, solo hay que cambiar la variable a la que apunta

let copia = [1, 2, 3, 4, 5];
copia.copyWithin(0, 3);
console.log(copia);
//toma una parte del mismo array y lo pasa a otra posicion la que escojamos
//aqui solo puse dos argumentos pero pueden ser 3
//el primero es donde quiero que se ponga lo que copie
//el segundo es la posicion desde que se empieza a copiar el array
//el ultimo es hasta donde quiero copiar y si no pongo nada solo copia hasta el final del array

// GRUPO 2. VERSIONES "COPIA" DE LOS MUTADORES
//la diferencia entre estos y los anteriores es que estos NO tocan el array original o sea no lo modifican si no que entregan un array nuevo, ya sea ordenado, invertido con valores insertados y demas

let base = [4, 2, 7, 1];
console.log(base.toSorted());
console.log(base.toReversed());
console.log(base.toSpliced(1, 1, 99));
console.log(base.with(0, 100));
console.log(base);
//este ultimo es para mostrar que ninguno de los 4 mutadores cambio el array inicial

//GRUPO 3. NO MUTADORES

let frutas =["manzana", "pera", "uva", "kiwi", "mango"];
console.log(frutas.slice(0,3));
// copia una parte del array con dos argumentos. desde y hasta cuando copio

console.log(frutas.concat(["fresa"]));
//une arrays en uno nuevo

console.log(frutas.join("-"));
//convierte el array en un string con separadores

let anidado = [1, [2, 3], [4, [5, 6]]];
console.log(anidado.flat());
// aplana arrays anidados

console.log(frutas. flatMap(f =>[f, f.length]));
//para explicar este primero quiero explicar lo que se de map
//map() transforma cada elemento y lo devuelve en un nuevo array. dentro de esa transformacion puedo devolver otro array por cada elemento en vez de un solo valor
// ahora flatmap() hace casi lo mismo de transformar cada elemento, solo que ademas de eso aplana un nivel automaticamente al final aplica map() y .flat() en un solo paso
// asi ya no quedan arrays metidos adentro, todo queda en una sola fila sin anidamiento

console.log(frutas.toString());
//retorna un texto separado por comas con un formato crudo

console.log(frutas.toLocaleString());
//igual que el tostring con la principal diferencia del formato, aqui la diferencia se notaria mas con numeros o fechas se le aplica el formato regioanl a cada elemento un ejemplo puede ser el formato de EEUU que separa miles con comas

console.log(frutas.at(-1));
//accede a una posicion del array pero puede aceptar indices negativos para contar desde el final

// GRUPO 4. BUSQUEDA Y COMPROBACION

console.log(frutas.indexOf("uva"));
//recorre el array desde posicion 0 hasta encontrar el valor exacto que buscas y te devuelve la posicion donde esta
//si no encuentra lo que buscas devuelve -1

console.log(frutas.lastIndexOf("kiwi"));
//este te da la ultima posicion de lo que estas buscando recorre desde el final hasta el inicio
//aqui en mi array no se nota porque no hay ningun valor repetido

console.log(frutas.includes("mango"));
//esta es mas simple solo sirve para saber si esta o no en el array, no te da posicion o si esta repetido solo true o false si esta o no

console.log(frutas.find(f=>f.length>4));
//Aqui no buscamos posicion si no una condicion, que la longitud del nombre sea mayor a 4 letras. manzana tiene 7 y nos arroja la primera que cumpla la condicion

console.log(frutas.findIndex(f=>f.length>4));
//la misma busqueda que find() condicion y orden pero en vez de darte la fruta o texto te da la posición

console.log(frutas.findLast(f=>f.length>4));
//igual que find pero desde el final hasta el inicio y busca la primera que cumple la condicion

console.log(frutas.findLastIndex(f=> f.length >4));
// igual que findlast() pero devolviendo posicion en vez del elemento tambien va del final hasta el inicio y nos da el primero que cumple con la condición 

console.log(frutas.some(f=>f.length>4));
//sencilla, revisa todo el array, luego pregunta y responde si hay al menos un elemento que cumpla con la condicion solicitada
// como hay 2 nos retorna true de una vez pero con una es suficiente para el true y si no hay pues false

console.log(frutas.every(f=>f.length>2));
//pregunta si TODOS los elementos cumplen la condicion que es que la longitud del nombre tenga mas de dos letras
//en este caso la que menos tiene son 3 asi que todos cumplen la condicion y retorna true

//GRUPO 5. ITERACION Y TRANSFORMACION

frutas.forEach(f=>console.log(f));
//recorre cada elemento y ejecuta la funcion que se pone por cada uno (imprimir la fruta)

console.log(frutas.map(f=>f.toUpperCase()));
//te devuelve un array nuevo del mismo tamaño que el original 
//cada posicion tiene el resultado de aplicarle la funcion a ese elemento
//las 5 frutas entraron e+y salueron en mayusculas como indique y en el mismo orden

console.log(frutas.filter(f=>f.length>4));
//te devuelve un nuevo array que solamente podria tener menos elemenos que el original
//te da un array con los elementos que cumplan la condicion
//longitud mayor de 4 letras en este caso solo son manzana y mango

console.log(frutas.reduce((acc, f)=>acc+f[0],""));
// este me enredo pero es sencillo, no da un array si no que acumula un unico resultado
//recorre el array de izquierda a derecha y la funcion recibe dos cosas. acc y f
//acc es el acumulado hasta el momento y f la fruta que lee o la fruta actual luego en "" es el valor inicial del acumulado que empieza vacio
//en cada vuelta toma la primera letra de la fruta y la añade al acumulado en este caso va hasta formar la palabra mpukm que son las iniciales de las frutas juntas

console.log(frutas.reduceRight((acc, f) => acc + f[0], ""))
//misma explicacion y logica del anterior pero estr va de derecha a izquierda

//GRUPO 6. ITERADORES

console.log([...frutas.keys()]);
//da los indices del array uno por uno no sus valores mejor dicho la posicion
//mi array es de 5 elementos asi que va de 0 a 4

console.log([...frutas.values()]);
//este es al reves nos da los valores sin posiciones pero aunque se ve como no nos da un nuevo array solo que el resultado se ve igual ya que solo recorre los valores en orden sin ninguna transformacion

console.log([...frutas.entries()]);
// se combinan los dos anteriores y va por cada elemento tenemos su posicion y el elemento como tal ambos juntos en uno facil de leer
