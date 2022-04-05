# Promesas en javascript

Una Promise (promesa en castellano) es un objeto que representa la terminación o el fracaso de una operación asíncrona. 

Esencialmente, una promesa es un objeto devuelto al cuál se adjuntan funciones callback, en lugar de pasar callbacks a una función.

Considera la función crearArchivoAudioAsync(), el cuál genera de manera asíncrona un archivo de sonido de acuerdo a un archivo de configuración, y dos funciones callback, una que es llamada si el archivo de audio es creado satisfactoriamente, y la otra que es llamada si ocurre un error. El código podría verse de la siguiente forma:
```javascript	
function exitoCallback(resultado) {
  console.log("Archivo de audio disponible en la URL " + resultado);
}

function falloCallback(error) {
  console.log("Error generando archivo de audio " + error);
}

crearArchivoAudioAsync(audioConfig, exitoCallback, falloCallback);
```
... las funciones modernas devuelven un objeto promise al que puedes adjuntar funciones de retorno (callbacks). Si crearArchivoAudioAsync fuera escrita de manera tal que devuelva un objeto promise, usarla sería tan simple como esto:



```javascript
crearArchivoAudioAsync(audioConfig).then(exitoCallback, falloCallback);
```	

### Promesas en JavaScript
En primer lugar, una Promesa es un objeto. Hay 3 estados del objeto Promesa:

- Pendiente: estado inicial, antes de que la promesa tenga éxito o falle
- Resuelto: Promesa completada
- Rechazado: promesa fallida
![img](https://www.freecodecamp.org/news/content/images/2020/06/Ekran-Resmi-2020-06-06-12.21.27.png)



## Garantías
A diferencia de las funciones callback pasadas al "viejo estilo", una promesa viene con algunas garantías:

Las funciones callback nunca serán llamadas antes de la terminación de la ejecución actual del bucle de eventos de JavaScript.
Las funciones callback añadidas con then() incluso después del éxito o fracaso de la operación asíncrona serán llamadas como se mostró anteriormente.
Múltiples funciones callback pueden ser añadidas llamando a then() varias veces. Cada una de ellas es ejecutada una seguida de la otra, en el orden en el que fueron insertadas.
Una de las grandes ventajas de usar promises es el encadenamiento, explicado a continuación.

## Encadenamiento
Una necesidad común es el ejecutar dos o más operaciones asíncronas seguidas, donde cada operación posterior se inicia cuando la operación previa tiene éxito, con el resultado del paso previo. Logramos esto creando una cadena de objetos promises.

Aquí está la magia: la función then() devuelve una promesa nueva, diferente de la original:
```javascript
const promesa = hazAlgo();
const promesa2 = promesa.then(exitoCallback, falloCallback);

```
```javascript
let promesa2 = hazAlgo().then(exitoCallback, falloCallback);
```	
Esta segunda promesa (promesa2) representa no sólo la terminación de hazAlgo(), sino también de exitoCallback o falloCallback que pasaste, las cuales pueden ser otras funciones asíncronas devolviendo una promesa. Cuando ese es el caso, cualquier función callback añadida a promesa2 se queda en cola detrás de la promesa devuelta por exitoCallback o falloCallback.

Básicamente, cada promesa representa la terminación de otro paso (asíncrono on no) en la cadena.

Con las funciones modernas, adjuntamos nuestras functiones callback a las promesas devueltas, formando una cadena de promesa:
```javascript
hazAlgo().then(function(resultado) {
  return hazAlgoMas(resultado);
})
.then(function(nuevoResultado) {
  return hazLaTerceraCosa(nuevoResultado);
})
.then(function(resultadoFinal) {
  console.log('Obtenido el resultado final: ' + resultadoFinal);
})
.catch(falloCallback);
```
```javascript
hazAlgo()
.then(resultado => hazAlgoMas(valor))
.then(nuevoResultado => hazLaTerceraCosa(nuevoResultado))
.then(resultadoFinal => console.log(`Obtenido el resultado final: ${resultadoFinal}`))
.catch(falloCallback);

```

Básicamente, una cadena de promesas se detiene si hay una excepción, y recorre la cadena buscando manejadores de captura. Lo siguiente está mucho más adaptado a la forma de trabajo del código síncrono:

```javascript
try {
  let resultado = syncHazAlgo();
  let nuevoResultado = syncHazAlgoMas(resultado);
  let resultadoFinal = syncHazLaTerceraCosa(nuevoResultado);
  console.log(`Obtenido el resultado final: ${resultadoFinal}`);
} catch(error) {
  falloCallback(error);
}
```

Esta simetría con el código síncrono culmina con la mejora sintáctica async/await en ECMASCript 2017:

```javascript
async function foo() {
  try {
    let resultado = await hazAlgo();
    let nuevoResultado = await hazAlgoMas(resultado);
    let resultadoFinal = await hazLaTerceraCosa(nuevoResultado);
    console.log(`Obtenido el resultado final: ${resultadoFinal}`);
  } catch(error) {
    falloCallback(error);
  }
}
```
## Composición
Promise.resolve() y Promise.reject() son atajos para crear manualmente una promesa resuelta o rechazada respectivamente. Esto puede ser útil a veces.

Promise.all() son Promise.race() son dos herramientas de composición para ejecutar operaciones asíncronas en paralelo.

Podemos comenzar operaciones en paralelo y esperar que finalicen todas ellas de la siguiente manera:

```javascript
Promise.all([func1(), func2(), func3()])
.then(([resultado1, resultado2, resultado3]) => { /* usa resultado1, resultado2 y resultado3 */ });
```

[Documentacion](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises)


