document.addEventListener('DOMContentLoaded', function () {

    // ====================================================\n    // CONSTANTES Y ESTADO INICIAL
    // ====================================================
    const stockInfo = document.getElementById('stockInfo');
    const storeSelect = document.getElementById('storeSelect');
    const sizeSelect = document.getElementById('sizeSelect');
    const quantityInput = document.getElementById('quantityInput');
    const productTitle = document.getElementById('productTitle');
    const addToCartButton = document.getElementById('addToCartButton');
    const cartOffcanvasEl = document.getElementById('cartOffcanvas');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const cartBadge = document.querySelector('.cart-badge');
    const addedToCartModalEl = document.getElementById('addedToCartModal');

    // Instancias de Bootstrap
    const cartOffcanvas = cartOffcanvasEl ? new bootstrap.Offcanvas(cartOffcanvasEl) : null;
    const addedToCartModal = addedToCartModalEl ? new bootstrap.Modal(addedToCartModalEl) : null;

    // Stock (debe ser consistente con el inicializado en orion.html)
    const stockByStoreAndSize = window.stockByStoreAndSize || {};

    // ====================================================
    // FUNCIONES DEL CARRITO
    // ====================================================

    function formatPrice(price) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    }

    function updateCartBadge() {
        if (!cartBadge) return;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = totalQuantity > 0 ? 'block' : 'none';
    }

    function renderCart() {
        if (!cartItemsContainer) return;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                const itemHTML = `
                    <div class="d-flex align-items-start justify-content-between mb-3 cart-item">
                        <div class="d-flex">
                            <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover" class="me-2 rounded">
                            <div>
                                <strong>${item.name}</strong><br>
                                <small>Talla: ${item.size} | ${item.store}</small><br>
                                <small>${formatPrice(item.price)} x ${item.quantity}</small>
                            </div>
                        </div>
                        <div class="text-end">
                            <small class="d-block mb-1 fw-bold">${formatPrice(itemTotal)}</small>
                            <button class="btn btn-sm btn-outline-danger remove-from-cart" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.innerHTML += itemHTML;
            });
        }

        if (cartTotalEl) cartTotalEl.textContent = formatPrice(total);
        updateCartBadge();
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (index >= 0 && index < cart.length) {
            const item = cart[index];
            // Devolver stock
            if (stockByStoreAndSize[item.size] && stockByStoreAndSize[item.size][item.store] !== undefined) {
                stockByStoreAndSize[item.size][item.store] += item.quantity;
            }
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateStockInfo(); // Actualizar el display de stock
        }
    }

    function clearCart() {
        localStorage.removeItem('cart');
        renderCart();
    }

    function showAddedToCartModal(item) {
        if (!addedToCartModal) return;

        document.getElementById('modalProductImg').src = item.image;
        document.getElementById('modalProductName').textContent = item.name;
        document.getElementById('modalProductDetails').textContent = `Cantidad: ${item.quantity} | Talla: ${item.size} | Tienda: ${item.store}`;

        addedToCartModal.show();
    }

    function updateStockInfo() {
        const selectedSize = sizeSelect.value;
        const selectedStore = storeSelect.value;
        if (selectedSize && selectedStore) {
            const availableStock = stockByStoreAndSize[selectedSize][selectedStore];
            stockInfo.textContent = `${availableStock} unidades disponibles`;
        } else {
            stockInfo.textContent = 'Selecciona talla y tienda';
        }
    }

    function handleAddToCart() {
        if (!storeSelect.value || !sizeSelect.value) {
            alert('Debes seleccionar tienda y talla antes de agregar al carrito');
            return;
        }

        const quantity = parseInt(quantityInput.value);
        const availableStock = stockByStoreAndSize[sizeSelect.value][storeSelect.value];

        if (quantity > availableStock) {
            alert('No hay suficiente stock disponible');
            return;
        }

        const item = {
            id: 'orion-4-titanium',
            name: productTitle.textContent,
            price: 599990,
            size: sizeSelect.value,
            quantity: quantity,
            image: '../images/ba2961-orion-4-29-titanio-2022-03.jpg',
            store: storeSelect.options[storeSelect.selectedIndex].text
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(cartItem =>
            cartItem.id === item.id && cartItem.size === item.size && cartItem.store === item.store
        );

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.unshift(item);
        }

        stockByStoreAndSize[sizeSelect.value][storeSelect.value] -= quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateStockInfo();

        renderCart();
        showAddedToCartModal(item);

        quantityInput.value = 1;
    }

    // ====================================================
    // EVENT LISTENERS
    // ====================================================

    if (addToCartButton) {
        addToCartButton.addEventListener('click', handleAddToCart);
    }

    if (storeSelect) storeSelect.addEventListener('change', updateStockInfo);
    if (sizeSelect) sizeSelect.addEventListener('change', updateStockInfo);

    // Listener para el botón "Ver Carrito" en la modal
    const viewCartBtn = document.getElementById('viewCartBtn');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', function() {
            if (addedToCartModal) addedToCartModal.hide();
            if (cartOffcanvas) cartOffcanvas.show();
        });
    }

    // Listener para botones de eliminar (usa delegación de eventos)
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(event) {
            const removeButton = event.target.closest('.remove-from-cart');
            if (removeButton) {
                const index = parseInt(removeButton.dataset.index, 10);
                removeFromCart(index);
            }
        });
    }

    // ====================================================
    // INICIALIZACIÓN
    // ====================================================

    updateStockInfo();
    renderCart();
});