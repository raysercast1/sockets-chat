let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala es necesario');
};


let usuario = { nombre: params.get('nombre'), sala: params.get('sala') };


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuario conectados: ', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
//socket.emit('crearMensaje', {
// usuario: 'Rayser',
// mensaje: 'Hola Mundo'
//}, function(resp) {
// console.log('respuesta server: ', resp);
//});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cambios de usuarios
socket.on('listaPersonas', function(resp) {

    console.log(resp)

});

//Mensajes privados. Esta es la accion de escuchar por parte del cliente.
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje privado: ', mensaje);
});