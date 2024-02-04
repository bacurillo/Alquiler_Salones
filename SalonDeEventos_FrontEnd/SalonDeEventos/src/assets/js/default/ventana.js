function mostrarVentanaFlotante() {
    const ventanaFlotante = document.querySelector('.ventana-flotante');
    ventanaFlotante.style.display = 'flex';
    
  }

  // Función para cerrar la ventana flotante
  function cerrarVentanaFlotante() {
    const ventanaFlotante = document.querySelector('.ventana-flotante');
    ventanaFlotante.style.display = 'none';
  }

  function mostrarVentanaLogin() {
    const ventanaFlotante = document.querySelector('.ventana-flotante2');
    ventanaFlotante.style.display = 'flex';
    
  }

  // Función para cerrar la ventana flotante
  function cerrarVentanaLogin() {
    const ventanaFlotante = document.querySelector('.ventana-flotante2');
    ventanaFlotante.style.display = 'none';
  }

  function cerrarVentanaLogin3() {
    const ventanaFlotante = document.querySelector('.ventana-flotante3');
    ventanaFlotante.style.display = 'none';
  }
  function cerrarVentanaLogin4() {
    const ventanaFlotante = document.querySelector('.ventana-flotante4');
    ventanaFlotante.style.display = 'none';
  }

  function hola() {
    var swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        640: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 1
        },
        1024: {
          slidesPerView: 2
        },
        1560: {
          slidesPerView: 3
        }
      }
    });
    
  }  