document.addEventListener('DOMContentLoaded', function() {
    initFuturisticReviews();
    initProductImageEffects();
    initStarRatingAnimation();
    initScrollAnimations();
    initStockControl();
    
    // Nuevas funcionalidades
    initColorToggle();
    initSpecsDropdown();
    enhanceStockControl();
});

/**
 * Inicializa los efectos futuristas para las reseñas
 */
function initFuturisticReviews() {
    // Seleccionar todos los elementos de reseña
    const reviewItems = document.querySelectorAll('.review-item');
    
    // Aplicar efectos a cada reseña
    reviewItems.forEach((review, index) => {
        // Añadir clase para estilos base
        review.classList.add('review-futuristic');
        
        // Añadir efecto de aparición con retraso basado en el índice
        review.style.animationDelay = `${index * 0.15}s`;
        
        // Añadir evento hover para efecto de brillo
        review.addEventListener('mouseenter', function() {
            this.classList.add('review-glow');
        });
        
        review.addEventListener('mouseleave', function() {
            this.classList.remove('review-glow');
        });
    });
    
    // Mejorar el resumen de reseñas con efecto de contador
    const ratingElement = document.querySelector('.review-summary .display-4');
    if (ratingElement) {
        const targetRating = parseFloat(ratingElement.textContent);
        animateCounter(ratingElement, 0, targetRating, 1500);
    }
}

/**
 * Anima un contador desde un valor inicial hasta un valor objetivo
 */
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = progress * (end - start) + start;
        element.textContent = value.toFixed(1);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Inicializa efectos para las imágenes del producto
 */
