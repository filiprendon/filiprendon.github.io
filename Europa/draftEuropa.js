const gridSize = 5;

const imageNames = [
  // CABLES RECTOS
  { valor: 0, imagenes: ["img/recto1.png", "img/recto2.png"] },

  // BOMBILLAS
  { valor: 1, imagenes: ["img/bombilla1.png", "img/bombilla2.png", "img/bombilla3.png", "img/bombilla4.png"] },

  // CABLES DOBLES
  { valor: 2, imagenes: ["img/doble1.png", "img/doble2.png", "img/doble3.png", "img/doble4.png"] },

  // CABLES TRIPLES
  { valor: 3, imagenes: ["img/triple1.png", "img/triple2.png", "img/triple3.png", "img/triple4.png"] },

  // CENTRO
  { valor: 4, imagenes: ["img/centro1.png", "img/centro2.png", "img/centro3.png", "img/centro4.png"] }
];

const juegoTablero = [
  [1, 1, 1, 2, 1],
  [0, 3, 2, 3, 1],
  [0, 3, 4, 3, 2],
  [3, 2, 3, 1, 0],
  [1, 1, 2, 1, 2]
];

const solucionReal = [
  [0, 0, 0, 0, 1],
  [1, 3, 2, 3, 1],
  [1, 3, 0, 2, 1],
  [3, 2, 3, 1, 1],
  [2, 3, 2, 3, 2]
];

const constantes = {
  tamanoBoton: 100,
};
const solucion = [
    ["img/bombilla1.png", "img/bombilla1.png", "img/bombilla1.png", "img/doble1.png", "img/bombilla2.png"],
    ["img/recto2.png", "img/triple4.png", "img/doble3.png", "img/triple4.png", "img/bombilla2.png"],
    ["img/recto2.png", "img/triple4.png", "img/centro1.png", "img/triple3.png", "img/doble2.png"],
    ["img/triple4.png", "img/doble3.png", "img/triple4.png", "img/bombilla2.png", "img/recto2.png"],
    ["img/bombilla3.png", "img/bombilla4.png", "img/doble3.png", "img/bombilla4.png", "img/doble3.png"]
]

const imagenesSolucion = [
    ["img/b4.png", "img/b4.png", "img/b4.png", "img/d2.png", "img/b2.png"],
    ["img/r1.png", "img/t4.png", "img/d4.png", "img/t4.png", "img/b2.png"],
    ["img/r1.png", "img/t4.png", "img/centro1.png", "img/t1.png", "img/d1.png"],
    ["img/t4.png", "img/d4.png", "img/t4.png", "img/b2.png", "img/r1.png"],
    ["img/b5.png", "img/b1.png", "img/d4.png", "img/b1.png", "img/d4.png"]
];


const contadores = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
const botones = Array.from({ length: gridSize }, () => Array(gridSize).fill(null)); // Inicializa la matriz de botones


// Inicialización
inicializar();

function inicializar() {
    for (let i = 0; i < gridSize; i++) {
        botones[i] = [];
        for (let j = 0; j < gridSize; j++) {
            // Cambia la inicialización de contadores con números aleatorios
            contadores[i][j] = Math.floor(Math.random() * imageNames[juegoTablero[i][j]].imagenes.length);
            crearBoton(i, j);
        }
    }

    let a;
    // Asignar valores al array de solución basado en el tablero
    for (let i = 0; i < gridSize; i++) {
        solucion[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const numeroArray = juegoTablero[i][j];
            const imagenIndex = contadores[i][j]; // Usa el índice actual de contadores
            solucion[i][j] = imageNames[numeroArray].imagenes[imagenIndex];
        }
    }
}

// Creo los botones y los añado a la clase box

function crearBoton(i, j) {
    const button = document.createElement("button");
    button.classList.add("box");

    const image = document.createElement("img");
    const numeroArray = juegoTablero[i][j];

    const imagenIndex = contadores[i][j];
    const imagen = imageNames[numeroArray].imagenes[imagenIndex];

    image.src = imagen;
    image.style.width = `${constantes.tamanoBoton}px`;
    image.style.height = `${constantes.tamanoBoton}px`;

    button.appendChild(image);

    button.onclick = function () {
        contadores[i][j] = (contadores[i][j] + 1) % imageNames[numeroArray].imagenes.length;
        actualizarImagen(i, j);
        reproducirSonido();
    };

    container.appendChild(button);
    botones[i][j] = button;
}

function reproducirSonido() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0;
    clickSound.play();
}


function actualizarSolucion() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const numeroArray = juegoTablero[i][j];
            const imagenIndex = contadores[i][j];
            solucion[i][j] = imageNames[numeroArray].imagenes[imagenIndex];
        }
    }
}
  
function verificarSolucion() {
  for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
          if (solucionReal[i][j] !== contadores[i][j]) {
              // Si hay alguna discrepancia, la solución no es correcta
              return false;
          }
      }
  }

  // Si no se encontraron discrepancias, la solución es correcta
  return true;
}
function actualizarImagen(i, j) {
    const numeroArray = juegoTablero[i][j];
    const imagenIndex = contadores[i][j];
    const nuevaImagen = imageNames[numeroArray].imagenes[imagenIndex];

    // Actualiza la imagen en el botón
    botones[i][j].querySelector('img').src = nuevaImagen;

    // Verifica si la solución es correcta
    if (verificarSolucion()) {
        mostrarSolucion(); // Muestra las imágenes iluminadas
    }
}

function mostrarSolucion() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            // Cambio las img para poner las que están iluminadas
            botones[i][j].querySelector('img').src = imagenesSolucion[i][j];
        }
    }

   document.getElementById('score').innerHTML = 100;
    setTimeout(function () {
        mostrarPopupSolucion(); 
    }, 800);
}




// Funciones para abrir y cerrar el Pop Up
function openPopup() {
    console.log("Opening popup");
    document.getElementById('infoPopup').style.display = 'block';
}

function closePopup() {
    console.log("Closing popup");
    document.getElementById('infoPopup').style.display = 'none';
}

function mostrarPopupSolucion() {
    document.getElementById('pupsolucion').style.display = 'block';
}

function paginaPrincipal() {
    window.location.href = '../LandingPage.php';
}

function cerrarPopup(){
    document.getElementById('pupsolucion').style.display = 'none';
}

function siguienteNivel() {
    window.location.href = './draftEuropa.html';
}

function volverAJugar() {
    
    cerrarPopup();
    location.reload();
}