const niveles = [nivelFacil, nivelMedio, nivelDificil]; 

const nivelFacil = [
    [3, 3, 0, 2],
    [0, 3, 0, 1],
    [2, 1, 4, 2],
    [3, 2, 2, 3]
];
const nivelMedio = [
    [3, 2, 0, 0, 3],
    [2, 1, 3, 2, 3],
    [3, 1, 4, 1, 1],
    [1, 2, 1, 3, 0],
    [3, 3, 1, 3, 3]
]
const nivelDificil = [
    [3, 0, 0, 0, 3],
    [2, 0, 0, 0, 2],
    [0, 1, 4, 1, 0],
    [2, 0, 0, 0, 2],
    [3, 0, 0, 0, 3]
];

function obtenerRutaImagen(valor) {
    switch (valor) {
        case 0:
            return "img/cableRectoApagado";
        case 1:
            return "img/cableTripleApagado.png";
        case 2:
            return "img/cableDobleApagado.png";
        case 3:
            return "img/bombilla-apagada.png"; 
        case 4:
            return "img/centroCompleto.png";
        default:
            return "";
    }
}
