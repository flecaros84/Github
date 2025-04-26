document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        window.location.href = 'Slide4.html';
    } else if (event.key === 'ArrowLeft') {
        window.location.href = 'Slide2.html';
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
        currentSlide = (currentSlide + 1) % slides.length;
    }

    setInterval(animateSlides, 3000); // Cambia cada 3 segundos
});
