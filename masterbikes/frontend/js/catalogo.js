const productContainer = document.getElementById('productContainer');
const resultsCount    = document.getElementById('resultsCount');
const priceRange      = document.getElementById('priceRange');
const priceDisplay    = document.getElementById('priceDisplay');
const typeFilter      = document.getElementById('typeFilter');
const sizeFilter      = document.getElementById('sizeFilter');
const brandFilter     = document.getElementById('brandFilter');
const ratingFilter    = document.getElementById('ratingFilter');
const sortOrder       = document.getElementById('sortOrder');
const clearFilters    = document.getElementById('clearFilters');
const gridView        = document.getElementById('gridView');
const listView        = document.getElementById('listView');

const GATEWAY_URL = 'http://localhost:8080';

const API = {
    getStockBicicleta: (productId, tipoProducto) => {
        const url = `${GATEWAY_URL}/api/inventario/api/v1/inventarios/cantidad`
            + `?productoId=${productId}`
            + `&tipoProducto=${encodeURIComponent(tipoProducto)}`;
        return fetch(url).then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        });
    }
};

let filters = {
    type: 'Todas las bicicletas',
    size: 'Todas las tallas',
    maxPrice: 3000000,
    brand: 'Todas las marcas',
    minRating: 0
};
let viewMode    = 'grid';
let currentSort = 'featured';

document.addEventListener('DOMContentLoaded', function() {
    window.bikeData = window.bikeData || [];

    fetch('http://localhost:8080/api/catalogo/api/v1/catalogo/bicicletas')
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener el catálogo');
            return res.json();
        })
        .then(data => {
            // Filtrar solo las predefinidas
            const predefinidas = data.filter(item => item.esPredefinida);

            window.bikeData = predefinidas.map(item => ({
                id:          item.id,
                name:        item.modelo,
                brand:       item.marca,            // usa item.marca tal como lo defines en tu servicio
                type:        item.marco.tipoUso,
                size:        item.tallaUsuario,
                price:       item.precioUnitario,
                oldPrice:    null,
                rating:      0,
                image:       "../images/default.jpg",
                discount:    0,
                description: item.descripcion,
                detailPage:  `detalle.html?id=${item.id}`,
                stock:       10
            }));

            initCatalog();
            if (typeof updateCartUI === 'function') updateCartUI();
        })
        .catch(err => {
            console.error('Error al cargar catálogo:', err);
            productContainer.innerHTML = '<p class="text-danger">No se pudo cargar el catálogo.</p>';
        });
});

function initCatalog() {
    setupViewButtons();
    setupAddToCartButtons();
    setupFilters();
    loadProducts();
}

function setupViewButtons() {
    if (gridView && listView && productContainer) {
        gridView.addEventListener('click', () => {
            productContainer.classList.remove('list-view');
            productContainer.classList.add('grid-view');
            gridView.classList.add('active');
            listView.classList.remove('active');
            localStorage.setItem('preferredView', 'grid');
            viewMode = 'grid';
            applyFilters();
        });
        listView.addEventListener('click', () => {
            productContainer.classList.remove('grid-view');
            productContainer.classList.add('list-view');
            listView.classList.add('active');
            gridView.classList.remove('active');
            localStorage.setItem('preferredView', 'list');
            viewMode = 'list';
            applyFilters();
        });
        const preferredView = localStorage.getItem('preferredView') || 'grid';
        if (preferredView === 'list') {
            listView.click();
        } else {
            gridView.click();
        }
    }
}

function setupAddToCartButtons() {
    document.addEventListener('click', function(event) {
        const btn = event.target.closest('.add-to-cart-btn');
        if (!btn) return;
        event.preventDefault();
        const productCard = btn.closest('.product-card, .card');
        if (!productCard) return;

        const productId    = btn.getAttribute('data-product-id');
        const productType  = btn.getAttribute('data-product-type');
        const titleEl      = productCard.querySelector('.product-title, .card-title');
        const priceEl      = productCard.querySelector('.product-price');
        const imgEl        = productCard.querySelector('.card-img-top');

        const productName  = titleEl ? titleEl.textContent.trim() : '';
        const productPrice = priceEl
            ? parseFloat(priceEl.getAttribute('data-price') || priceEl.textContent.replace(/[^\d]/g, ''))
            : 0;
        const productImage = imgEl ? imgEl.src : '';

        checkStockAndAddToCart(productId, productName, productPrice, productImage);
    });
}

