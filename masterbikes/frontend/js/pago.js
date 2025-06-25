/**
 * Script para manejar la funcionalidad de la página de pago
 * Permite visualizar el resumen del carrito y procesar el pago
 */

// Inicializar EmailJS
emailjs.init('dF-ZSyQCC3Jx91Pzh');

// Variables globales
let cart = [];
let total = 0;

// Referencias a elementos del DOM
const orderSummary = document.getElementById('orderSummary');
const summaryTotal = document.getElementById('summaryTotal');
const cartBadge = document.querySelector('.cart-badge');
const paymentForm = document.getElementById('paymentForm');

// Formatear precios en CLP
function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);
}

// Renderizar resumen de la orden
function renderSummary() {
  if (!orderSummary || !summaryTotal) return;

  total = 0;
  let html = '';

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <div class="d-flex justify-content-between mb-3">
        <span>${item.name} (x${item.quantity})</span>
        <span>${formatPrice(itemTotal)}</span>
      </div>`;
  });

  orderSummary.innerHTML = html;
  summaryTotal.textContent = formatPrice(total);
}

// Actualizar badge del carrito
function renderBadge() {
  if (cartBadge) {
    cartBadge.textContent = cart.reduce((t, it) => t + it.quantity, 0);
  }
}

// Procesar el pago
async function procesarPago(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const paymentData = {
    cardNumber: formData.get('cardNumber'),
    cardName: formData.get('cardName'),
    expiryDate: formData.get('expiryDate'),
    cvv: formData.get('cvv')
  };

  try {
    // Crear la venta
    const ventaData = {
      items: cart.map(item => ({
        productoId: item.id,
        cantidad: item.quantity,
        precioUnitario: item.price,
        sucursal: item.store
      })),
      total: cart.reduce((t, it) => t + (it.price * it.quantity), 0),
      metodoPago: 'TARJETA',
      datosCliente: {
        nombre: formData.get('cardName'),
        email: sessionManager.getCurrentUser()?.email
      }
    };

    const ventaResponse = await API.crearVenta(ventaData);

    if (ventaResponse.id) {
      // Limpiar carrito
      localStorage.removeItem('masterBikesCart');
      
      // Enviar email de confirmación
      await emailjs.send('service_masterb', 'template_compra', {
        to_name: formData.get('cardName'),
        order_id: ventaResponse.id,
        total: formatPrice(ventaData.total)
      });

      // Redirigir a página de éxito
      window.location.href = '/success.html';
    } else {
      throw new Error('Error al procesar la venta');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al procesar el pago. Por favor, intente nuevamente.');
  }
}

// Cargar el carrito desde localStorage
function loadCart() {
  cart = JSON.parse(localStorage.getItem('masterBikesCart')) || [];
  total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
}

// Mostrar el resumen del carrito
function displayCartSummary() {
  const cartSummaryContainer = document.getElementById('cart-summary');
  if (!cartSummaryContainer) return;
  
  // Limpiar el contenedor
  cartSummaryContainer.innerHTML = '';
  
  // Verificar si el carrito está vacío
  if (cart.length === 0) {
    cartSummaryContainer.innerHTML = `
      <div class="alert alert-info">
        Tu carrito está vacío. <a href="personalizacion.html" class="alert-link">Volver a la tienda</a>
      </div>
    `;
    
    // Deshabilitar el formulario de pago
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
      const inputs = paymentForm.querySelectorAll('input, select, button[type="submit"]');
      inputs.forEach(input => {
        input.disabled = true;
      });
    }
    
    return;
  }
  
  // Crear tabla de resumen
  const table = document.createElement('table');
  table.className = 'table';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th class="text-end">Precio</th>
      </tr>
    </thead>
    <tbody id="cart-items">
    </tbody>
    <tfoot>
      <tr>
        <th colspan="2">Total</th>
        <th class="text-end">${formatPrice(total)}</th>
      </tr>
    </tfoot>
  `;
  
  cartSummaryContainer.appendChild(table);
  
  // Agregar los items a la tabla
  const cartItemsContainer = document.getElementById('cart-items');
  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <strong>${item.name}</strong>
        ${item.isCustom ? `<br><small>Modelo base: ${item.baseModel}</small>` : ''}
      </td>
      <td>${item.quantity || 1}</td>
      <td class="text-end">${formatPrice(item.price)}</td>
    `;
    cartItemsContainer.appendChild(row);
  });
}

// Inicializar el formulario de pago
function initPaymentForm() {
  const paymentForm = document.getElementById('payment-form');
  if (!paymentForm) return;
  
  paymentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validar el formulario
    if (validateForm()) {
      // Procesar el pago
      procesarPago();
    }
  });
  
  // Actualizar el total en el botón de pago
  const payButton = document.querySelector('#payment-form button[type="submit"]');
  if (payButton) {
    payButton.textContent = `Pagar ${formatPrice(total)}`;
  }
}

// Validar el formulario de pago
function validateForm() {
  // Obtener los campos del formulario
  const cardName = document.getElementById('card-name');
  const cardNumber = document.getElementById('card-number');
  const cardExpiry = document.getElementById('card-expiry');
  const cardCVC = document.getElementById('card-cvc');
  
  // Validar que los campos no estén vacíos
  let isValid = true;
  
  if (!cardName || !cardName.value.trim()) {
    showError(cardName, 'El nombre del titular es obligatorio');
    isValid = false;
  } else {
    clearError(cardName);
  }
  
  if (!cardNumber || !cardNumber.value.trim()) {
    showError(cardNumber, 'El número de tarjeta es obligatorio');
    isValid = false;
  } else if (!/^\d{16}$/.test(cardNumber.value.replace(/\s/g, ''))) {
    showError(cardNumber, 'El número de tarjeta debe tener 16 dígitos');
    isValid = false;
  } else {
    clearError(cardNumber);
  }
  
  if (!cardExpiry || !cardExpiry.value.trim()) {
    showError(cardExpiry, 'La fecha de expiración es obligatoria');
    isValid = false;
  } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry.value)) {
    showError(cardExpiry, 'Formato inválido. Use MM/YY');
    isValid = false;
  } else {
    clearError(cardExpiry);
  }
  
  if (!cardCVC || !cardCVC.value.trim()) {
    showError(cardCVC, 'El código de seguridad es obligatorio');
    isValid = false;
  } else if (!/^\d{3,4}$/.test(cardCVC.value)) {
    showError(cardCVC, 'El código debe tener 3 o 4 dígitos');
    isValid = false;
  } else {
    clearError(cardCVC);
  }
  
  return isValid;
}

// Mostrar mensaje de error
function showError(input, message) {
  // Obtener el elemento padre del input
  const formGroup = input.closest('.mb-3');
  
  // Eliminar cualquier mensaje de error existente
  clearError(input);
  
  // Agregar la clase de error
  input.classList.add('is-invalid');
  
  // Crear el mensaje de error
  const errorDiv = document.createElement('div');
  errorDiv.className = 'invalid-feedback';
  errorDiv.textContent = message;
  
  // Agregar el mensaje después del input
  formGroup.appendChild(errorDiv);
}

// Eliminar mensaje de error
function clearError(input) {
  input.classList.remove('is-invalid');
  
  // Obtener el elemento padre del input
  const formGroup = input.closest('.mb-3');
  
  // Eliminar el mensaje de error si existe
  const errorDiv = formGroup.querySelector('.invalid-feedback');
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Cargar el carrito desde localStorage
  loadCart();
  
  // Mostrar el resumen del carrito
  displayCartSummary();
  
  // Inicializar el formulario de pago
  initPaymentForm();
  
  // Configurar el botón de volver
  const backButton = document.getElementById('back-button');
  if (backButton) {
    backButton.addEventListener('click', function() {
      window.history.back();
    });
  }

  renderSummary();
  renderBadge();
  
  if (paymentForm) {
    paymentForm.addEventListener('submit', procesarPago);
  }
});
