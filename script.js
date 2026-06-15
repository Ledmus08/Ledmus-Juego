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
    const todosLosVideos = document.querySelectorAll('iframe');
    todosLosVideos.forEach(ifr => {
        ifr.src = ifr.src.replace("autoplay=1", "autoplay=0");
    });

    const nuevoVideo = document.createElement('iframe');
    // IMPORTANTE: Cambia ID_DEL_VIDEO aquí también
    nuevoVideo.src = 'https://www.youtube.com/embed/yMnHP8M2zfw?autoplay=1&mute=1';
    nuevoVideo.classList.add('video-clonado');
    nuevoVideo.frameBorder = "0";
    nuevoVideo.allow = "autoplay";
    
    const anchoVideo = 300; 
    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;
    let posX, posY, posicionSegura = false;

    while (!posicionSegura) {
        posX = Math.random() * (anchoPantalla - anchoVideo);
        posY = Math.random() * (altoPantalla - 200);
        if (!(posX > anchoPantalla - 350 && posY < 250)) posicionSegura = true;
    }

    nuevoVideo.style.left = `${posX}px`;
    nuevoVideo.style.top = `${posY}px`;
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
