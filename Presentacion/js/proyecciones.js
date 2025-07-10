document.addEventListener("DOMContentLoaded", function() {
    // Asumiendo que Mermaid se inicializa globalmente si se incluye antes de este script
    // Si no, la inicialización de Mermaid debería estar aquí o en un script global.
    // mermaid.initialize({ ... });
    // mermaid.contentLoaded(); // Esto podría ser necesario si Mermaid no se inicializa automáticamente

    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function animateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        // No incrementar currentSlide aquí si solo hay un slide o si la animación no es necesaria
    }

    // Navegación con teclas
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = 'Slide7-aprendizaje.html';
        } else if (event.key === 'ArrowLeft') {
            window.location.href = 'Slide5-avances.html';
        }
    });

    // Inicializar la animación de slides (si aplica)
    // Si solo hay un slide, la animación no tiene sentido
    if (slides.length > 1) {
       // setInterval(animateSlides, 3000); // Descomentar si se desea animación automática
       animateSlides(); // Mostrar el primer slide
    } else if (slides.length === 1) {
        slides[0].classList.add('active'); // Asegurar que el único slide sea visible
    }
});
