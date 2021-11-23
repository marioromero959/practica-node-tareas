const inquirer = require('inquirer');
require('colors')

const opciones = [
    {
        type:'list',
        name:'opcion',
        message:'¿Que desea hacer?',
        choices: [
            {
            value:'1',
            name:'1. Crear tarea'
            },
            {
            value:'2',
            name:'2. Listar tareas'
            },
            {
            value:'3',
            name:'3. Listar tareas completadas'
            },
            {
            value:'4',
            name:'4. Listar tareas pendientes'
            },
            {
            value:'5',
            name:'5. Completar tareas'
            },
            {
            value:'6',
            name:'6. Borrar tarea'
            },
            {
            value:'0',
            name:'0. Salir'
            },
        ]
    }
]

const inquirerMenu = async() =>{
    console.clear()
    console.log('====================='.green)
    console.log('Seleccione una opcion')
    console.log('=====================\n'.green)
    const { opcion } = await inquirer.prompt(opciones);
    return opcion; 
}

const pausa = async() =>{
    const question =
    {
        type:'input',
        name:'input',
        message:`Presione ${'Enter'.green} para continuar.`
    }
    console.log('\n')

    const { input } = await inquirer.prompt(question)
    return input;
}


const leerInput = async( message ) =>{
    // La pregunta que se le muestra al usuario
    const pregunta = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value){ //Se pide un valor al usuario
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(pregunta); //Retornamos el value o el por favor ingrese un valor
    return desc
}

// Creamos el menu de las tareas a borrar
const listadoBorrar = async(tareas = []) => {
    const opciones = tareas.map( (tarea,i) =>{
        const idx = i + 1;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.description}`
        };
    });

    opciones.unshift({
        value: '0',
        name: 'Cancelar'
    })

const preguntas = [
    {
        type:'list',
        name:'id',
        message:'Borrar',
        choices:opciones 
    }
]

const { id } = await inquirer.prompt(preguntas);
return id;
}
// Preguntar al usuario si esta seguro de borrar
const confirmar = async( message ) =>{
    const question = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]
const { ok } = await inquirer.prompt(question);
return ok;
}

const completadoTareas = async(tareas = []) => {
    const opciones = tareas.map( (tarea,i) =>{
        return {
            value: tarea.id,
            name: ` ${i}. ${tarea.description}`,
            checked:(tarea.completed) ? true : false 
        };
    });

const pregunta = [
    {
        type:'checkbox',
        name:'ids',
        message:'Seleccione',
        choices:opciones 
    }
]

const { ids } = await inquirer.prompt(pregunta);
return ids;
}

module.exports = {    
inquirerMenu,
pausa,
leerInput,
listadoBorrar,
confirmar,
completadoTareas
}