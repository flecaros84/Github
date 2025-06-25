/**
 * Script para manejar la funcionalidad de personalización de bicicletas
 * Permite seleccionar una bicicleta base y personalizarla con diferentes componentes
 */

// Variables globales
let selectedBike = null;
let selectedComponents = {
    frame: null,
    wheel: null,
    drivetrain: null,
    brakes: null
};
let basePrice = 0;
let totalPrice = 0;
let addToCartButton = null;

// Base de datos simulada de componentes
const componentesDB = [
    { id: 1, tipo: "Cuadro", marca: "Trek", modelo: "Alpha Gold", precio: 150000 },
    { id: 2, tipo: "Cuadro", marca: "Specialized", modelo: "Allez", precio: 180000 },
    { id: 3, tipo: "Cuadro", marca: "Giant", modelo: "ALUXX", precio: 120000 },
    { id: 4, tipo: "Ruedas", marca: "Mavic", modelo: "Crossmax", precio: 90000 },
    { id: 5, tipo: "Ruedas", marca: "DT Swiss", modelo: "X1900", precio: 120000 },
    { id: 6, tipo: "Ruedas", marca: "Shimano", modelo: "MT500", precio: 75000 },
    { id: 7, tipo: "Transmisión", marca: "Shimano", modelo: "Deore", precio: 85000 },
    { id: 8, tipo: "Transmisión", marca: "SRAM", modelo: "NX Eagle", precio: 110000 },
    { id: 9, tipo: "Transmisión", marca: "Shimano", modelo: "XT", precio: 130000 },
    { id: 10, tipo: "Frenos", marca: "Shimano", modelo: "MT200", precio: 45000 },
    { id: 11, tipo: "Frenos", marca: "SRAM", modelo: "Level T", precio: 65000 },
    { id: 12, tipo: "Frenos", marca: "Magura", modelo: "MT5", precio: 95000 }
];

// Inicializar la página cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    
    // Configurar el botón de proceder al pago
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'pago.html';
        });
    }
});

// Inicializar la página
function initializePage() {
    // Configurar botones de personalización
    const customizeButtons = document.querySelectorAll('.customize-btn');
    customizeButtons.forEach(button => {
        button.addEventListener('click', handleBikeSelection);
    });
    
    // Configurar botón de volver a selección de bicicletas
    const backButton = document.createElement('button');
    backButton.className = 'btn btn-outline-secondary mb-4 back-to-bikes';
    backButton.innerHTML = '<i class="bi bi-arrow-left me-2"></i>Volver a selección de bicicletas';
    backButton.addEventListener('click', showBikesSection);
    
    const configurador = document.getElementById('configurador');
    if (configurador) {
        configurador.insertBefore(backButton, configurador.firstChild);
    }
    
    // Inicializar botón de agregar al carrito
    addToCartButton = document.getElementById('addToCart');
    initializeAddToCartButton();
    
    // Inicializar selectores de componentes
    initializeComponentSelects();
    
    // Cargar el carrito actual
    updateCartDisplay();
}

// Manejar la selección de una bicicleta
function handleBikeSelection(event) {
    const button = event.currentTarget;
    
    // Obtener datos de la bicicleta seleccionada
    selectedBike = {
        id: button.getAttribute('data-bike-id'),
        name: button.getAttribute('data-bike-name'),
        brand: button.getAttribute('data-bike-brand'),
        price: parseInt(button.getAttribute('data-bike-price')),
        image: button.getAttribute('data-bike-image')
    };
    
    // Establecer precio base y total inicial
    basePrice = selectedBike.price;
    totalPrice = basePrice;
    
    // Mostrar la sección de configuración
    showConfiguratorSection();
    
    // Actualizar la vista previa de la bicicleta
    const bikePreview = document.getElementById('bikePreview');
    if (bikePreview) {
        bikePreview.src = selectedBike.image;
    }
    
    // Resetear selecciones de componentes
    resetComponentSelections();
    
    // Mostrar información de la bicicleta seleccionada
    displaySelectedBikeInfo();
}

