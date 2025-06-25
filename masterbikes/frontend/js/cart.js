// Cart functionality
let cart = [];
const CART_STORAGE_KEY = 'masterBikesCart';

// Bike data that can be used by other scripts
const bikeData = [
    {
        name: "Orion 5",
        brand: "Oxford",
        type: "Montaña",
        size: "M",
        price: 899000,
        rating: 4.8,
        image: "../images/orion-bike.webp",
        description: "Bicicleta de montaña con suspensión delantera y frenos de disco hidráulicos.",
        detailPage: "orion.html",
        stock: 5
    },
    {
        id: 2,
        name: "Merak 1",
        brand: "Trek",
        type: "Ruta",
        size: "L",
        price: 1299000,
        rating: 4.9,
        image: "../images/merak-bike.webp",
        description: "Bicicleta de ruta con cuadro de carbono y componentes Shimano 105.",
        detailPage: "merak1.html",
        stock: 5
    },
    {
        id: 3,
        name: "Polux 7",
        brand: "Specialized",
        type: "Urbana",
        size: "M",
        price: 599000,
        rating: 4.5,
        image: "../images/polux-bike.webp",
        description: "Bicicleta urbana con portaequipajes y luces integradas.",
        detailPage: "polux7.html",
        stock: 5
    },
    {
        id: 4,
        name: "Aura 6",
        brand: "Giant",
        type: "Eléctrica",
        size: "S",
        price: 2499000,
        rating: 4.7,
        image: "../images/aura-bike.webp",
        description: "Bicicleta eléctrica con batería de larga duración y motor potente.",
        detailPage: "Aura6.html",
        stock: 5
    },
    {
        id: 5,
        name: "Halley",
        brand: "Scott",
        type: "BMX",
        size: "XS",
        price: 399000,
        rating: 4.3,
        image: "../images/halley-bike.webp",
        description: "Bicicleta BMX resistente para trucos y saltos.",
        detailPage: "halley.html",
        stock: 5
    },
    {
        id: 6,
        name: "Luna 20",
        brand: "Oxford",
        type: "Montaña",
        size: "XL",
        price: 1099000,
        rating: 4.6,
        image: "../images/luna-bike.webp",
        description: "Bicicleta de montaña con suspensión completa y frenos de disco.",
        detailPage: "luna20.html",
        stock: 5
    }
];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error al cargar el carrito:', e);
            cart = [];
        }
    }
    updateCartBadge();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge with item count
function updateCartBadge() {
    const cartBadges = document.querySelectorAll('.cart-badge');
    const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    cartBadges.forEach(badge => {
        badge.textContent = itemCount;
        badge.style.display = itemCount > 0 ? 'inline-block' : 'none';
    });
}

/**
 * Añade un producto al carrito
 * @param {string} productId - ID del producto
 * @param {number} quantity - Cantidad a añadir
 * @param {object} options - Opciones adicionales (talla, color, etc.)
 * @param {object} productData - Datos completos del producto
 * @returns {boolean} - Indica si el producto se añadió correctamente
 */
function addToCart(productId, quantity = 1, options = {}, productData = null) {
    // Si se proporciona directamente la información del producto, usarla
    let product = productData;
    
    // Si no se proporcionó la información del producto, buscarla en bikeData
    if (!product) {
        product = bikeData.find(item => item.id == productId);
        
        // Si no se encuentra en bikeData, buscar por nombre (para compatibilidad)
        if (!product) {
            product = bikeData.find(item => item.name.toLowerCase() === productId.toLowerCase());
        }
    }
    
    if (!product) {
        console.log(`Producto no encontrado: ${productId}`);
        return false;
    }
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => 
        item.id == product.id || item.name === product.name
    );
    
    if (existingItemIndex >= 0) {
        // Si ya existe, actualizar la cantidad
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + quantity;
        
        // Mostrar notificación
        showNotification(`La cantidad de ${product.name} ha sido actualizada en tu carrito.`);
    } else {
        // Si no existe, agregar como nuevo item
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || '../images/default-bike.jpg',
            quantity: quantity,
            ...options
        };
        
        cart.push(newItem);
        
        // Mostrar notificación
        showNotification(`${product.name} ha sido agregado a tu carrito.`);
    }
    
    // Guardar el carrito actualizado
    saveCart();
    
    // Actualizar la visualización del carrito si estamos en la página correspondiente
    updateCartDisplay();
    
    return true;
}

