// Datos estáticos del catálogo
const bikeData = [
    {id: 1, type: 'Mountain Bike', name: 'Orion 4 Titanio', brand: 'Oxford', size: '29', price: 549990, img: './images/ba2961-orion-4-29-titanio-2022-02.jpg', discount: 15, availability: 'available', rating: 4.7},
    {id: 2, type: 'Mountain Bike', name: 'Halley Pro', brand: 'Shimano', size: '27.5', price: 389990, img: './images/mtb.webp', discount: 20, availability: 'available', rating: 4.5},
    {id: 3, type: 'Mountain Bike', name: 'Merak 1 Elite', brand: 'Oxford', size: '29', price: 429990, img: './images/mtb_2.webp', discount: 10, availability: 'available', rating: 4.8},
    {id: 4, type: 'Mountain Bike', name: 'Aura 6 Carbon', brand: 'Oxford', size: '27.5', price: 789990, img: './images/pendiente.jpg', discount: 25, availability: 'reserved', rating: 4.9},
    {id: 5, type: 'Mountain Bike', name: 'Pollux 7 Race', brand: 'Shimano', size: '29', price: 659990, img: './images/pendiente.jpg', discount: 30, availability: 'available', rating: 4.6},
    {id: 6, type: 'Mountain Bike', name: 'Luna 20 Kids', brand: 'Oxford', size: '20', price: 199990, img: './images/pendiente.jpg', discount: 18, availability: 'available', rating: 4.3},
    {id: 7, type: 'Urbana', name: 'City Cruiser', brand: 'Oxford', size: '27', price: 299990, img: './images/pendiente.jpg', discount: 22, availability: 'available', rating: 4.4},
    {id: 8, type: 'Eléctrica', name: 'E-Bike Pro', brand: 'Shimano', size: '-', price: 1299990, img: './images/pendiente.jpg', discount: 12, availability: 'reserved', rating: 4.7}
];

window.bikeData = bikeData; // Hacer disponible globalmente

// Manejo del carrito
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
window.cart = cart;

function addToCart(productId, quantity = 1) {
    let product = bikeData.find(p => p.id === productId);
    // Si no se encontró en el set local, intenta con la data global definida en otras páginas
    if (!product && Array.isArray(window.bikeData)) {
        product = window.bikeData.find(p => p.id === productId);
        // Si existe, opcional: añadirlo a nuestro dataset para futuras búsquedas
        if (product) bikeData.push(product);
    }
    if (!product) return false;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const normalizedImg = product.img.startsWith('http') ? product.img : product.img.replace(/^\.\.\//, './');
        cart.push({...product, img: normalizedImg, quantity});
    }
    
    updateCartUI();
    // persist
    localStorage.setItem('cart', JSON.stringify(cart));
    window.cart = cart;
    return true;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.cart = cart;
    updateCartUI();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            localStorage.setItem('cart', JSON.stringify(cart));
            window.cart = cart;
        }
    }
}

function updateCartUI() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartContainer = document.getElementById('cart-items-container');
    const cartBadge = document.getElementById('cart-badge');
    const cartFooter = document.getElementById('cart-footer');
    const cartEmptyMsg = document.getElementById('cart-empty-msg');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContainer) {
        // actualizar total si existe
        if (cartTotal) {
            if (cart.length === 0) {
                cartTotal.textContent = '$0';
            } else {
                cartTotal.textContent = `$${total.toLocaleString()}`;
            }
        }
        // Página sin contenedor de detalle, solo actualizamos la insignia y persistimos
        if (cartBadge) {
            if (cart.length === 0) {
                cartBadge.style.display = 'none';
            } else {
                cartBadge.style.display = 'inline';
                cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.cart = cart;
        return;
    }
    
    if (cart.length === 0) {
        cartBadge.style.display = 'none';
        cartFooter.style.display = 'none';
        cartEmptyMsg.style.display = 'block';
        cartContainer.innerHTML = '';
        return;
    }
    
    
    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        
        return `
            <div class="cart-item mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img me-3" style="width: 60px; height: 60px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price.toLocaleString()}</p>
                        <div class="quantity-controls mt-2">
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="btn btn-link text-danger" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>`;
    }).join('');
    
    cartBadge.style.display = 'inline';
    cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartFooter.style.display = 'block';
    cartEmptyMsg.style.display = 'none';
    cartTotal.textContent = `$${total.toLocaleString()}`;
    // Sincronizar total en todos los spans (por si existen duplicados)
    document.querySelectorAll('#cart-total').forEach(el => {
        el.textContent = `$${total.toLocaleString()}`;
    });
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
window.cart = cart;
}

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Delegated listener para botones "Agregar al Carrito"
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;
        const productId = parseInt(btn.dataset.id);
        if (!productId) return;

        const added = addToCart(productId);
        if (added) {
            btn.disabled = true;
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            btn.innerHTML = '<i class="bi bi-check-lg me-2"></i> En el Carrito';
        }
    });
});