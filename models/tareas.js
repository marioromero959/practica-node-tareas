const Tarea = require('../models/tarea');
require('colors');


class Tareas{
    _listado = {}
    // El get es una funcion que se puede usar como propedad de la clase
    // Aca convertimos el objeto en un arreglo de las tareas
    get listadoArr(){
        const listado = []
        Object.keys(this._listado).forEach(key =>{ //Este metodo puede extraer las llaves del objeto en forma de array
            const tarea = this._listado[key]; //Obtenemos la tarea segun su key (En este caso por su id)
            listado.push(tarea) //Agregamos la tarea al array 
        })
        return listado;
    }

    constructor() {
        this._listado = {}
    }


    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }


    // Recibo las tareas de la bd y las recorro, creo una key de listado con cada una 
    cargarTareasFromArray( tareas = [] ){
    tareas.forEach(tarea =>{
        this._listado[tarea.id] = tarea; //Aca guardo cada tarea en el listado
    })
    }

// Recibimos la descripcion de  la tarea
    crearTareas( description ){
        const tarea = new Tarea(description)
        this._listado[tarea.id] = tarea //Insertamos una nueva propiedad al objeto listado, el id random
    }

    listadoCompleto(){
        console.log()
        this.listadoArr.forEach((tarea,i) =>{
            const id = `${i+1}`.green;
            const {  description, completed } = tarea
            const estado = (completed) ? `${completed}`.green : `${completed}`.red
            console.log(id,description,estado)
        })
    }
    // Listamos las tareas completadas y no completadas
    listarTareasPC(completadas = true){
        console.log()
        let cont = 0;
        this.listadoArr.forEach((tarea) =>{
            const {  description, completed } = tarea
            const estado = (completed) ? `${completed}`.green : `${completed}`.red
            if(completed && completadas){
                cont = cont + 1
                console.log(cont,description,estado)
            }else if(!completed && !completadas){
                cont = cont +  1;
                console.log(cont,description,estado)
            }

        })
    }
    // Verificamos si esta completada y le asignamos la fecha
    toggleCompletadas(ids = []){
        ids.forEach(id =>{  //Las que no estan completadas
            const tarea = this._listado[id]
            if(!tarea.completed){
                tarea.completed = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completed = null;
            }
        })
    } 
}

module.exports = Tareas;