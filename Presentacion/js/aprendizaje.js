document.addEventListener("DOMContentLoaded", function() {
    // Radar chart for team confidence levels
    // Asegúrate de que Chart.js esté cargado antes de este script
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('skillRadarChart').getContext('2d');
        const skillRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Metodología Scrum',
                    'Spring Boot',
                    'Microservicios',
                    'Base de datos Oracle',
                    'AWS Cloud',
                    'Seguridad JWT'
                ],
                datasets: [{
                    label: 'Nivel Actual',
                    data: [85, 60, 55, 70, 50, 65],
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    pointBackgroundColor: 'rgba(46, 204, 113, 1)',
                    pointHoverRadius: 6,
                    borderWidth: 2
                }, {
                    label: 'Objetivo Sprint 3',
                    data: [95, 85, 80, 90, 75, 85],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                    pointHoverRadius: 6,
                    borderWidth: 2,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.6)',
                            backdropColor: 'transparent',
                            stepSize: 20,
                            max: 100,
                            min: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 12
                            },
                            boxWidth: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            size: 13
                        },
                        bodyFont: {
                            size: 12
                        },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    } else {
        console.error("Chart.js no está cargado.");
    }


    // Slide animation
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

    // Solo animar si hay más de un slide
    if (slides.length > 1) {
        setInterval(animateSlides, 3000); // Cambia cada 3 segundos
    } else if (slides.length === 1) {
        slides[0].classList.add('active'); // Asegurar que el único slide sea visible
    }

    // Navegación con teclas
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            window.location.href = 'Slide6-proyecciones.html';
        }
        // No hay navegación hacia la derecha desde la última slide en este caso
    });
});
