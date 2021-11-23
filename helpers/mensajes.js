require('colors');

const mostrarMenu = () =>{

    return new Promise(resolve=>{
        console.clear()
        console.log('====================='.green)
        console.log('Seleccione una opcion')
        console.log('=====================\n'.green)
    
        console.log(`${'1'.green}. Crear Tarea`)
        console.log(`${'2'.green}. Listar Tareas`)
        console.log(`${'3'.green}. Listar Tareas completadas`)
        console.log(`${'4'.green}. Listar Tareas pendientes`)
        console.log(`${'5'.green}. Completar Tareas(s)`)
        console.log(`${'6'.green}. Borrar Tarea`)
        console.log(`${'0'.green}. Salir \n`)
    
        // Creamos la interface con la que el usuario va a ingresar la informacion y la va a recibir(son paquetes de node)
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout,
        });
        
        // Pregunta al usuario
        readline.question('Seleccione una opcion: ',(opt) =>{
            resolve(opt);
            readline.close(); //Hay que cerrarlo porque sino se queda esperando a que ingrese la opcion siempre
        })
    })

}

const pausa = ()=>{
    return new Promise((resolve) => {    
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout,
        });
        readline.question(`\nPresione ${'ENTER'.blue} para continuar.\n`,(opt) =>{
            readline.close();
            resolve()
        })
    })
}



module.exports = {
    mostrarMenu,
    pausa,
}