async function checkStockAndAddToCart(productId, productName, productPrice, productImage) {
    try {
        showLoadingIndicator(productId);
        let stockAvailable = true;
        let stockQuantity  = 0;

        try {
            const button       = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
            const tipoProducto = button.getAttribute('data-product-type');
            const sucursales   = await API.getStockBicicleta(productId, tipoProducto);
            stockQuantity      = sucursales.map(s => s.cantidad).reduce((sum, c) => sum + c, 0);
            stockAvailable     = stockQuantity > 0;
            console.log(`Stock para ${productName}: ${stockQuantity} unidades`);
        } catch {
            stockAvailable = true;
        }

        hideLoadingIndicator(productId);

        if (stockAvailable) {
            const product = {
                id:       productId,
                name:     productName,
                price:    productPrice,
                image:    productImage,
                quantity: 1,
                maxStock: stockQuantity
            };
            if (addToCart(productId, 1, {}, product)) {
                updateProductStock(productId);
                showSuccessNotification(productName);
            }
        } else {
            showErrorNotification('Lo sentimos, no hay stock disponible para este producto.');
        }
    } catch (error) {
        console.error('Error al verificar stock:', error);
        hideLoadingIndicator(productId);
        showErrorNotification('Error al verificar disponibilidad del producto.');
    }
}

function showLoadingIndicator(productId) {
    const button = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
    if (button) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Agregando...';
    }
}

function hideLoadingIndicator(productId) {
    const button = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
    if (button) {
        button.disabled = false;
        button.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar al carrito';
    }
}

function showSuccessNotification(productName) {
    const toastEl  = document.getElementById('notificationToast');
    const toast    = new bootstrap.Toast(toastEl);
    toastEl.querySelector('.toast-body').textContent = `${productName} agregado al carrito correctamente.`;
    toast.show();
}

function showErrorNotification(message) {
    const toastEl  = document.getElementById('notificationToast');
    const toastHdr = toastEl.querySelector('.toast-header i');
    const toast    = new bootstrap.Toast(toastEl);
    toastHdr.className = 'bi bi-exclamation-circle-fill text-danger me-2';
    toastEl.querySelector('.toast-body').textContent = message;
    toast.show();
    setTimeout(() => {
        toastHdr.className = 'bi bi-check-circle-fill text-success me-2';
    }, 5000);
}

function setupFilters() {
    if (priceRange) {
        priceRange.addEventListener('input', () => {
            filters.maxPrice   = parseInt(priceRange.value);
            priceDisplay.textContent = formatPrice(filters.maxPrice);
            applyFilters();
        });
    }
    if (typeFilter)   typeFilter.addEventListener('change', () => { filters.type = typeFilter.value; applyFilters(); });
    if (sizeFilter)   sizeFilter.addEventListener('change', () => { filters.size = sizeFilter.value; applyFilters(); });
    if (brandFilter)  brandFilter.addEventListener('change', () => { filters.brand = brandFilter.value; applyFilters(); });
    if (ratingFilter) ratingFilter.addEventListener('change', () => { filters.minRating = parseFloat(ratingFilter.value); applyFilters(); });
    if (sortOrder)    sortOrder.addEventListener('change', () => { currentSort = sortOrder.value; applyFilters(); });
    if (clearFilters) clearFilters.addEventListener('click', resetFilters);
}

function loadProducts() {
    if (!productContainer) return;

    productContainer.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando productos...</p>
    </div>
  `;

    fetch('http://localhost:8080/api/catalogo/api/v1/catalogo/bicicletas')
        .then(resp => {
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            return resp.json();
        })
        .then(data => {
            const predefinidas = data.filter(item => item.esPredefinida);
            window.bikeData = predefinidas.map(item => ({
                id:          item.id,
                name:        item.modelo,
                brand:       item.marca,
                type:        item.marco.tipoUso,
                size:        item.tallaUsuario,
                price:       item.precioUnitario,
                description: item.descripcion,
                image:       item.marco.imagenUrl || `../images/bicicletas/${item.id}.jpg`,
                rating:      item.valoracion || 0,
                stock:       Math.floor(Math.random() * 10) + 1,
                detailPage:  `detalle.html?id=${item.id}`
            }));

            initializeStockInfo()
                .then(applyFilters)
                .catch(err => {
                    console.error('Error al cargar catálogo:', err);
                    productContainer.innerHTML = `
            <div class="col-12 text-center py-5">
              <i class="bi bi-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
              <p class="mt-3">No se pudieron cargar los productos. Intenta de nuevo más tarde.</p>
            </div>
          `
                });
        })
        .catch(err => {
            console.error('Error al cargar catálogo:', err);
            productContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
          <p class="mt-3">No se pudieron cargar los productos. Intenta de nuevo más tarde.</p>
        </div>
      `;
        });
}

