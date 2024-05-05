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
      var refElement = $(currLink.attr("href"));
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


//* Animaciones texto Home

var options = {
  strings: [
    "Vida",
    "Servidores",
    "Esperanza",
    "Unidos",
    "Luz",
    "Consuelo",
  ], // Frases a mostrar en secuencia
  typeSpeed: 230, // Velocidad de escritura en milisegundos
  backSpeed: 120, // Velocidad de borrado en milisegundos
  startDelay: 500, // Retraso antes de comenzar la animación en milisegundos
  loop: true, // Repetir la animación en bucle
  loopCount: Infinity, // Número de veces que se repetirá la animación en bucle (Infinity para infinito)
  showCursor: true, // Mostrar cursor de escritura
  cursorChar: '<span style="color: #2a2a2aa3;">|</span>', // Carácter del cursor de escritura
  cursorSpeed: 1000, // Velocidad de parpadeo del cursor en milisegundos
  smartBackspace: true, // Borrado inteligente, borra sólo lo que se haya escrito en la línea actual
  //fadeOut: true, // Desvanecer el texto anterior antes de escribir el siguiente
  fadeOutClass: "typed-fade-out", // Clase CSS para el desvanecimiento del texto anterior
  fadeOutDelay: 2000, // Retraso antes de desvanecer el texto anterior en milisegundos
  attr: null, // Atributos HTML a añadir al elemento de escritura (por ejemplo, {'class': 'my-class', 'data-attr': 'value'})
  bindInputFocusEvents: false, // Vincular eventos de enfoque de entrada para detener y reanudar la animación
  contentType: "html", // Tipo de contenido de las cadenas ('html' o 'null' para texto sin formato)
  onComplete: function () { }, // Función de devolución de llamada cuando se completa la animación
};

// Inicializa la animación con las opciones
var typed = new Typed("#typed-text", options);


//========= glightbox para ampliar Video Home =========
function iniciarGlightbox() {
  GLightbox({
    href: "https://youtu.be/tKyLOk2ro3g",
    type: "video",
    source: "youtube", //vimeo, youtube o local
    width: 900,
    autoplayVideos: true,
  });
}


//========= Codigo para reproducir video EN VIVO usando API de Youtube  =========
// main.js

// Haz la solicitud a nuestro servidor Express usando Axios
axios.get('/api/live')
  .then(response => {
    const data = response.data;
    // Verifica si data.liveVideoId existe
    if (data.liveVideoId) {
      // Si liveVideoId es null, usa el video predeterminado
      const videoId = data.liveVideoId === "null" ? "tKyLOk2ro3g" : data.liveVideoId;
      const videoContainer = document.querySelector('.video-content-left');
      // Inserta el video en el contenedor
      videoContainer.innerHTML = `
        <div class="col-md-12 col-12">
          <iframe class="rounded-video" width="100%" height="420" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allow-scripts; allow-same-origin" allowfullscreen></iframe>
          ${data.liveVideoId !== "null" ? '<div class="live-indicator"><span class="live-dot"></span><span>En Vivo</span></div>' : ''}
        </div>`;
    } else {
      // No hay datos válidos de transmisión en vivo, carga contenido alternativo
      const videoContainer = document.querySelector('.video-content-left');
      videoContainer.innerHTML = `
        <div class="col-md-12 col-12">
          <div class="video-content-left">
            <img src="./assets/images/video-preview.jpg" alt="" width="100%" height="420" class="img-fluid" />
            <a href="https://youtu.be/tKyLOk2ro3g" class="glightbox video"><i class="bi bi-play"></i></a>
          </div>
        </div>`;
      // Inicializa GLightbox cuando no hay un video en vivo
      iniciarGlightbox();
    }
  })
  .catch(error => {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error('Error:', error);

    // Manejo específico para el error 'web-share'
    if (error.message.includes('web-share')) {
      console.warn('La función "web-share" no es compatible o no está disponible.');
      // Implementar alternativa para compartir o mostrar un mensaje al usuario
    }

    // Si el error es debido a una respuesta no válida, muestra un mensaje adicional
    if (error.response) {
      console.error('La respuesta del servidor no fue válida:', error.response.data);
    }
  });

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

//========= Codigo para compartir en redes sociales =========
// Detectar si el usuario está en un dispositivo móvil
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Definir las URL de las redes sociales
const facebookUrl = "https://www.facebook.com/Palabra.Viva.Iglesia/";
const instagramUrl = "https://www.instagram.com/iglesia.palabraviva/";
const youtubeUrl = "https://www.youtube.com/@IglesiaCristianaPalabraViva";

// Obtener todos los botones de las redes sociales
const socialButtons = document.querySelectorAll(".social-links .social-btn");

// Iterar sobre cada botón
socialButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Prevenir el comportamiento por defecto del enlace
    event.preventDefault();

    // Si el usuario está en un dispositivo móvil, cambiar el comportamiento del enlace
    if (isMobile) {
      if (button.id === "facebook") {
        window.location.href = 'fb://facewebmodal/f?href=' + facebookUrl;
      } else if (button.id === "instagram") {
        window.location.href = 'instagram://user?username=' + instagramUrl.split('.com/')[1];
      } else if (button.id === "youtube") {
        window.location.href = 'vnd.youtube://' + youtubeUrl.split('.com/')[1];
      }
    } else {
      // Si el usuario no está en un dispositivo móvil, abrir el enlace en una nueva pestaña
      if (button.id === "facebook") {
        window.open(facebookUrl, '_blank');
      } else if (button.id === "instagram") {
        window.open(instagramUrl, '_blank');
      } else if (button.id === "youtube") {
        window.open(youtubeUrl, '_blank');
      }
    }
  });
});


// Funcionalidad del Botón de transmisión en Vivo para conectar con Calendario de Google
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', event => {
    event.preventDefault();
    const horario = event.target.getAttribute('data-horario');
    let recur, nextDate;
    const today = new Date();
    switch (horario) {
      case 'Culto - Domingos 7am':
        recur = 'FREQ=WEEKLY;BYDAY=SU'; // Cada domingo
        nextDate = getNextDayOfWeek(today, 0, 7); // 0 = domingo
        break;
      case 'Culto - Domingos 10am':
        recur = 'FREQ=WEEKLY;BYDAY=SU'; // Cada domingo
        nextDate = getNextDayOfWeek(today, 0, 10); // 0 = domingo
        break;
      case 'Oracion - Lunes a Viernes 5am':
        recur = 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'; // De lunes a viernes
        nextDate = getNextDayOfWeek(today, 1, 5); // 1 = lunes
        break;
      default:
        recur = '';
    }
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(horario)}&dates=${formatDateToGoogleCalendar(nextDate)}&details=Transmision+en+vivo&recur=${recur}`;
    window.open(url, '_blank');
  });
});

// Función para obtener el próximo día de la semana
function getNextDayOfWeek(date, dayOfWeek, hour) {
  const resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay() - (date.getHours() >= hour ? 1 : 0)) % 7);
  resultDate.setHours(hour);
  resultDate.setMinutes(0);
  resultDate.setSeconds(0);
  return resultDate;
}

// Función para formatear la fecha al formato requerido por Google Calendar
function formatDateToGoogleCalendar(date) {
  return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
}
