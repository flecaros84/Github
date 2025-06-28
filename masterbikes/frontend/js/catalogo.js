const productContainer = document.getElementById('productContainer');
const resultsCount = document.getElementById('resultsCount');
const priceRange = document.getElementById('priceRange');
const priceDisplay = document.getElementById('priceDisplay');
const typeFilter = document.getElementById('typeFilter');
const sizeFilter = document.getElementById('sizeFilter');
const brandFilter = document.getElementById('brandFilter');
const ratingFilter = document.getElementById('ratingFilter');
const sortOrder = document.getElementById('sortOrder');
const clearFilters = document.getElementById('clearFilters');
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');

// **estado compartido** por todas las funciones
let filters = {
    type: 'Todas las bicicletas',
    size: 'Todas las tallas',
    maxPrice: 3000000,
    brand: 'Todas las marcas',
    minRating: 0
};
let viewMode    = 'grid';
let currentSort = 'featured';

document.addEventListener('DOMContentLoaded', function() {    // Referencias a elementos del DOM

    window.bikeData = window.bikeData || [];

    fetch('http://localhost:8080/api/catalogo/api/v1/catalogo/bicicletas')
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener el catálogo');
            return res.json();
        })
        .then(data => {
            window.bikeData = data.map(item => ({
                id: item.id,
                name: item.modelo,
                brand: item.marco.marca,
                type: item.marco.tipoUso,
                size: item.tallaUsuario,
                price: item.precioUnitario,
                oldPrice: null,
                rating: 0,
                image: "../images/default.jpg", // Puedes cambiar esto por lógica real si usas imágenes por modelo
                discount: 0,
                description: item.marco.descripcion,
                detailPage: `detalle.html?id=${item.id}`,
                stock: 10 // Puedes ajustar esto si tienes lógica real de stock
            }));
            initCatalog(); // Inicializa todo
            if (typeof updateCartUI === 'function') {
                updateCartUI();
            }
        })
        .catch(err => {
            console.error('Error al cargar catálogo:', err);
            const container = document.getElementById('productContainer');
            container.innerHTML = '<p class="text-danger">No se pudo cargar el catálogo.</p>';
        });
    

    // ¡Renderizar por primera vez!
    console.log(window.bikeData)

    // Asegurarse de que el carrito esté inicializado
    if (typeof updateCartUI === 'function') {
        updateCartUI();
    }
});

/**
 * Inicializa la funcionalidad del catálogo
 */
function initCatalog() {
    // Configurar los botones de agregar al carrito
    setupAddToCartButtons();
    
    // Configurar los filtros y ordenamiento
    setupFilters();
    
    // Inicializar información de stock
    //initializeStockInfo();
    loadProducts();

}

/**
 * Configura los botones de vista (cuadrícula/lista)
 */
function setupViewButtons() {
    if (gridView && listView && productContainer) {
        // Grid view button click handler
        gridView.addEventListener('click', function() {
            productContainer.classList.remove('list-view');
            productContainer.classList.add('grid-view');
            
            // Update active button state
            gridView.classList.add('active');
            listView.classList.remove('active');
            
            // Save preference to localStorage
            localStorage.setItem('preferredView', 'grid');
            
            // Update view mode
            viewMode = 'grid';
            applyFilters();
        });
        
        // List view button click handler
        listView.addEventListener('click', function() {
            productContainer.classList.remove('grid-view');
            productContainer.classList.add('list-view');
            
            // Update active button state
            listView.classList.add('active');
            gridView.classList.remove('active');
            
            // Save preference to localStorage
            localStorage.setItem('preferredView', 'list');
            
            // Update view mode
            viewMode = 'list';
            applyFilters();
        });
        
        // Load saved preference or default to grid view
        const preferredView = localStorage.getItem('preferredView') || 'grid';
        if (preferredView === 'list') {
            listView.click();
        } else {
            gridView.click();
        }
    }
}

/**
 * Configura los botones de agregar al carrito en la página de catálogo
 */
function setupAddToCartButtons() {
    // Esta función se llamará después de renderizar los productos
    document.addEventListener('click', function(event) {
        // Usar delegación de eventos para manejar botones de agregar al carrito
        if (event.target.closest('.add-to-cart-btn')) {
            event.preventDefault();
            const button = event.target.closest('.add-to-cart-btn');
            
            // Obtener información del producto
            const productCard = button.closest('.product-card, .card');
            if (!productCard) return;
            
            // Obtener ID del producto
            const productId = button.getAttribute('data-product-id');
            
            // Buscar el nombre del producto
            let productName = '';
            const titleElement = productCard.querySelector('.product-title, .card-title');
            if (titleElement) {
                productName = titleElement.textContent.trim();
            }
            
            // Buscar el precio del producto
            let productPrice = 0;
            const priceElement = productCard.querySelector('.product-price');
            if (priceElement) {
                productPrice = parseFloat(priceElement.getAttribute('data-price') || 
priceElement.textContent.replace(/[^\d]/g, ''));
            }
            
            // Buscar la imagen del producto
            let productImage = '';
            const imageElement = productCard.querySelector('.card-img-top');
            if (imageElement) {
                productImage = imageElement.src;
            }
            
            // Verificar stock antes de agregar al carrito
            checkStockAndAddToCart(productId, productName, productPrice, productImage);
        }
    });
}

