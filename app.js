require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,pausa,leerInput,listadoBorrar,confirmar,completadoTareas} = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


// Demosatracion de iquirerMenu Manual *
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
/*
*
const main = async () => {

    let opt = '';
    do {
        opt = await mostrarMenu() 
        if(opt !== '0') await pausa();
    } while (opt !== '0');
}
 */

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    // Verifico si hay tareas en la 'bd', si hay las mando para cargarlas en un arreglo
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        // Imprime el menu
        opt = await inquirerMenu();

        // Creamos la lista de opciones
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:')
                tareas.crearTareas(desc)
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarTareasPC(true);
            break;
            case '4':
                tareas.listarTareasPC(false);
            break;
            case '5':
                const completadas = await completadoTareas(tareas.listadoArr)
                tareas.toggleCompletadas(completadas);
            break;
            case '6':
                const id = await listadoBorrar(tareas.listadoArr);
                if( id !=='0' ){
                    const ok = await confirmar('¿Esta Seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada!')
                    }
                }
            break;
        };

        guardarDB( tareas.listadoArr )
        await pausa();     

    } while (opt !== '0');
}

main();
