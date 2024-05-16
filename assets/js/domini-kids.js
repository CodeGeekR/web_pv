
// Agregamos un evento al documento para que se ejecute cuando todo el contenido DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos el icono de reproducción
    var iconoReproduccion = document.querySelector("#play-icon");

    // Seleccionamos la vista previa del video
    var vistaPreviaVideo = document.querySelector("#video-preview");

    // Seleccionamos el texto del overlay
    var texto = document.querySelector("#overlay p");

    // Agregamos un evento al icono de reproducción para que se ejecute cuando se haga clic
    iconoReproduccion.addEventListener("click", function () {

        // Creamos un nuevo elemento de video
        var video = document.createElement('video');
        // Asignamos la fuente del video
        video.src = '../assets/video/convocatoria-mastros-escuela-dominical.mp4';
        // Habilitamos los controles del video
        video.controls = true;
        // Habilitamos la reproducción automática del video
        video.autoplay = true;
        // Desactivamos el silencio del video
        video.muted = false;
        // Asignamos las clases al video
        video.className = 'img-fluid rounded video-sm';
        // Asignamos el ancho del video igual al ancho de la vista previa del video
        video.style.width = vistaPreviaVideo.offsetWidth + "px";
        // Asignamos la altura del video igual a la altura de la vista previa del video
        video.style.height = vistaPreviaVideo.offsetHeight + "px";

        // Reemplazamos la vista previa del video con el video real
        vistaPreviaVideo.parentNode.replaceChild(video, vistaPreviaVideo);

        // Ocultamos el icono de reproducción
        iconoReproduccion.style.display = "none";

        // Ocultamos el texto del overlay
        texto.style.display = "none";
    });
});