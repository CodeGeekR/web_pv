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

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $('html, body').stop().animate({
        scrollTop: (target.offset().top) + 1
      }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
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
    "Fé",
    "Esperanza",
    "Comunidad",
    "Servicio",
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
    href: "https://www.youtube.com/watch?v=NXmm4YitT_A",
    type: "video",
    source: "youtube", //vimeo, youtube o local
    width: 900,
    autoplayVideos: true,
  });
}


//========= Codigo para reproducir video EN VIVO usando API de Youtube  =========
// main.js

// Haz la solicitud a nuestro servidor Express
fetch('/youtube')
  .then(response => response.json())
  .then(data => {
    const liveBroadcast = data.items[0];
    if (liveBroadcast) {
      // Hay una transmisión en vivo
      const liveVideoId = liveBroadcast.id.videoId;
      // Reemplaza el video actual con la transmisión en vivo
      const videoContainer = document.querySelector('.video-content-left');
      videoContainer.innerHTML = `
  <div class="col-md-12 col-12">
    <iframe width="100%" height="420" src="https://www.youtube.com/embed/${liveVideoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="live-indicator">
      <span class="live-dot"></span>
      <span>En Vivo</span>
    </div>
  </div>
`;
    } else {
      // No hay una transmisión en vivo, muestra el video actual
      const videoContainer = document.querySelector('.video-content-left');
      videoContainer.innerHTML = `
        <div class="col-md-12 col-12">
          <div class="video-content-left">
            <img src="./assets/images/video-preview.jpg" alt="" width="100%" height="420" class="img-fluid" />
            <a href="https://www.youtube.com/watch?v=NXmm4YitT_A" class="glightbox video"><i class="bi bi-play"></i></a>
          </div>
        </div>
      `;
      // Inicializa GLightbox cuando no hay un video en vivo
      iniciarGlightbox();
    }
  })
  .catch(error => {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error('Error:', error);
  });



// // Inicializa axios con la URL de la API de YouTube y los parámetros de la solicitud
// const api = axios.create({
//   baseURL: 'https://www.googleapis.com/youtube/v3/search',
//   params: {
//     part: 'snippet',
//     channelId: 'UCuRnuWVbzk8snPqZAmuna4w',
//     eventType: 'live',
//     type: 'video',
//     key: process.env.YOUTUBE_API_KEY
//   }
// });

// // Haz la solicitud a la API de YouTube
// api.get()
//   .then(response => {
//     const liveBroadcast = response.data.items[0];
//     if (liveBroadcast) {
//       // Hay una transmisión en vivo
//       const liveVideoId = liveBroadcast.id.videoId;
//       // Reemplaza el video actual con la transmisión en vivo
//       const videoContainer = document.querySelector('.video-content-left');
//       videoContainer.innerHTML = `
//   <div class="col-md-12 col-12">
//     <iframe width="100%" height="420" src="https://www.youtube.com/embed/${liveVideoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//     <div class="live-indicator">
//       <span class="live-dot"></span>
//       <span>En Vivo</span>
//     </div>
//   </div>
// `;
//     } else {
//       // No hay una transmisión en vivo, muestra el video actual
//       const videoContainer = document.querySelector('.video-content-left');
//       videoContainer.innerHTML = `
//         <div class="col-md-12 col-12">
//           <div class="video-content-left">
//             <img src="./assets/images/video-preview.jpg" alt="" width="100%" height="420" class="img-fluid" />
//             <a href="https://www.youtube.com/watch?v=NXmm4YitT_A" class="glightbox video"><i class="bi bi-play"></i></a>
//           </div>
//         </div>
//       `;
//       // Inicializa GLightbox cuando no hay un video en vivo
//       iniciarGlightbox();
//     }
//   })
//   .catch(error => {
//     // Maneja cualquier error que ocurra durante la solicitud
//     console.error('Error al obtener la transmisión en vivo:', error);
//   });