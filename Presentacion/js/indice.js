document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = 'Slide2.html';
    } else if (event.key === 'ArrowLeft') {
        // Ir al índice de contenidos si se presiona izquierda en la portada
        window.location.href = 'contents.html'; // Cambiado
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function animateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        // No incrementar currentSlide si solo hay un slide
        // currentSlide = (currentSlide + 1) % slides.length;
    }

    // Solo animar si hay más de un slide
    if (slides.length > 1) {
       // setInterval(animateSlides, 5000); // Cambia cada 5 segundos (descomentar si se desea)
       animateSlides(); // Mostrar el primer slide
    } else if (slides.length === 1) {
        slides[0].classList.add('active'); // Asegurar que el único slide sea visible
    }
});
