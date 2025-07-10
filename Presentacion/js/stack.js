document.addEventListener("DOMContentLoaded", function() {
    // Asegúrate de que Mermaid.js esté cargado antes de este script
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: false, // No iniciar automáticamente, lo haremos manualmente
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: {
                darkMode: true,
                background: '#2c3e50', // Fondo base similar al body
                primaryColor: '#3498db', // Azul principal
                primaryTextColor: '#fff',
                primaryBorderColor: '#2980b9', // Borde azul más oscuro
                lineColor: '#9aa8b3', // Color de las líneas/flechas
                secondaryColor: '#2ecc71', // Verde para clases específicas
                tertiaryColor: '#34495e' // Color para nodos de servicio
            }
        });

        const mermaidContainers = document.querySelectorAll('.mermaid');
        const modal = document.getElementById('mermaidModal');
        const modalContent = document.getElementById('modalMermaid');
        const modalClose = document.getElementById('modalClose');

        // Función para renderizar un diagrama específico
        const renderMermaid = async (containerSelector, definition) => {
            try {
                const { svg } = await mermaid.render(containerSelector.substring(1) + '-svg', definition);
                const container = document.querySelector(containerSelector);
                if (container) {
                    container.innerHTML = svg;
                    container.style.visibility = 'visible'; // Mostrar después de renderizar
                }
            } catch (error) {
                console.error("Error rendering Mermaid diagram:", error);
                const container = document.querySelector(containerSelector);
                if (container) {
                    container.innerHTML = 'Error al renderizar el diagrama.';
                    container.style.visibility = 'visible';
                }
            }
        };

        // Renderizar el diagrama principal
        const mainDiagramContainer = document.querySelector('.mermaid');
        if (mainDiagramContainer) {
            mainDiagramContainer.style.visibility = 'hidden'; // Ocultar hasta renderizar
            const mainDiagramDefinition = mainDiagramContainer.textContent || mainDiagramContainer.innerText; // Obtener definición
            renderMermaid('.mermaid', mainDiagramDefinition);

            // Añadir evento click para el modal al diagrama principal
            mainDiagramContainer.addEventListener('click', () => {
                if (modal && modalContent && modalClose) {
                    modalContent.style.visibility = 'hidden'; // Ocultar modal hasta renderizar
                    modal.style.display = 'flex';
                    // Usar la misma definición para renderizar en el modal
                    renderMermaid('#modalMermaid', mainDiagramDefinition).then(() => {
                         modalContent.style.visibility = 'visible'; // Mostrar modal
                    });
                }
            });
        }

        // Eventos del modal
        if (modal && modalClose) {
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
                modalContent.innerHTML = ''; // Limpiar contenido al cerrar
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    modalContent.innerHTML = ''; // Limpiar contenido al cerrar
                }
            });
        }

    } else {
        console.error("Mermaid.js no está cargado.");
    }

    // Animación de slides (si aplica)
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function animateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        // No incrementar si solo hay un slide
        // currentSlide = (currentSlide + 1) % slides.length;
    }

    if (slides.length > 1) {
        // setInterval(animateSlides, 3000); // Descomentar para animación automática
        animateSlides(); // Mostrar el primer slide
    } else if (slides.length === 1) {
         slides[0].classList.add('active'); // Asegurar visibilidad
    }


    // Navegación con teclas
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            window.location.href = 'Slide5-avances.html';
        } else if (event.key === 'ArrowLeft') {
            window.location.href = 'Slide3-problematica.html';
        }
    });
});
