// Sistema de carrito mejorado con almacenamiento local
class CartManager {
    constructor() {
        this.cart = [];
        this.loadCartFromStorage();
        this.initializeCart();
        this.debugCart(); // Añadir esta línea para depurar el carrito al inicializar
    }

    // Cargar carrito desde localStorage
    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('masterbikes_cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error cargando carrito desde localStorage:', error);
            this.cart = [];
        }
    }

    // Guardar carrito en localStorage
    saveCartToStorage() {
        try {
            localStorage.setItem('masterbikes_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error guardando carrito en localStorage:', error);
        }
    }

    // Inicializar el carrito
    initializeCart() {
        this.updateCartUI();
        this.setupEventListeners();
    }

    // Configurar event listeners
    setupEventListeners() {
        // Event listener para botones de agregar al carrito
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn') || 
                e.target.closest('.add-to-cart-btn')) {
                e.preventDefault();
                
                const button = e.target.classList.contains('add-to-cart-btn') ? 
                              e.target : e.target.closest('.add-to-cart-btn');
                
                const productId = button.getAttribute('data-product-id');
                if (productId) {
                    this.addToCartFromButton(button);
                }
            }
        });

        // Event listener global para remover items del carrito
        document.addEventListener('click', (e) => {
            const removeButton = e.target.closest('.cart-item-remove');
            if (removeButton) {
                e.preventDefault();
                const productId = removeButton.getAttribute('data-product-id');
                if (productId) {
                    console.log("Eliminando producto desde event listener global:", productId);
                    this.removeFromCart(productId);
                }
            }
        });
    }

    // Agregar producto al carrito desde botón
    addToCartFromButton(button) {
        const productId = button.getAttribute('data-product-id');
        const card = button.closest('.bike-card');
        
        if (!card) return;

        const product = {
            id: productId,
            name: card.querySelector('.card-title').textContent.trim(),
            price: this.extractPrice(card.querySelector('.card-price').textContent),
            image: card.querySelector('.card-img-top').src,
            brand: card.querySelector('.card-brand').textContent.trim(),
            quantity: 1
        };

        this.addToCart(product);
    }

    // Extraer precio del texto
    extractPrice(priceText) {
        // Eliminar todos los caracteres que no sean dígitos
        const cleanPrice = priceText.replace(/[^\d]/g, '');
        return parseInt(cleanPrice) || 0;
    }

    // Agregar producto al carrito
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.saveCartToStorage();
        this.updateCartUI();
        this.showNotification(`${product.name} agregado al carrito`);
    }

    // Remover producto del carrito
    removeFromCart(productId) {
        const productToRemove = this.cart.find(item => item.id === productId);
        if (productToRemove) {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.saveCartToStorage();
            this.updateCartUI();
            this.showNotification(`Producto eliminado del carrito`, 'warning');
            console.log("Carrito actualizado:", this.cart);
        }
    }

    // Actualizar cantidad de producto
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartUI();
            }
        }
    }

    // Limpiar carrito
    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartUI();
    }

    // Calcular total del carrito
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            // Asegurarse de que el precio y la cantidad sean números válidos
            const price = typeof item.price === 'number' ? item.price : 0;
            const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
            return total + (price * quantity);
        }, 0);
    }

    // Obtener cantidad total de items
    getCartItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Actualizar UI del carrito
    updateCartUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    }

    // Actualizar contador del carrito en la navbar
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getCartItemCount();
        
        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'inline' : 'none';
        });
    }

    // Actualizar items del carrito en el offcanvas
    updateCartItems() {
        const cartContainer = document.getElementById('cart-items-container');
        const cartFooter = document.getElementById('cart-footer');

        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = '<p class="text-center text-muted" id="cart-empty-msg">Tu carrito está vacío.</p>';
            if (cartFooter) cartFooter.style.display = 'none';
            return;
        }

        if (cartFooter) cartFooter.style.display = 'block';

        const cartItemsHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h6>${item.name}</h6>
                    <p class="text-muted mb-1">${item.brand || 'MasterBikes'}</p>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary me-2" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary ms-2" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-price-section">
                    <div class="cart-item-price">${this.formatPrice(item.price * item.quantity)}</div>
                    <button class="cart-item-remove btn btn-link text-danger p-0" data-product-id="${item.id}" onclick="cartManager.removeFromCart('${item.id}')" title="Eliminar producto">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        cartContainer.innerHTML = cartItemsHTML;
        
        // Agregar event listeners a los botones de eliminar después de actualizar el HTML
        this.setupRemoveButtons();
    }

    // Configurar botones de eliminar
    setupRemoveButtons() {
        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            const productId = button.getAttribute('data-product-id');
            button.onclick = () => {
                console.log("Eliminando producto con ID:", productId);
                this.removeFromCart(productId);
            };
        });
    }

    // Actualizar total del carrito
    updateCartTotal() {
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            const total = this.getCartTotal();
            // Asegurarse de que el total sea un número válido
            if (isNaN(total) || total === undefined) {
                console.error("Error: Total del carrito no es un número válido:", total);
                cartTotalElement.textContent = "$0";
            } else {
                cartTotalElement.textContent = `${this.formatPrice(total)}`;
            }
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'success') {
        const toast = document.getElementById('notificationToast');
        if (!toast) return;
        
        const toastBody = toast.querySelector('.toast-body');
        if (toastBody) {
            toastBody.textContent = message;
        }
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    // Formatear precio para mostrar
    formatPrice(price) {
        // Asegurarse de que el precio sea un número
        if (isNaN(price) || price === undefined) {
            console.error("Error: Precio no es un número válido:", price);
            return "0";
        }
        return price.toLocaleString('es-CL');
    }

    // Método de depuración para el carrito
    debugCart() {
        console.log("Estado inicial del carrito:", this.cart);
    }
}

// Inicializar el carrito cuando el DOM esté listo
let cartManager;

document.addEventListener('DOMContentLoaded', function() {
    cartManager = new CartManager();
    console.log('Cart Manager inicializado');
});

// Función para verificar stock y añadir al carrito (para compatibilidad con código existente)
function checkStockAndAddToCart(productId, name, price, image, brand = 'MasterBikes') {
    if (cartManager) {
        // Asegurarse de que el precio sea un número
        let numericPrice;
        
        if (typeof price === 'string') {
            // Eliminar todos los caracteres que no sean dígitos
            numericPrice = parseInt(price.replace(/[^\d]/g, ''));
        } else if (typeof price === 'number') {
            numericPrice = price;
        } else {
            numericPrice = 0;
        }
        
        // Verificar que el precio sea un número válido
        if (isNaN(numericPrice)) {
            console.error("Error: Precio no válido:", price);
            numericPrice = 0;
        }
        
        console.log(`Añadiendo producto: ${name}, Precio original: ${price}, Precio procesado: ${numericPrice}`);
        
        const product = {
            id: productId,
            name: name,
            price: numericPrice,
            image: image,
            brand: brand,
            quantity: 1
        };
        
        cartManager.addToCart(product);
    } else {
        console.error('Cart Manager no está inicializado');
    }
}