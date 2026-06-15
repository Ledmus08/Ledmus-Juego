const modal = document.getElementById('ventana-video');
const videoPrincipal = document.getElementById('mi-video');
const btnCerrar = document.getElementById('btn-cerrar');
const botonIniciar = document.getElementById('btn-iniciar');
const botonesOpcionesSalir = document.querySelectorAll('.abrir-video');

let intervaloFrutillas = null;

function abrirYReproducirVideo() {
    modal.classList.remove('oculto');
    const urlActual = videoPrincipal.src;
    if (urlActual.includes("autoplay=0")) {
        videoPrincipal.src = urlActual.replace("autoplay=0", "autoplay=1");
    }
    if (!intervaloFrutillas) {
        crearFrutilla(); 
        intervaloFrutillas = setInterval(crearFrutilla, 400); 
    }
}

botonIniciar.addEventListener('click', abrirYReproducirVideo);
botonesOpcionesSalir.forEach(boton => {
    boton.addEventListener('click', abrirYReproducirVideo);
});

btnCerrar.addEventListener('click', (e) => {
    // 1. Crear nuevo video
    const nuevoVideo = document.createElement('iframe');
    // Para evitar el mute automático, es obligatorio que el usuario interactúe.
    // Usamos el ID del video y forzamos autoplay
    nuevoVideo.src = 'https://www.youtube.com/embed/yMnHP8M2zfw?autoplay=1';
    nuevoVideo.classList.add('video-clonado');
    nuevoVideo.frameBorder = "0";
    nuevoVideo.allow = "autoplay; encrypted-media";
    
    // 2. Tamaño grande
    const anchoVideo = 400; 
    const altoVideo = 225;
    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;

    let posX, posY, posicionSegura = false;

    // 3. Cálculo de posición segura (evitando esquina superior derecha)
    while (!posicionSegura) {
        posX = Math.random() * (anchoPantalla - anchoVideo - 50);
        posY = Math.random() * (altoPantalla - altoVideo - 50);

        // Zona prohibida: esquina superior derecha (X)
        const enZonaProhibida = (posX > anchoPantalla - 450) && (posY < 300);

        if (!enZonaProhibida) {
            posicionSegura = true;
        }
    }

    nuevoVideo.style.left = `${posX}px`;
    nuevoVideo.style.top = `${posY}px`;
    nuevoVideo.style.width = `${anchoVideo}px`;
    nuevoVideo.style.height = `${altoVideo}px`;

    modal.appendChild(nuevoVideo);
});

function crearFrutilla() {
    const frutilla = document.createElement('div');
    frutilla.classList.add('frutilla');
    frutilla.innerText = '🍓';
    frutilla.style.left = Math.random() * 100 + 'vw';
    const duracionCaida = Math.random() * 3 + 3;
    frutilla.style.animationDuration = duracionCaida + 's';
    document.body.appendChild(frutilla);
    setTimeout(() => frutilla.remove(), duracionCaida * 1000);
}
