const {
    io
} = require('../server');
const {
    TicketControl
} = require('../classes/ticket-control')

const ticketControl = new TicketControl();



io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('ultimoTicket', {
        ultimo: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (callback) => {
        let ticket = ticketControl.siguiente();
        console.log(ticket);
        callback(ticket)
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                msg: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket)

        client.broadcast.emit('ultimos4', {
            "ultimos4": ticketControl.getUltimos4()
        });
    })

});