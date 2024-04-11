//ACCIONES
$(document).ready(function () {
    cargarPagina();

    $("#btn_aceptar").click(function () {
        let inp_url = $("#inp_url").val();
        cargarCodigoQr(inp_url);
    });

    $("#btn_aceptar_cb").click(function () {
        let inp_url_cb = $("#inp_url_cb").val();
        cargarCodigoBarras(inp_url_cb);
    });
});


//FUNCIONES
function cargarPagina() { 
    cargarCodigoQr();
    cargarCodigoBarras();
}

function cargarCodigoQr(texto = 'https://www.ejemplo.com'){
    let canvas = document.getElementById('qrCodeCanvas');
    limpiarCanvas(canvas);
    let qr = qrcode(0, 'L'); // Crear un objeto qrcode con nivel de corrección L (Low)

    let text = texto; // El texto que deseas codificar en el QR
    qr.addData(text);
    qr.make();

    let ctx = canvas.getContext('2d'); //Obtener manipulacion del canva
    let modules = qr.getModuleCount(); // Obtener la cantidad de módulos (píxeles) en el código QR

    // Ajustar la escala del código QR en función del tamaño del canvas
    let scale = canvas.width / modules;

    // Dibujar el código QR en el canvas
    for (let row = 0; row < modules; row++) {
        for (let col = 0; col < modules; col++) {
            if (qr.isDark(row, col)) {
                ctx.fillStyle = '#000000'; // Colorear módulo oscuro
                ctx.fillRect(col * scale, row * scale, scale, scale); // Dibujar un rectángulo
            }
        }
    }
}

function limpiarCanvas(canvas) {
    //Esta funcion deja en blanco el canvas para que se pueda dibujar algo nuevo correctamente
    //al cambiar de texto
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function cargarCodigoBarras(texto = 'ABC-abc-123') {
    JsBarcode("#cbCodeCanvas", texto);
}
