// Inicializar EmailJS
emailjs.init('dF-ZSyQCC3Jx91Pzh');

// Referencias a elementos del DOM
const cart = JSON.parse(localStorage.getItem('cart') || '[]');
const orderSummary = document.getElementById('orderSummary');
const summaryTotal = document.getElementById('summaryTotal');
const cartBadge = document.getElementById('cart-badge');
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

  let total = 0;
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
      localStorage.removeItem('cart');
      
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

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  renderSummary();
  renderBadge();
  
  if (paymentForm) {
    paymentForm.addEventListener('submit', procesarPago);
  }
});
