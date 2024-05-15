(function ($) {

    "use strict";

    // Header Type = Fixed
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height();
        var header = $('header').height();

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }
    });


    $('.owl-our-team').owlCarousel({
        items: 3,
        loop: true,
        dots: true,
        nav: false,
        autoplay: true,
        margin: 0,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1600: {
                items: 3
            }
        }
    })


    // Menu Dropdown Toggle
    if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click', function () {
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }


    // Menu elevator animation
    $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var width = $(window).width();
                if (width < 991) {
                    $('.menu-trigger').removeClass('active');
                    $('.header-area .nav').slideUp(200);
                }
                $('html,body').animate({
                    scrollTop: (target.offset().top) + 1
                }, 700);
                return false;
            }
        }
    });

    $(document).ready(function () {
        $(document).on("scroll", onScroll);

        //smoothscroll
        $('.scroll-to-section a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('.scroll-to-section a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');

            var target = $(this.hash);
            $('html, body').stop().animate({
                scrollTop: (target.offset().top) + 1
            }, 500, 'swing', function () {
                // Actualiza la URL con la cadena this.hash en lugar del objeto jQuery target
                window.location.hash = this.hash;
                $(document).on("scroll", onScroll);
            }.bind(this));  // Asegura que this se refiere al enlace clicado
        });
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('.nav a').each(function () {
            var currLink = $(this);
            var refElement;
            // Verifica si el href es una URL interna
            if (currLink.attr("href").startsWith("#")) {
                refElement = $(currLink.attr("href"));
            }
            // Si el href no es una URL interna, no intenta seleccionarlo
            else {
                return;
            }
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }



    // Page loading animation
    $(window).on('load', function () {

        $('#js-preloader').addClass('loaded');

    });



    // Window Resize Mobile Menu Fix
    function mobileNav() {
        var width = $(window).width();
        $('.submenu').on('click', function () {
            if (width < 767) {
                $('.submenu ul').removeClass('active');
                $(this).find('ul').toggleClass('active');
            }
        });
    }

})(window.jQuery);

//========= Codigo para enviar formulario de contacto =========
// Enviar los datos cuando el usuario envíe el formulario
document.getElementById('contact').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtiene los campos del formulario
    var name = document.querySelector('#name').value;
    var lastname = document.querySelector('#lastname').value;
    var email = document.querySelector('#email').value;
    var message = document.querySelector('#message').value;

    // Verifica que todos los campos estén llenos
    if (!name || !lastname || !email || !message) {
        Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios.',
            icon: 'error',
            customClass: {
                confirmButton: 'btn-alert-contact'
            }
        });
        return;
    }

    // Si todos los campos están llenos, procede con el envío del formulario
    axios.post('https://pv-samuraidevs-projects.vercel.app/api/send', {
        name: name,
        lastname: lastname,
        email: email,
        message: message,
        subject: 'Mensaje de la Web PV'
    })
        .then(function (response) {
            Swal.fire({
                title: '¡Enviado!',
                text: 'Tu mensaje fue enviado con éxito.',
                icon: 'success',
                iconColor: '#22C9BE',
                customClass: {
                    confirmButton: 'btn-alert-contact'
                }
            })
        })
        .catch(function (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al enviar tu mensaje.',
                icon: 'error',
                customClass: {
                    confirmButton: 'btn-alert-contact'
                }
            })
        });
});


// Código para enviar mensaje de WhatsApp
function addChatWp() {
    // Selecciona el botón de WhatsApp
    var botonWhatsApp = document.querySelector("#whatsapp");

    // Agrega un evento de clic al botón
    botonWhatsApp.addEventListener("click", function (event) {
        // Previene la acción por defecto del botón
        event.preventDefault();
        // Define el mensaje personalizado que se enviará
        var mensaje = "Hola, me gustaría dejar una petición de oración:";
        // Codifica el mensaje para usarlo en una URL
        var mensajeCodificado = encodeURIComponent(mensaje);
        // Abre una nueva pestaña con la URL de WhatsApp y el mensaje codificado
        window.open("https://api.whatsapp.com/send?phone=+573208173036&text=" + mensajeCodificado, "_blank");
    });
}

// Agrega el evento de carga a la ventana para ejecutar la función addChatWp
window.addEventListener("load", addChatWp);

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el icono de reproducción
    var iconoReproduccion = document.querySelector("#play-icon");

    // Selecciona la imagen de vista previa del video
    var vistaPreviaVideo = document.querySelector("#video-preview");

    // Selecciona el texto
    var texto = document.querySelector("#overlay p");

    // Agrega un evento de clic al icono de reproducción
    iconoReproduccion.addEventListener("click", function () {
        // Crea un nuevo elemento de video
        var video = document.createElement('video');
        video.src = '../assets/video/convocatoria-mastros-escuela-dominical.mp4';
        video.controls = true;
        video.autoplay = true;
        video.muted = false;
        video.className = 'img-fluid rounded video-sm';
        video.style.width = vistaPreviaVideo.offsetWidth + "px"; // Asegura que el video tenga la misma anchura que la imagen
        video.style.height = vistaPreviaVideo.offsetHeight + "px"; // Asegura que el video tenga la misma altura que la imagen

        // Reemplaza la imagen de vista previa con el video
        vistaPreviaVideo.parentNode.replaceChild(video, vistaPreviaVideo);

        // Oculta el icono
        iconoReproduccion.style.display = "none";
        // Oculta el texto
        texto.style.display = "none";
    });
});