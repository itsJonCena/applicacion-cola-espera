var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);
$('h1').text("Escritorio " + escritorio);

let small = $('small');

$('button').on('click', function() {
    socket.emit('atenderTicket',{escritorio: escritorio}, function (resp) {
        if (resp === 'No hay tickets') {
            alert(resp);
            small.text(resp);
            return;
        }
        console.log(resp);
        small.text(resp.numero);
    })
});

//Conectado al servidor
socket.on('connect', function () {
    console.log('Conectado al servidor');
})

//Escucha de eventos entre servidor y cliente
socket.on('disconnect', function () {
    console.log('Se perdio la conexion con el servidor');
})

