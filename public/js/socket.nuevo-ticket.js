var socket = io();

let labelNuevo = $('#lblNuevoTicket');


//Conectado al servidor
socket.on('connect', function () {
    console.log('Conectado al servidor');
})

//Escucha de eventos entre servidor y cliente
socket.on('disconnect', function () {
    console.log('Se perdio la conexion con el servidor');
})

socket.on('ultimoTicket', function (data) {
    labelNuevo.text(data.ultimo);
})

$('#generarTicket').on('click', function (){
    socket.emit('siguienteTicket', function (ticket) {
        labelNuevo.text(ticket);
        console.log(ticket);
    })
})
