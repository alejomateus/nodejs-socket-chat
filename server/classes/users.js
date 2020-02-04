class Users {
    constructor() {
        this.persons = [];
    }
    addPersons(id, name) {
        let person = { id, name };
        this.persons.push(person);
        return this.persons;
    }
    getPerson(id) {
        let person = this.persons.filter(person => (person.id === id))[0];
        return person;
    }
    getPersons() {
        return this.persons;
    }
    getPersonperRoom(room) {

    }
    deletePerson(id) {
        let person_deleted = this.getPerson(id);
        this.persons = this.persons.filter(person => (person.id !== id));
        return person_deleted;
    }
}
module.exports={ Users} 