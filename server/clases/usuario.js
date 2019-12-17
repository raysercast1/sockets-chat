class Usuarios {

    constructor() {
        this.personas = [];
    };

    addPerson(id, nombre, sala) {

        let person = {
            id,
            nombre,
            sala
        };

        this.personas.push(person);

        return this.personas;
    };

    getPerson(id) {

        let person = this.personas.filter(pers => pers.id === id)[0];

        return person;
    };

    getAllPerson() {

        return this.personas;
    };

    getPersonRoom(sala) {

        let personasEnSala = this.personas.filter(persona => persona.sala === sala);

        return personasEnSala;
    };


    deletePerson(id) {

        let deletedUser = this.getPerson(id);

        this.personas = this.personas.filter(pers => pers.id !== id);

        return deletedUser;

    };

};

















module.exports = {
    Usuarios
}