/**
 * Verifica el stock disponible y agrega el producto al carrito si hay disponibilidad
 */
async function checkStockAndAddToCart(productId, productName, productPrice, productImage) {
    try {
        // Mostrar indicador de carga
        showLoadingIndicator(productId);
        
        // Verificar stock usando la API
        let stockAvailable = true;
        let stockQuantity = 0;
        
        try {
            const stockData = await API.getStockBicicleta(productId);
            if (stockData) {
                // Sumar el stock de todas las sucursales
                stockQuantity = Object.values(stockData.sucursales).reduce((total, qty) => total + qty, 0);
                stockAvailable = stockQuantity > 0;
                
                console.log(`Stock para ${productName}: ${stockQuantity} unidades`);
            }
        } catch (error) {
            console.warn('No se pudo verificar el stock:', error);
            // Si hay un error al verificar el stock, asumimos que hay stock disponible
            stockAvailable = true;
        }
        
        // Ocultar indicador de carga
        hideLoadingIndicator(productId);
        
        if (stockAvailable) {
            // Crear objeto de producto para el carrito
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1,
                maxStock: stockQuantity // Guardar el stock máximo disponible
            };
            
            // Agregar al carrito
            const added = addToCart(productId, 1, {}, product);
            
            if (added) {
                // Actualizar el stock mostrado (restar 1 unidad)
                updateProductStock(productId);
                
                // Mostrar notificación de éxito
                showSuccessNotification(productName);
            }
        } else {
            // Mostrar notificación de falta de stock
            showErrorNotification('Lo sentimos, no hay stock disponible para este producto.');
        }
    } catch (error) {
        console.error('Error al verificar stock:', error);
        hideLoadingIndicator(productId);
        showErrorNotification('Error al verificar disponibilidad del producto.');
    }
}

/**
 * Muestra un indicador de carga en el botón
 */
function showLoadingIndicator(productId) {
    const button = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
    if (button) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Agregando...';
    }
}

/**
 * Oculta el indicador de carga del botón
 */
function hideLoadingIndicator(productId) {
    const button = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
    if (button) {
        button.disabled = false;
        button.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar al carrito';
    }
}

/**
 * Muestra una notificación de éxito cuando se agrega un producto al carrito
 */
function showSuccessNotification(productName) {
    const toastEl = document.getElementById('notificationToast');
    const toastBody = toastEl.querySelector('.toast-body');
    
    // Actualizar el contenido del toast
    toastBody.textContent = `${productName} agregado al carrito correctamente.`;
    
    // Mostrar el toast
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

/**
 * Muestra una notificación de error
 */
function showErrorNotification(message) {
    const toastEl = document.getElementById('notificationToast');
    const toastHeader = toastEl.querySelector('.toast-header i');
    const toastBody = toastEl.querySelector('.toast-body');
    
    // Cambiar el ícono a error
    toastHeader.className = 'bi bi-exclamation-circle-fill text-danger me-2';
    
    // Actualizar el contenido del toast
    toastBody.textContent = message;
    
    // Mostrar el toast
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    
    // Restaurar el ícono después de un tiempo
    setTimeout(() => {
        toastHeader.className = 'bi bi-check-circle-fill text-success me-2';
    }, 5000);
}

/**
 * Configura los filtros y ordenamiento del catálogo
 */
function setupFilters() {
    // Evento para el rango de precio
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const value = this.value;
            priceDisplay.textContent = formatPrice(value);
            filters.maxPrice = parseInt(value);
            applyFilters();
        });
    }
    
    // Eventos para los selectores de filtro
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            filters.type = this.value;
            applyFilters();
        });
    }
    
    if (sizeFilter) {
        sizeFilter.addEventListener('change', function() {
            filters.size = this.value;
            applyFilters();
        });
    }
    
    if (brandFilter) {
        brandFilter.addEventListener('change', function() {
            filters.brand = this.value;
            applyFilters();
        });
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', function() {
            filters.minRating = parseFloat(this.value);
            applyFilters();
        });
    }
    
    // Evento para ordenar
    if (sortOrder) {
        sortOrder.addEventListener('change', function() {
            currentSort = this.value;
            applyFilters();
        });
    }
    
    // Evento para limpiar filtros
    if (clearFilters) {
        clearFilters.addEventListener('click', resetFilters);
    }
}

