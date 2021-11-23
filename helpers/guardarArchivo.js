const fs = require('fs');

const archivo = './db/tareas.json';

const guardarDB = ( data ) =>{
    fs.writeFileSync( archivo, JSON.stringify(data) ) //El argumento a escribir tiene que ser un string
}

const leerDB = () =>{
    if(!fs.existsSync(archivo)){
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding:'utf-8'})
    const data = JSON.parse(info)
    return data;
}

module.exports = {
    guardarDB,
    leerDB,
}