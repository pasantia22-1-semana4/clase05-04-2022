//crear una promesa

/* const miPromesa = new Promise((resolve, reject) => {
    let estado = false;
    if (estado) {
        resolve('Todo salio bien');
    }else{
        reject(new Error('Todo salio mal'));
    }
});

miPromesa.then(valor=>{
    console.log(valor);
}, error=>{
    console.log(error);
}) */

/// encadenamiento de promesas
/* const promesa = new Promise((resolve, reject) => {
    setTimeout(resolve,2000,5);
});
 */
/*
const promesa=()=>{
    setTimeout(()=>{
        console.log('Hola');
    },2000)
}

console.log(promesa());*/


/* 
promesa.then(valor1=>{
    console.log(valor1);
    return valor1 * 2;
}).then(valor2=>{
    console.log(valor2);
    return valor2 * 2;
}).then(valor3=>{
    console.log(valor3);
    throw new Error('Error en la promesa');
    //return valor3 * 2;
}).catch(error=>{
    console.log(error);
})

// promise.all

const primeraProceso = new Promise((resolve, reject) => {
    setTimeout(resolve,3000,'Primer proceso');
});

const segundaProceso = new Promise((resolve, reject) => {
    setTimeout(resolve,2000,'Segundo proceso');
});

const terecerProceso = new Promise((resolve, reject) => {
    setTimeout(resolve,4000,'Tercer proceso');
});

let listaProcesos = [primeraProceso, segundaProceso, terecerProceso];
/* */
/* Promise.all((listaProcesos)).then(valores=>{
    console.log(valores);
}, error=>{
    console.log(error);
});
*/ 
//promise.race
/*
Promise.race(listaProcesos).then(valor=>{
    console.log(valor)
}).catch((error)=>{
    console.log(error)
});*/


//funciones asincronas y promesa.
/* 
function primerProceso(){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,3000,'Primer proceso');
    })
}

function segundaProceso(){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,2000,'segunda proceso');
    })
}

function terceroProceso(){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,1000,'tercer proceso');
    })
}

async function llamarProcesos(){
    let resultado1 = await primerProceso();
    let resultado2 = await segundaProceso();
    let resultado3 = await terceroProceso();
    console.log(resultado1);
    console.log(resultado2);
    console.log(resultado3);
}

llamarProcesos(); */   

//finally encadenamiento de promesas
/*
const promesa = new Promise((resolve, reject) => {
    setTimeout(resolve,2000,5);
});



promesa.then(valor1=>{
   // console.log(valor1);
    return valor1 * 2;
}).then(valor2=>{
   // console.log(valor2);
    return valor2 * 2;
}).then(valor3=>{
   // console.log(valor3);
    throw new Error('Error en la promesa');
    return valor3 * 2;
}).catch(error=>{
    console.log(error);
}).finally(()=>{
    console.log('Finalizo la promesa');
});*/


//combinación de funciones asincronas y promesas

/* const primeraProceso = new Promise((resolve, reject) => {
    setTimeout(resolve,3000,5);
});

async function llamarProceso(){
    let valor = await primeraProceso;
    return valor * 2;
}

async function llamarFuncionAsincro(){
    let valor1 = await llamarProceso();
    return valor1 * 2;
}


llamarFuncionAsincro().then(valor=>{
    console.log('fin de la cadena:',valor);
},error=>{
    console.log(error);
}); */


// peticiones a servidores remotos

const https = require('https');

function requestJsonPlaceholder(){
    return new Promise((resolve, reject) => {
        https.get('https://jsonplaceholder.typicode.com/users', (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

//console.log(requestJsonPlaceholder());
//requestJsonPlaceholder()

async function hacerPeticion(){
    let result = await requestJsonPlaceholder();
    console.table(result);
    console.error()
}

hacerPeticion();