/**
 * Función para cargar productos
 */
function loadProducts() {
    if (!productContainer) return;

    // 1) Muestro el spinner
    productContainer.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando productos...</p>
    </div>
  `;

    // 2) Fetch al backend
    fetch('http://localhost:8080/api/catalogo/api/v1/catalogo/bicicletas')
        .then(resp => {
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            return resp.json();
        })
        .then(data => {
            // 3) Transforma tu respuesta al formato que espera tu JS
            window.bikeData = data.map(item => ({
                id: item.id,
                name: item.modelo,
                brand: item.marco.marca,
                price: item.precioUnitario,
                description: item.marco.descripcion,
                image: item.marco.imagenUrl || `../images/bicicletas/${item.id}.jpg`,
                size: item.tallaUsuario,
                rating: item.marco.rating || 0,
                stock:  Math.floor(Math.random() * 10) + 1, // o usa tu initializeStockInfo
                detailPage: '#'  // o item.detailUrl si lo tienes
            }));

            // 4) Inicializa stock (si lo necesitas) y luego pinta
            initializeStockInfo();
            applyFilters();
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

// Función para aplicar filtros
function applyFilters() {
    if (!productContainer) return;
    
    // Filtrar productos
    let filteredProducts = window.bikeData.filter(product => {
        // Filtrar por tipo
        if (filters.type !== 'Todas las bicicletas' && product.type !== filters.type) {
            return false;
        }
        
        // Filtrar por talla
        if (filters.size !== 'Todas las tallas' && product.size !== filters.size) {
            return false;
        }
        
        // Filtrar por precio
        if (product.price > filters.maxPrice) {
            return false;
        }
        
        // Filtrar por marca
        if (filters.brand !== 'Todas las marcas' && product.brand !== filters.brand) {
            return false;
        }
        
        // Filtrar por valoración
        if (product.rating < filters.minRating) {
            return false;
        }
        
        return true;
    });
    
    // Ordenar productos
    filteredProducts = sortProducts(filteredProducts, currentSort);
    
    // Actualizar contador de resultados
    if (resultsCount) {
        resultsCount.textContent = filteredProducts.length;
    }
    
    // Mostrar productos
    renderProducts(filteredProducts);
}

// Función para ordenar productos
function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
        case 'priceAsc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'nameAsc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nameDesc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default: // featured - mantener el orden original
            break;
    }
    
    return sortedProducts;
}

// Función para renderizar productos
function renderProducts(products) {
    if (!productContainer) return;
    
    // Limpiar contenedor
    productContainer.innerHTML = '';
    
    // Verificar si hay productos
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
    
    // Renderizar productos
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = `col-md-4 mb-4 ${viewMode === 'grid' ? 'col-lg-3' : ''}`;
        productElement.innerHTML = `
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
                    <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}"><i class="bi bi-cart-plus"></i> Agregar al carrito</button>
                    <a href="${product.detailPage}" class="btn btn-secondary mt-2">Ver detalles</a>
                </div>
            </div>
        `;
        productContainer.appendChild(productElement);
    });
}

// Función para formatear el precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
}

// Función para restablecer filtros
function resetFilters() {
    filters = {
        type: 'Todas las bicicletas',
        size: 'Todas las tallas',
        maxPrice: 3000000,
        brand: 'Todas las marcas',
        minRating: 0
    };
    currentSort = 'featured';
    priceRange.value = filters.maxPrice;
    priceDisplay.textContent = formatPrice(filters.maxPrice);
    typeFilter.value = filters.type;
    sizeFilter.value = filters.size;
    brandFilter.value = filters.brand;
    ratingFilter.value = filters.minRating;
    sortOrder.value = currentSort;
    applyFilters();
}

// Función para establecer el modo de vista
function setViewMode(mode) {
    viewMode = mode;
    gridView.classList.toggle('active', viewMode === 'grid');
    listView.classList.toggle('active', viewMode === 'list');
    productContainer.classList.toggle('row-cols-md-4', viewMode === 'grid');
    productContainer.classList.toggle('row-cols-md-1', viewMode === 'list');
    applyFilters();
}

// Función para inicializar la información de stock
function initializeStockInfo() {
    // Aquí se podría agregar lógica para inicializar o actualizar la información de stock
    // Por ejemplo, hacer una llamada a una API para obtener la cantidad de stock disponible
    // y actualizar los objetos en window.bikeData con esta información.
    // Para este ejemplo, asumiremos que cada producto tiene un stock predeterminado.
    window.bikeData.forEach(product => {
        if (!product.stock) {
            product.stock = Math.floor(Math.random() * 10) + 1; // Stock aleatorio entre 1 y 10
        }
    });
}