// Update cart display in offcanvas
function updateCartDisplay() {
    // Buscar el contenedor del carrito
    const cartContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartTotal = document.getElementById('cart-total');
    
    // Si no estamos en la página del carrito, no hacer nada
    if (!cartContainer && !cartSummary) {
        return;
    }
    
    // Actualizar los items del carrito si existe el contenedor
    if (cartContainer) {
        cartContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-4">
                        <p class="mb-0">Tu carrito está vacío</p>
                        <a href="catalogo.html" class="btn btn-primary mt-3">Ver catálogo</a>
                    </td>
                </tr>
            `;
        } else {
            cart.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3" width="60">
                            <div>
                                <h6 class="mb-0">${item.name}</h6>
                                ${item.options ? `<small class="text-muted">${JSON.stringify(item.options)}</small>` : ''}
                            </div>
                        </div>
                    </td>
                    <td>${formatPrice(item.price)}</td>
                    <td>
                        <div class="quantity-control">
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                            <span class="mx-2">${item.quantity || 1}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                        </div>
                    </td>
                    <td>${formatPrice((item.price || 0) * (item.quantity || 1))}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                cartContainer.appendChild(row);
            });
        }
    }
    
    // Actualizar el resumen del carrito si existe el contenedor
    if (cartSummary) {
        const subtotal = cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
        const shipping = subtotal > 0 ? 0 : 0; // Envío gratis
        const total = subtotal + shipping;
        
        cartSummary.innerHTML = `
            <div class="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span>${shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
            </div>
            <div class="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
            </div>
        `;
        
        // Actualizar también el total si existe el elemento
        if (cartTotal) {
            cartTotal.textContent = formatPrice(total);
        }
    }
}

// Update cart totals
function updateCartTotals() {
    const subtotalElement = document.getElementById('cartSubtotal');
    const taxElement = document.getElementById('cartTax');
    const totalElement = document.getElementById('cartTotal');
    
    if (!subtotalElement || !taxElement || !totalElement) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const tax = subtotal * 0.19; // 19% IVA
    const total = subtotal + tax;
    
    subtotalElement.textContent = formatPrice(subtotal);
    taxElement.textContent = formatPrice(tax);
    totalElement.textContent = formatPrice(total);
}

// Show notification when item is added to cart
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('cartNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cartNotification';
        notification.className = 'position-fixed top-0 end-0 p-3';
        notification.style.zIndex = '1070';
        document.body.appendChild(notification);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toastElement = document.createElement('div');
    toastElement.id = toastId;
    toastElement.className = 'toast show';
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');
    toastElement.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Carrito</strong>
            <small>Ahora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            <i class="bi bi-check-circle me-2"></i>
            ${message}
        </div>
    `;
    notification.appendChild(toastElement);
    
    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
        const toast = new bootstrap.Toast(toastElement);
        toast.hide();
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }, 3000);
}

// Función para mostrar notificación de error
function showErrorNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('errorNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'errorNotification';
        notification.className = 'position-fixed top-0 end-0 p-3';
        notification.style.zIndex = '1070';
        document.body.appendChild(notification);
    }
    
    // Create toast element
    const toastId = 'error-toast-' + Date.now();
    const toastElement = document.createElement('div');
    toastElement.id = toastId;
    toastElement.className = 'toast show bg-danger text-white';
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');
    toastElement.innerHTML = `
        <div class="toast-header bg-danger text-white">
            <strong class="me-auto">Atención</strong>
            <small>Ahora</small>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            ${message}
        </div>
    `;
    notification.appendChild(toastElement);
    
    // Auto-hide the toast after 4 seconds
    setTimeout(() => {
        toastElement.classList.remove('show');
        setTimeout(() => {
            toastElement.remove();
        }, 300);
    }, 4000);
}

// Actualizar la cantidad de un item en el carrito
function updateCartItemQuantity(index, change) {
    if (index >= 0 && index < cart.length) {
        cart[index].quantity = (cart[index].quantity || 1) + change;
        
        // Si la cantidad llega a 0 o menos, eliminar el item
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
            return;
        }
        
        saveCart();
        updateCartDisplay();
    }
}

// Eliminar un item del carrito
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const removedItem = cart.splice(index, 1)[0];
        saveCart();
        updateCartDisplay();
        
        // Mostrar notificación
        showNotification(`${removedItem.name} ha sido eliminado del carrito.`);
    }
}

// Vaciar el carrito
function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
    
    // Añadir una notificación cuando se vacía el carrito
    showNotification('Tu carrito ha sido vaciado.');
}

// Formatear precio en formato de moneda
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartDisplay();
    
    // Agregar evento para mostrar/ocultar el mini carrito
    const cartToggle = document.querySelector('.cart-toggle');
    const miniCart = document.querySelector('.mini-cart');
    
    if (cartToggle && miniCart) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            miniCart.classList.toggle('show');
        });
        
        // Cerrar el mini carrito al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (!miniCart.contains(e.target) && !cartToggle.contains(e.target)) {
                miniCart.classList.remove('show');
            }
        });
    }
});

// Exponer funciones para uso global
window.addToCart = addToCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.showCartNotification = showNotification;