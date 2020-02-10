const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');
const users = new Users();
io.on('connection', (client) => {
    client.on('enterChat', (data, callback) => {
        if (!data.name) {
            return callback({
                error: true,
                message: 'Name is required'
            })
        }
        let persons = users.addPersons(client.id, data.name);
        client.broadcast.emit('personsList', users.getPersons());
        return callback(persons);
    });
    client.on('createMessage', (data) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.emit('createMessage', message)
    })
    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson(client.id);
        client.broadcast.emit('createMessage', createMessage('Admin', `${deletedPerson.name} left the chat`));
        client.broadcast.emit('personsList', users.getPersons());
    })
});