(function ($) {

  "use strict";

  // Evento de desplazamiento de la ventana
  $(window).scroll(function () {
    // Obtenemos la posición del scroll
    var scroll = $(window).scrollTop();
    // Obtenemos la altura del texto del encabezado
    var box = $('.header-text').height();
    // Obtenemos la altura del encabezado
    var header = $('header').height();

    // Si la posición del scroll es mayor o igual a la altura del texto del encabezado menos la altura del encabezado
    if (scroll >= box - header) {
      // Añadimos la clase 'background-header' al encabezado
      $("header").addClass("background-header");
    } else {
      // Eliminamos la clase 'background-header' del encabezado
      $("header").removeClass("background-header");
    }
  });

  // Inicializamos el carrusel del equipo
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

  // Si existe el disparador del menú
  if ($('.menu-trigger').length) {
    // Añadimos un evento de clic al disparador del menú
    $(".menu-trigger").on('click', function () {
      // Alternamos la clase 'active' del disparador del menú
      $(this).toggleClass('active');
      // Alternamos la visibilidad de la navegación
      $('.header-area .nav').slideToggle(200);
    });
  }

  // Añadimos un evento de clic a los enlaces de desplazamiento a la sección
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
    // Si el pathname de la ubicación y el pathname del enlace son iguales y el hostname de la ubicación y el hostname del enlace son iguales
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Obtenemos el objetivo del enlace
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Si el objetivo existe
      if (target.length) {
        // Obtenemos el ancho de la ventana
        var width = $(window).width();
        // Si el ancho es menor a 991
        if (width < 991) {
          // Eliminamos la clase 'active' del disparador del menú
          $('.menu-trigger').removeClass('active');
          // Ocultamos la navegación
          $('.header-area .nav').slideUp(200);
        }
        // Animamos el desplazamiento al objetivo
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  // Cuando el documento esté listo
  $(document).ready(function () {
    // Añadimos un evento de desplazamiento al documento
    $(document).on("scroll", onScroll);

    // Añadimos un evento de clic a los enlaces de desplazamiento a la sección
    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
      // Prevenimos la acción por defecto del enlace
      e.preventDefault();
      // Eliminamos el evento de desplazamiento del documento
      $(document).off("scroll");

      // Eliminamos la clase 'active' de todos los enlaces de desplazamiento a la sección
      $('.scroll-to-section a').each(function () {
        $(this).removeClass('active');
      })
      // Añadimos la clase 'active' al enlace clicado
      $(this).addClass('active');

      // Obtenemos el objetivo del enlace
      var target = $(this.hash);
      // Animamos el desplazamiento al objetivo
      $('html, body').stop().animate({
        scrollTop: (target.offset().top) + 1
      }, 500, 'swing', function () {
        // Cambiamos el hash de la ubicación al hash del objetivo
        window.location.hash = this.hash;
        // Añadimos el evento de desplazamiento al documento
        $(document).on("scroll", onScroll);
      }.bind(this));
    });
  });

  // Función que se ejecuta al desplazarse
  function onScroll(event) {
    // Obtenemos la posición del desplazamiento
    var scrollPos = $(document).scrollTop();
    // Para cada enlace de la navegación
    $('.nav a').each(function () {
      // Obtenemos el enlace actual
      var currLink = $(this);
      var refElement;
      // Si el href del enlace actual empieza por '#'
      if (currLink.attr("href").startsWith("#")) {
        // Obtenemos el elemento referenciado por el enlace
        refElement = $(currLink.attr("href"));
      }
      else {
        return;
      }
      // Si la posición del elemento referenciado es menor o igual a la posición del desplazamiento y la posición del elemento referenciado más su altura es mayor a la posición del desplazamiento
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        // Eliminamos la clase 'active' de todos los enlaces de la navegación
        $('.nav ul li a').removeClass("active");
        // Añadimos la clase 'active' al enlace actual
        currLink.addClass("active");
      }
      else {
        // Eliminamos la clase 'active' del enlace actual
        currLink.removeClass("active");
      }
    });
  }

  // Cuando la ventana se haya cargado
  $(window).on('load', function () {
    // Añadimos la clase 'loaded' al preloader
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
  axios.post('https://www.palabravivaiglesia.co/api/send', {
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

// JavaScript para habilitar el botón de envío solo cuando el checkbox está marcado
document.getElementById('acceptPolicy').addEventListener('change', function () {
  const submitButton = document.getElementById('form-submit');
  if (this.checked) {
    submitButton.disabled = false;
    submitButton.classList.add('enabled');
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('enabled');
  }
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