// Resetear selecciones de componentes
function resetComponentSelections() {
    // Resetear el objeto de componentes seleccionados
    selectedComponents = {
        frame: null,
        wheel: null,
        drivetrain: null,
        brakes: null
    };
    
    // Resetear los selectores en el DOM
    const selects = document.querySelectorAll('.builder-select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
}

// Mostrar sección de configurador
function showConfiguratorSection() {
    const bikesSection = document.getElementById('bikesSection');
    const configurador = document.getElementById('configurador');
    
    if (bikesSection && configurador) {
        bikesSection.style.display = 'none';
        configurador.style.display = 'block';
        configurador.classList.add('fade-in');
    }
}

// Mostrar sección de selección de bicicletas
function showBikesSection() {
    const bikesSection = document.getElementById('bikesSection');
    const configurador = document.getElementById('configurador');
    
    if (bikesSection && configurador) {
        configurador.style.display = 'none';
        bikesSection.style.display = 'block';
        bikesSection.classList.add('fade-in');
    }
}

// Mostrar información de la bicicleta seleccionada
function displaySelectedBikeInfo() {
    const configurador = document.getElementById('configurador');
    if (!configurador) return;
    
    // Eliminar información anterior si existe
    const existingInfo = document.querySelector('.bike-selected-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    // Eliminar contenedor de precio total si existe
    const existingPriceContainer = document.getElementById('totalPriceContainer');
    if (existingPriceContainer) {
        existingPriceContainer.remove();
    }
    
    // Crear elemento para mostrar información de la bicicleta
    const bikeInfo = document.createElement('div');
    bikeInfo.className = 'bike-selected-info mb-4';
    bikeInfo.innerHTML = `
        <h4><i class="bi bi-bicycle me-2"></i>${selectedBike.brand} ${selectedBike.name}</h4>
        <p class="mb-2">Precio base: ${formatPrice(basePrice)}</p>
        <p class="mb-0">Personaliza esta bicicleta seleccionando componentes a continuación.</p>
    `;
    
    // Insertar después del botón de volver
    const backButton = document.querySelector('.back-to-bikes');
    if (backButton) {
        backButton.after(bikeInfo);
    } else {
        configurador.insertBefore(bikeInfo, configurador.firstChild);
    }
    
    // Añadir elemento para mostrar el precio total
    const totalPriceElement = document.createElement('div');
    totalPriceElement.id = 'totalPriceContainer';
    totalPriceElement.className = 'mt-3 p-3 bg-light rounded';
    totalPriceElement.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Precio total:</h5>
            <h4 class="mb-0" id="totalPrice">${formatPrice(totalPrice)}</h4>
        </div>
    `;
    
    // Insertar antes del botón de añadir al carrito
    if (addToCartButton) {
        addToCartButton.parentNode.insertBefore(totalPriceElement, addToCartButton);
    }
}

// Inicializar selectores de componentes
function initializeComponentSelects() {
    const selects = document.querySelectorAll('.builder-select');
    
    selects.forEach(select => {
        select.addEventListener('change', handleComponentSelection);
    });
}

// Manejar la selección de componentes
function handleComponentSelection(event) {
    const select = event.target;
    const componentType = select.getAttribute('data-part');
    const componentValue = select.value;
    
    // Si se seleccionó la opción por defecto, eliminar el componente
    if (select.selectedIndex === 0) {
        selectedComponents[componentType] = null;
    } else {
        // Buscar el componente en la base de datos
        const selectedComponent = componentesDB.find(component => 
            `${componentType}-${component.id}` === componentValue || 
            component.id == componentValue.split('-')[1]
        );
        selectedComponents[componentType] = selectedComponent;
    }
    
    // Recalcular el precio total
    updateTotalPrice();
    
    // Actualizar resumen de personalización
    updatePersonalizationSummary();
}

// Actualizar resumen de personalización
function updatePersonalizationSummary() {
    // Esta función podría implementarse para mostrar un resumen de los componentes seleccionados
    console.log("Componentes seleccionados:", selectedComponents);
}

// Actualizar el precio total
function updateTotalPrice() {
    totalPrice = basePrice;
    for (const component of Object.values(selectedComponents)) {
        if (component) {
            totalPrice += component.precio;
        }
    }
    
    // Actualizar el elemento de precio total en el DOM
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = `${formatPrice(totalPrice)}`;
    }
}

// Formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
}

// Inicializar botón de agregar al carrito
function initializeAddToCartButton() {
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addCustomBikeToCart);
    }
}

// Agregar bicicleta personalizada al carrito
function addCustomBikeToCart() {
    if (!selectedBike) {
        alert("Por favor, selecciona una bicicleta primero.");
        return;
    }
    
    // Verificar si hay componentes seleccionados
    const hasComponents = Object.values(selectedComponents).some(component => component !== null);
    
    // Crear objeto de bicicleta personalizada
    const customBike = {
        id: `custom-${Date.now()}`, // ID único para la bicicleta personalizada
        name: hasComponents 
            ? `${selectedBike.brand} ${selectedBike.name} Personalizada` 
            : `${selectedBike.brand} ${selectedBike.name}`,
        price: totalPrice,
        image: selectedBike.image,
        quantity: 1,
        isCustom: hasComponents,
        baseModel: selectedBike.name,
        components: {}
    };
    
    // Añadir componentes seleccionados
    for (const [type, component] of Object.entries(selectedComponents)) {
        if (component) {
            customBike.components[type] = {
                name: `${component.marca} ${component.modelo}`,
                precio: component.precio
            };
        }
    }
    
    console.log("Adding custom bike to cart:", customBike);
    
    // Añadir al carrito (usando localStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si la bicicleta ya está en el carrito (para bicicletas no personalizadas)
    if (!hasComponents) {
        const existingBikeIndex = cart.findIndex(item => 
            item.name === customBike.name && !item.isCustom);
        
        if (existingBikeIndex !== -1) {
            // Incrementar la cantidad en lugar de añadir un nuevo item
            cart[existingBikeIndex].quantity = (cart[existingBikeIndex].quantity || 1) + 1;
        } else {
            cart.push(customBike);
        }
    } else {
        // Las bicicletas personalizadas siempre se añaden como nuevos items
        cart.push(customBike);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    console.log("Updated cart:", cart);
    
    // Actualizar contador del carrito
    updateCartCounter();
    
    // Mostrar mensaje de éxito
    showAddToCartSuccess(customBike);
    
    // Abrir el offcanvas del carrito
    try {
        const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
        cartOffcanvas.show();
    } catch (error) {
        console.error("Error al mostrar el offcanvas:", error);
        // Alternativa si hay un error con el offcanvas
        alert("Bicicleta añadida al carrito correctamente.");
    }
    
    // Actualizar la visualización del carrito
    updateCartDisplay();
}

// Actualizar contador del carrito
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Actualizar el contador en el botón del carrito en la navbar
    const cartCounters = document.querySelectorAll('.cart-counter');
    cartCounters.forEach(counter => {
        counter.textContent = totalItems;
    });
}

// Mostrar mensaje de éxito al agregar al carrito
function showAddToCartSuccess(bike) {
    const hasComponents = Object.values(selectedComponents).some(component => component !== null);
    const message = hasComponents 
        ? `Agregaste una ${bike.name} personalizada por ${formatPrice(bike.price)} al carrito.`
        : `Agregaste una ${bike.name} por ${formatPrice(bike.price)} al carrito.`;
    
    // Crear un toast en lugar de un alert
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">MasterBikes</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Eliminar el toast después de 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    } else {
        // Fallback a alert si no hay contenedor de toast
        alert(message);
    }
}

// Función para eliminar un item del carrito
function removeCartItem(event) {
    const index = event.currentTarget.getAttribute('data-index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Eliminar el item del array
    cart.splice(index, 1);
    
    // Guardar el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar la visualización del carrito
    updateCartDisplay();
    
    // Actualizar el contador del carrito
    updateCartCounter();
}

// Función para actualizar el total del carrito
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalContainer = document.getElementById('cartTotal');
    
    if (!totalContainer) return;
    
    // Calcular el total
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    // Actualizar el elemento del DOM
    totalContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
            <h5>Total:</h5>
            <h5>${formatPrice(total)}</h5>
        </div>
    `;
}