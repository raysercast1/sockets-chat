const { io } = require('../server');
const { Usuarios } = require('../clases/usuario');
const { crearMensaje } = require('../utilidades/utilidades');

const usuario = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (data, callback) => {

        console.log(data)
        if (!data.nombre || !data.sala) {
            return callback({ err: true, mnsj: 'El nombre y sala es necesario' });
        };

        client.join(data.sala)

        let users = usuario.addPerson(client.id, data.nombre, data.sala);
        let personas = usuario.getPersonRoom(users.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', { Usuarios: `Usuarios conectados ${personas}` });

        callback(users);

    });

    client.on('crearMensaje', (data) => {

        let personas = usuario.getPerson(client.id)
        let mensaje = crearMensaje(personas.nombre, data.mensaje);

        client.broadcast.to(personas.sala).emit('crearMensaje', mensaje)
    });


    client.on('disconnect', () => {

        let personaBorrada = usuario.deletePerson(client.id);
        let personas = usuario.getPersonRoom(personaBorrada.sala);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administradorsh', `${personaBorrada.nombre} salio`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', { Usuarios: `Usuarios conectados ${personas}` });
    });

    //Lo que hara el server cuando alguien quiera enviar un mnsj privado.
    //Mensajes privados.
    client.on('mensajePrivado', data => {

        let persona = usuario.getPerson(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });

});