// --- LÓGICA DE LA VENTANA Y EL VIDEO ---
const modal = document.getElementById('ventana-video');
const videoPrincipal = document.getElementById('mi-video');
const btnCerrar = document.getElementById('btn-cerrar');

const botonIniciar = document.getElementById('btn-iniciar');
const botonesOpcionesSalir = document.querySelectorAll('.abrir-video');

let intervaloFrutillas = null;

// Abrir video inicial
function abrirYReproducirVideo() {
    modal.classList.remove('oculto');
    videoPrincipal.play(); 
    
    if (!intervaloFrutillas) {
        crearFrutilla(); 
        intervaloFrutillas = setInterval(crearFrutilla, 400); 
    }
}

botonIniciar.addEventListener('click', abrirYReproducirVideo);
botonesOpcionesSalir.forEach(boton => {
    boton.addEventListener('click', abrirYReproducirVideo);
});

// --- LA NUEVA TRAMPA DE LA "X" ---
btnCerrar.addEventListener('click', (e) => {
    // 1. Pausar TODOS los videos que estén reproduciéndose actualmente
    const todosLosVideos = document.querySelectorAll('video');
    todosLosVideos.forEach(vid => vid.pause());

    // 2. Crear un nuevo video
    const nuevoVideo = document.createElement('video');
    nuevoVideo.src = 'video1.mp4';
    nuevoVideo.controls = true;
    nuevoVideo.classList.add('video-clonado');
    
    // 3. Lógica para calcular una posición aleatoria SEGURA (Que no tape la X)
    const anchoVideo = 300; 
    const altoVideo = 500; // Altura aproximada de un video vertical
    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;

    let posX, posY;
    let posicionSegura = false;

    while (!posicionSegura) {
        // Generar coordenadas aleatorias dentro de la pantalla
        posX = Math.random() * (anchoPantalla - anchoVideo);
        posY = Math.random() * (altoPantalla - 200); // 200px de margen inferior

        // Definir la zona "prohibida" (Esquina superior derecha donde está la X)
        // La X está a la derecha, así que evitamos un recuadro de 350x250px en esa esquina
        const enZonaProhibida = (posX > anchoPantalla - 350) && (posY < 250);

        if (!enZonaProhibida) {
            posicionSegura = true; // Si no está en la zona de la X, aprobamos la posición
        }
    }

    // 4. Asignar las coordenadas al nuevo video
    nuevoVideo.style.left = `${posX}px`;
    nuevoVideo.style.top = `${posY}px`;

    // 5. Agregar el video a la pantalla y reproducirlo
    modal.appendChild(nuevoVideo);
    nuevoVideo.play();
});

// --- LÓGICA DE LAS FRUTILLAS CAYENDO ---
function crearFrutilla() {
    const frutilla = document.createElement('div');
    frutilla.classList.add('frutilla');
    frutilla.innerText = '🍓';
    
    frutilla.style.left = Math.random() * 100 + 'vw';
    
    const tamano = Math.random() * 1.5 + 1.5; 
    frutilla.style.fontSize = tamano + 'rem';
    
    const duracionCaida = Math.random() * 3 + 3;
    frutilla.style.animationDuration = duracionCaida + 's';
    
    document.body.appendChild(frutilla);
    
    setTimeout(() => {
        frutilla.remove();
    }, duracionCaida * 1000);
}