function initProductImageEffects() {
    // Efecto de zoom suave en hover para las imágenes del carrusel
    const carouselImages = document.querySelectorAll('#productImageCarousel .carousel-item img');
    carouselImages.forEach(img => {
        img.classList.add('product-image-zoom');
    });
    
    // Efecto de paralaje para las miniaturas
    const thumbnails = document.querySelectorAll('.carousel-thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 5;
            const moveY = (y - centerY) / centerY * 5;
            
            this.style.transform = `perspective(300px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        thumb.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(300px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * Inicializa animaciones mejoradas para la calificación por estrellas
 */
function initStarRatingAnimation() {
    const stars = document.querySelectorAll('#writeReviewForm .rating-stars > i');
    
    stars.forEach((star, index) => {
        // Efecto de hover mejorado
        star.addEventListener('mouseenter', function() {
            // Iluminar esta estrella y todas las anteriores
            for (let i = 0; i <= index; i++) {
                stars[i].classList.remove('bi-star', 'text-muted');
                stars[i].classList.add('bi-star-fill', 'text-warning');
                
                // Añadir clase para animación de pulso
                stars[i].classList.add('star-pulse');
            }
        });
        
        // Restaurar estado original al salir, a menos que se haya seleccionado
        star.addEventListener('mouseleave', function() {
            stars.forEach(s => s.classList.remove('star-pulse'));
            
            // Solo restauramos si no hay una calificación seleccionada
            const currentRating = parseInt(document.getElementById('reviewRating').value) || 0;
            if (currentRating === 0) {
                setRating(0); // Usar la función existente para resetear
            } else {
                setRating(currentRating); // Restaurar a la calificación seleccionada
            }
        });
        
        // Mejorar el evento de clic existente
        star.onclick = function() {
            const rating = index + 1;
            setRating(rating);
            
            // Añadir efecto de confirmación
            stars.forEach(s => s.classList.remove('star-confirm'));
            setTimeout(() => {
                for (let i = 0; i < rating; i++) {
                    stars[i].classList.add('star-confirm');
                }
            }, 50);
        };
    });
}

/**
 * Inicializa animaciones basadas en el scroll
 */
function initScrollAnimations() {
    // Detectar elementos que deben animarse al hacer scroll
    const animatedElements = document.querySelectorAll('.product-brand, h1.mb-1.h2, .price-final, .discount-badge, .feature-box');
    
    // Configurar el observador de intersección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, {
        threshold: 0.2 // Activar cuando al menos el 20% del elemento es visible
    });
    
    // Observar cada elemento
    animatedElements.forEach(el => {
        el.classList.add('will-animate'); // Clase base para elementos que se animarán
        observer.observe(el);
    });
}

/**
 * Inicializa la funcionalidad de control de stock
 */
function initStockControl() {
    // Configuración de stock por tienda
    const storeStock = {
        santiago: 7,
        concepcion: 5
    };

    // Función para actualizar la información de stock
    function updateStockInfo() {
        const storeSelect = document.getElementById('storeSelect');
        const stockInfo = document.getElementById('stockInfo');
        const stockAmount = document.getElementById('stockAmount');
        const stockError = document.getElementById('stockError');
        
        // Ocultar mensaje de error si está visible
        stockError.classList.add('d-none');
        
        if (storeSelect.value) {
            const selectedStore = storeSelect.value;
            const availableStock = storeStock[selectedStore];
            const storeName = selectedStore.charAt(0).toUpperCase() + selectedStore.slice(1);
            
            stockAmount.innerHTML = `<i class="bi bi-check-circle-fill text-success me-1"></i>Stock disponible en ${storeName}: <strong>${availableStock} unidades</strong>`;
            stockInfo.classList.remove('d-none');
        } else {
            stockInfo.classList.add('d-none');
        }
    }

    // Función para actualizar la cantidad
    function updateQuantity(change) {
        const quantityInput = document.getElementById('quantityInput');
        const storeSelect = document.getElementById('storeSelect');
        const stockError = document.getElementById('stockError');
        
        let currentQuantity = parseInt(quantityInput.value) || 1;
        let newQuantity = currentQuantity + change;
        
        // No permitir cantidades menores a 1
        if (newQuantity < 1) newQuantity = 1;
        
        // Verificar stock si hay una tienda seleccionada
        if (storeSelect.value) {
            const availableStock = storeStock[storeSelect.value];
            
            // Mostrar error si la cantidad excede el stock
            if (newQuantity > availableStock) {
                stockError.classList.remove('d-none');
                newQuantity = availableStock; // Limitar a stock disponible
            } else {
                stockError.classList.add('d-none');
            }
        }
        
        quantityInput.value = newQuantity;
    }

    // Exponer la función updateQuantity globalmente para que pueda ser llamada desde HTML
    window.updateQuantity = updateQuantity;
    
    // Exponer la función updateStockInfo globalmente para que pueda ser llamada desde HTML
    window.updateStockInfo = updateStockInfo;

    // Función para agregar al carrito
    function handleAddToCart() {
        const storeSelect = document.getElementById('storeSelect');
        const stockError = document.getElementById('stockError');
        const quantityInput = document.getElementById('quantityInput');
        const tallaSelect = document.getElementById('tallaSelect');
        if (!storeSelect || !tallaSelect) return;

        // Requisitos: tienda y talla seleccionadas
        if (!storeSelect.value || !tallaSelect.value) return;

        const selectedStore = storeSelect.value;
        const productSize = tallaSelect.value;
        const availableStock = storeStock[selectedStore];
        const requestedQuantity = parseInt(quantityInput.value) || 1;

        if (requestedQuantity > availableStock) {
            stockError.classList.remove('d-none');
            return;
        }

        const productNameElement = document.querySelector('h1.h2');
        const productPriceElement = document.querySelector('.price-final');
        const productSkuElement = document.querySelector('.product-sku');
        const productName = productNameElement ? productNameElement.textContent.trim() : 'Producto';
        const productPriceText = productPriceElement ? productPriceElement.textContent.replace(/CLP\$/g, '').replace(/\./g, '').trim() : '0';
        const productPrice = parseFloat(productPriceText);
        const productSKU = productSkuElement ? productSkuElement.textContent.replace('SKU: ', '').trim() : 'SKU_GEN';

        const product = {
            id: productSKU,
            name: productName,
            price: productPrice,
            size: productSize,
            quantity: requestedQuantity,
            store: selectedStore,
            image: document.querySelector('.carousel-item.active img') ? document.querySelector('.carousel-item.active img').src : ''
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingIndex = cart.findIndex(it => it.id === product.id && it.size === product.size && it.store === product.store);
        if (existingIndex > -1) {
            const newQty = cart[existingIndex].quantity + product.quantity;
            if (newQty > availableStock) {
                stockError.textContent = `No se puede exceder stock (${availableStock}).`;
                stockError.classList.remove('d-none');
                return;
            }
            cart[existingIndex].quantity = newQty;
        } else {
            // Insertar al inicio para que aparezca arriba
            cart.unshift(product);
        }

        // Simular reducción de stock local
        storeStock[selectedStore] -= product.quantity;
        updateStockInfo();
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartInOffcanvas();
        cartOffcanvas.show();
        // Scroll al inicio
        const offBody = document.querySelector('#cartOffcanvas .offcanvas-body');
        if (offBody) offBody.scrollTop = 0;
        quantityInput.value = 1;
    }

    // Renderizar carrito en offcanvas
    function renderCartInOffcanvas() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartBadge = document.querySelector('.cart-badge');
        if (!cartItemsContainer || !cartTotalElement || !cartBadge) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartBadge.textContent = cart.reduce((t, it) => t + it.quantity, 0);

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center my-5">Tu carrito está vacío</p>';
            cartTotalElement.textContent = '$0';
            return;
        }

        let total = 0;
        let html = '';
        cart.forEach((item, idx) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
            <div class="cart-item">
                <div class="d-flex">
                    <img src="${item.image}" class="cart-item-img me-3" alt="${item.name}">
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.name}</h6>
                        <p class="text-muted mb-1">Talla: ${item.size}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span>$${item.price.toLocaleString('es-CL')} x ${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-danger remove-item" data-index="${idx}"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        cartItemsContainer.innerHTML = html;
        cartTotalElement.textContent = '$' + total.toLocaleString('es-CL');
    }

    // Eventos
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) addToCartBtn.addEventListener('click', handleAddToCart);

    const storeSelectElem = document.getElementById('storeSelect');
    if (storeSelectElem) storeSelectElem.addEventListener('change', handleAddToCart);
}

/**
 * Inicializa la funcionalidad para cambiar el color del modelo
 */
function initColorToggle() {
    // Imágenes del modelo titanio
    const titanioImages = [
        '../images/ba2961-orion-4-29-titanio-2022-03.jpg',
        '../images/asiento.jpg',
        '../images/cadena.jpg',
        '../images/manubrio.jpg'
    ];
    
    // Imágenes del modelo rojo
    const rojoImages = [
        '../images/ba2963-orion-5-29-rojo-2021-01_2.jpg',
        '../images/ba2963-orion-5-29-rojo-2021-05.jpg',
        '../images/ba2963-orion-5-29-rojo-2021-06.jpg',
        '../images/ba2963-orion-5-29-rojo-2021-07_2.jpg'
    ];
    
    // Estado actual (titanio por defecto)
    let currentColor = 'titanio';
    
    // Botón para cambiar color
    const toggleColorBtn = document.getElementById('toggleColorBtn');
    if (toggleColorBtn) {
        toggleColorBtn.addEventListener('click', function() {
            // Cambiar al otro color
            if (currentColor === 'titanio') {
                changeCarouselImages(rojoImages);
                this.innerHTML = '<i class="bi bi-palette-fill me-1"></i> Ver modelo Titanio';
                this.classList.remove('btn-danger');
                this.classList.add('btn-secondary');
                currentColor = 'rojo';
                
                // Actualizar título del producto
                const productTitle = document.querySelector('h1.mb-1.h2');
                if (productTitle) {
                    productTitle.textContent = 'Bicicleta Aro 29 Orion 5 Rojo';
                }
            } else {
                changeCarouselImages(titanioImages);
                this.innerHTML = '<i class="bi bi-palette-fill me-1"></i> Ver modelo Orion 5';
                this.classList.remove('btn-secondary');
                this.classList.add('btn-danger');
                currentColor = 'titanio';
                
                // Restaurar título original
                const productTitle = document.querySelector('h1.mb-1.h2');
                if (productTitle) {
                    productTitle.textContent = 'Bicicleta Aro 29 Orion 4 Titanio';
                }
            }
        });
    }
    
    // Función para cambiar las imágenes del carrusel
    function changeCarouselImages(images) {
        const carouselInner = document.querySelector('#productImageCarousel .carousel-inner');
        const thumbnailsContainer = document.querySelector('.carousel-thumbnails-container');
        
        if (!carouselInner || !thumbnailsContainer) return;
        
        // Limpiar carrusel y miniaturas
        carouselInner.innerHTML = '';
        thumbnailsContainer.innerHTML = '';
        
        // Añadir nuevas imágenes al carrusel y miniaturas
        images.forEach((src, index) => {
            // Crear item del carrusel
            const carouselItem = document.createElement('div');
            carouselItem.className = index === 0 ? 'carousel-item active' : 'carousel-item';
            
            const img = document.createElement('img');
            img.src = src;
            img.className = 'd-block w-100';
            img.alt = `Oxford Orion - Vista ${index + 1}`;
            
            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
            
            // Crear miniatura
            const thumbnail = document.createElement('img');
            thumbnail.src = src;
            thumbnail.className = index === 0 ? 'carousel-thumbnail active' : 'carousel-thumbnail';
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.setAttribute('data-bs-target', '#productImageCarousel');
            thumbnail.setAttribute('data-bs-slide-to', index);
            
            thumbnailsContainer.appendChild(thumbnail);
            
            // Aplicar efectos de zoom a las nuevas imágenes
            img.classList.add('product-image-zoom');
        });
        
        // Reinicializar eventos para las miniaturas
        const newThumbnails = document.querySelectorAll('.carousel-thumbnail');
        newThumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', (event) => {
                newThumbnails.forEach(thumb => thumb.classList.remove('active'));
                event.target.classList.add('active');
            });
            
            // Efecto de paralaje para las nuevas miniaturas
            thumbnail.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / centerX * 5;
                const moveY = (y - centerY) / centerY * 5;
                
                this.style.transform = `perspective(300px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            thumbnail.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(300px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

/**
 * Inicializa el dropdown de especificaciones
 */
function initSpecsDropdown() {
    // Buscar el contenedor de especificaciones actual (acordeón)
    const specsAccordion = document.querySelector('#accordionSpecs');
    if (!specsAccordion) return;
    
    // Obtener el contenido de las especificaciones
    const specsContent = document.querySelector('#specsContainer');
    if (!specsContent) return;
    
    // Crear el nuevo dropdown
    const specsDropdownContainer = document.createElement('div');
    specsDropdownContainer.className = 'dropdown specs-dropdown mb-4';
    
    // Botón del dropdown
    const dropdownButton = document.createElement('button');
    dropdownButton.className = 'btn btn-light dropdown-toggle w-100 text-start fw-bold py-3';
    dropdownButton.type = 'button';
    dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.innerHTML = 'Especificaciones <i class="bi bi-chevron-down float-end"></i>';
    
    // Menú del dropdown
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu w-100 p-0';
    
    // Clonar el contenido de las especificaciones
    const clonedContent = specsContent.cloneNode(true);
    dropdownMenu.appendChild(clonedContent);
    
    // Ensamblar el dropdown
    specsDropdownContainer.appendChild(dropdownButton);
    specsDropdownContainer.appendChild(dropdownMenu);
    
    // Reemplazar el acordeón con el dropdown
    specsAccordion.parentNode.replaceChild(specsDropdownContainer, specsAccordion);
    
    // Añadir estilos personalizados
    const style = document.createElement('style');
    style.textContent = `
        .specs-dropdown .dropdown-menu {
            max-height: 500px;
            overflow-y: auto;
        }
        .specs-dropdown .dropdown-toggle::after {
            display: none;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Mejora la funcionalidad de control de stock para mostrar stock específico por talla
 */
function enhanceStockControl() {
    // Configuración de stock por tienda y talla
    const storeStockBySize = {
        santiago: {
            M: 3,
            L: 4
        },
        concepcion: {
            M: 2,
            L: 3
        }
    };
    
    // Reemplazar la configuración de stock existente
    window.storeStock = {
        santiago: 7, // Total Santiago (3M + 4L)
        concepcion: 5 // Total Concepción (2M + 3L)
    };
    
    // Función mejorada para actualizar la información de stock
    function updateStockInfoBySize() {
        const storeSelect = document.getElementById('storeSelect');
        const tallaSelect = document.getElementById('tallaSelect');
        const stockInfo = document.getElementById('stockInfo');
        const stockAmount = document.getElementById('stockAmount');
        const stockError = document.getElementById('stockError');
        
        // Ocultar mensaje de error si está visible
        if (stockError) stockError.classList.add('d-none');
        
        if (storeSelect && storeSelect.value && tallaSelect && tallaSelect.value) {
            const selectedStore = storeSelect.value;
            const selectedSize = tallaSelect.value;
            const availableStock = storeStockBySize[selectedStore][selectedSize];
            const storeName = selectedStore.charAt(0).toUpperCase() + selectedStore.slice(1);
            
            if (stockAmount) {
                stockAmount.innerHTML = `<i class="bi bi-check-circle-fill text-success me-1"></i>Stock disponible en ${storeName} (Talla ${selectedSize}): <strong>${availableStock} unidades</strong>`;
            }
            if (stockInfo) stockInfo.classList.remove('d-none');
        } else {
            if (stockInfo) stockInfo.classList.add('d-none');
        }
    }
    
    // Reemplazar la función updateStockInfo existente
    window.updateStockInfo = updateStockInfoBySize;
    
    // Añadir evento para actualizar stock cuando cambia la talla
    const tallaSelect = document.getElementById('tallaSelect');
    if (tallaSelect) {
        tallaSelect.addEventListener('change', updateStockInfoBySize);
    }
    
    // Modificar la función updateQuantity para verificar stock por talla
    const originalUpdateQuantity = window.updateQuantity;
    window.updateQuantity = function(change) {
        const quantityInput = document.getElementById('quantityInput');
        const storeSelect = document.getElementById('storeSelect');
        const tallaSelect = document.getElementById('tallaSelect');
        const stockError = document.getElementById('stockError');
        
        let currentQuantity = parseInt(quantityInput.value) || 1;
        let newQuantity = currentQuantity + change;
        
        // No permitir cantidades menores a 1
        if (newQuantity < 1) newQuantity = 1;
        
        // Verificar stock si hay una tienda y talla seleccionada
        if (storeSelect.value && tallaSelect.value) {
            const selectedStore = storeSelect.value;
            const selectedSize = tallaSelect.value;
            const availableStock = storeStockBySize[selectedStore][selectedSize];
            
            // Mostrar error si la cantidad excede el stock
            if (newQuantity > availableStock) {
                stockError.classList.remove('d-none');
                stockError.textContent = `No hay suficiente stock disponible. Stock máximo: ${availableStock} unidades.`;
                newQuantity = availableStock; // Limitar a stock disponible
            } else {
                stockError.classList.add('d-none');
            }
        }
        
        quantityInput.value = newQuantity;
    };
    
    // Modificar el evento del botón de Ver Disponibilidad en Tiendas Físicas
    const checkStoreBtn = document.getElementById('checkStoreBtn');
    if (checkStoreBtn) {
        checkStoreBtn.addEventListener('click', function() {
            // Mostrar un modal con información detallada de stock por talla
            let message = 'Disponibilidad en tiendas físicas:\n\n';
            message += 'Santiago:\n - Talla M: ' + storeStockBySize.santiago.M + ' unidades\n - Talla L: ' + storeStockBySize.santiago.L + ' unidades\n\n';
            message += 'Concepción:\n - Talla M: ' + storeStockBySize.concepcion.M + ' unidades\n - Talla L: ' + storeStockBySize.concepcion.L + ' unidades';
            
            alert(message);
        });
    }
    
    // Modificar el evento del botón Agregar al Carrito
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const storeSelect = document.getElementById('storeSelect');
            const tallaSelect = document.getElementById('tallaSelect');
            const stockError = document.getElementById('stockError');
            const quantityInput = document.getElementById('quantityInput');
            
            // Verificar si se ha seleccionado una tienda
            if (!storeSelect.value) {
                alert('Por favor, seleccione una tienda antes de agregar al carrito.');
                return;
            }
            
            const selectedStore = storeSelect.value;
            const selectedSize = tallaSelect.value;
            const availableStock = storeStockBySize[selectedStore][selectedSize];
            const requestedQuantity = parseInt(quantityInput.value) || 1;
            
            // Verificar si hay suficiente stock
            if (requestedQuantity > availableStock) {
                stockError.classList.remove('d-none');
                stockError.textContent = `No hay suficiente stock disponible. Stock máximo: ${availableStock} unidades.`;
                return; // No continuar con la adición al carrito
            }
            
            // Continuar con la lógica existente de agregar al carrito...
            // Reducir el stock específico por talla
            storeStockBySize[selectedStore][selectedSize] -= requestedQuantity;
            
            // Actualizar también el stock total para mantener la compatibilidad
            window.storeStock[selectedStore] -= requestedQuantity;
            
            // Actualizar la información de stock mostrada
            updateStockInfoBySize();
        }, true); // Usar true para capturar el evento antes que otros listeners
    }
}

// ============================================================
//  NUEVAS UTILIDADES DE CARRITO SOLICITADAS (renderCart / clearCart)
//  (Se han movido al script inline de orion.html para una versión completa)
// ============================================================

/* Se eliminó la implementación simplificada de renderCart/clearCart
   para evitar duplicación y posibles conflictos. El script inline de
   la página define versiones más completas y hace las funciones
   globales.  Aquí solo comprobamos si ya existen y, de ser así,
   ejecutamos renderCart al iniciar. */

if (typeof window.renderCart === 'function') {
    window.renderCart();
}