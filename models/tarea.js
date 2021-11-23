const { v4: uuidV4 } = require('uuid')

class Tarea {
    id = '';
    description = '';
    completed = null;

    constructor( description ){
        this.id = uuidV4();
        this.description = description;
        this.completed = null;
    }

}

module.exports = Tarea