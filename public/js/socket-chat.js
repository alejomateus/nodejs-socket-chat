var socket = io();
var params = new URLSearchParams(window.location.search);
if (!params.has('name')) {
    window.location = 'index.html';
    throw new Error('Name is required');
}
var user = {
    name: params.get('name')
};
socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('enterChat', user, function (resp) {
        console.log('Users Connected', resp);
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('createMessage', function (message) {
    console.log('Servidor:', message);
});
socket.on('personsList', function (users) {
    console.log('Servidor:', users);
});
socket