function applyFilters() {
    if (!productContainer) return;
    let filtered = window.bikeData.filter(p => {
        if (filters.type       !== 'Todas las bicicletas' && p.type !== filters.type)     return false;
        if (filters.size       !== 'Todas las tallas'     && p.size !== filters.size)     return false;
        if (p.price            > filters.maxPrice)                                      return false;
        if (filters.brand      !== 'Todas las marcas'   && p.brand !== filters.brand)    return false;
        if (p.rating           < filters.minRating)                                    return false;
        return true;
    });
    filtered = sortProducts(filtered, currentSort);
    if (resultsCount) resultsCount.textContent = filtered.length;
    renderProducts(filtered);
}

function sortProducts(products, sortBy) {
    const sorted = [...products];
    switch (sortBy) {
        case 'priceAsc':  sorted.sort((a,b) => a.price - b.price); break;
        case 'priceDesc': sorted.sort((a,b) => b.price - a.price); break;
        case 'nameAsc':   sorted.sort((a,b) => a.name.localeCompare(b.name)); break;
        case 'nameDesc':  sorted.sort((a,b) => b.name.localeCompare(a.name)); break;
        case 'rating':    sorted.sort((a,b) => b.rating - a.rating); break;
    }
    return sorted;
}

function renderProducts(products) {
    if (!productContainer) return;
    productContainer.innerHTML = '';
    if (products.length === 0) {
        productContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-search" style="font-size: 3rem; color: #6c757d;"></i>
        <h4 class="mt-3">No se encontraron productos</h4>
        <p class="text-muted">Intenta con otros filtros o <button class="btn btn-link p-0" id="resetFiltersBtn">limpia los filtros</button></p>
      </div>
    `;
        return;
    }
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = `col-md-4 mb-4 ${viewMode==='grid'?'col-lg-3':''}`;
        div.innerHTML = `
      <div class="card product-card">
        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title product-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><strong>Precio:</strong> <span class="product-price" data-price="${product.price}">${formatPrice(product.price)}</span></p>
          <p class="card-text"><strong>Marca:</strong> ${product.brand}</p>
          <p class="card-text"><strong>Talla:</strong> ${product.size}</p>
          <p class="card-text"><strong>Valoración:</strong> ${product.rating} <i class="bi bi-star-fill"></i></p>
          <p class="card-text"><strong>Stock:</strong> ${product.stock || 0}</p>
          <button class="btn btn-primary add-to-cart-btn"
                  data-product-id="${product.id}"
                  data-product-type="${product.type}">
            <i class="bi bi-cart-plus"></i> Agregar al carrito
          </button>
          <a href="${product.detailPage}" class="btn btn-secondary mt-2">Ver detalles</a>
        </div>
      </div>
    `;
        productContainer.appendChild(div);
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
}

function resetFilters() {
    filters = {
        type: 'Todas las bicicletas',
        size: 'Todas las tallas',
        maxPrice: 3000000,
        brand: 'Todas las marcas',
        minRating: 0
    };
    currentSort = 'featured';
    priceRange.value   = filters.maxPrice;
    priceDisplay.textContent = formatPrice(filters.maxPrice);
    typeFilter.value   = filters.type;
    sizeFilter.value   = filters.size;
    brandFilter.value  = filters.brand;
    ratingFilter.value = filters.minRating;
    sortOrder.value    = currentSort;
    applyFilters();
}

function setViewMode(mode) {
    viewMode = mode;
    gridView.classList.toggle('active', viewMode === 'grid');
    listView.classList.toggle('active', viewMode === 'list');
    productContainer.classList.toggle('row-cols-md-4', viewMode === 'grid');
    productContainer.classList.toggle('row-cols-md-1', viewMode === 'list');
    applyFilters();
}

async function initializeStockInfo() {
    await Promise.all(window.bikeData.map(async product => {
        try {
            const sucursales = await API.getStockBicicleta(product.id, product.type);
            product.sucursales = sucursales;
            product.stock      = sucursales.map(s => s.cantidad).reduce((sum, c) => sum + c, 0);
        } catch {
            product.sucursales = [];
            product.stock      = product.stock || 0;
        }
    }));
}
