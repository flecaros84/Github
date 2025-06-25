(function() {
    // Esta función se ejecuta inmediatamente cuando se carga el script
    function removeCartTable() {
        // Buscar específicamente la tabla con la clase "table" que contiene el carrito
        const tableElement = document.querySelector('table.table');
        if (tableElement) {
            // Eliminar la tabla completa
            tableElement.remove();
            console.log('Tabla del carrito eliminada correctamente');
        } else {
            console.log('No se encontró la tabla del carrito');
        }
        
        // También podemos ocultar la sección completa del carrito
        const cartSection = document.getElementById('cart-section');
        if (cartSection) {
            cartSection.style.display = 'none';
            console.log('Sección del carrito ocultada');
        }
    }
    
    // Función para verificar periódicamente si la tabla existe y eliminarla
    function checkAndRemoveTable() {
        const tableElement = document.querySelector('table.table');
        if (tableElement) {
            tableElement.remove();
            console.log('Tabla del carrito eliminada correctamente');
            return true;
        }
        return false;
    }
    
    // Ejecutar inmediatamente si el DOM ya está cargado
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        removeCartTable();
    } else {
        // O esperar a que el DOM se cargue
        document.addEventListener('DOMContentLoaded', removeCartTable);
    }
    
    // Como medida adicional, verificar periódicamente durante los primeros segundos
    // por si la tabla se carga dinámicamente después
    let checkCount = 0;
    const intervalId = setInterval(() => {
        if (checkAndRemoveTable() || checkCount > 10) {
            clearInterval(intervalId);
        }
        checkCount++;
    }, 300);
})();

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

// Procesar el pago usando Web3Forms
async function procesarPago(event) {
  event.preventDefault();
  
  // Validar el formulario
  if (!validateForm()) {
    return;
  }
  
  // Obtener el botón de submit para mostrar el estado de carga
  const submitButton = document.getElementById('submit-payment');
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
  
  try {
    // Generar número de orden
    const orderNumber = generateOrderNumber();
    
    // Obtener datos del formulario
    const form = document.getElementById('payment-form');
    const formData = new FormData(form);
    
    // Asegurarse de que los campos ocultos estén presentes
    prepareWeb3FormsData();
    
    // Agregar datos adicionales para Web3Forms
    formData.append('order_number', orderNumber);
    formData.append('order_date', new Date().toLocaleDateString());
    formData.append('total', formatPrice(total));
    
    // Obtener el email del cliente
    const customerEmail = document.getElementById('email').value || 
                         document.getElementById('customerEmail')?.value || '';
    
    // Obtener el nombre del cliente
    const customerName = document.getElementById('cardName').value || 
                        document.getElementById('customerName')?.value || '';
    
    // Asegurarse de que estos campos estén en el formulario
    if (!formData.has('email')) {
      formData.append('email', customerEmail);
    }
    
    if (!formData.has('name')) {
      formData.append('name', customerName);
    }
    
    // Simular procesamiento de pago (esperar 2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Enviar el formulario a Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Email enviado con éxito:', data);
      
      // Limpiar el carrito
      localStorage.removeItem('masterBikesCart');
      
      // Mostrar sección de confirmación
      document.getElementById('payment-section').style.display = 'none';
      document.getElementById('confirmation-section').style.display = 'block';
      
      // Actualizar número de orden en la confirmación
      document.getElementById('order-number').textContent = orderNumber;
      
      // Actualizar los pasos del progreso
      document.getElementById('step-2').classList.remove('active');
      document.getElementById('step-3').classList.add('active');
    } else {
      throw new Error(data.message || 'Error al enviar el email');
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
    
    // Restaurar el botón
    submitButton.disabled = false;
    submitButton.innerHTML = 'Pagar Ahora';
  }
}

// Función para generar un número de orden aleatorio
function generateOrderNumber() {
  const prefix = 'MB';
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${timestamp}-${random}`;
}

// Función para enviar email de confirmación
async function sendConfirmationEmail(orderDetails) {
    try {
        // Preparar los datos para el email
        const emailParams = {
            to_name: orderDetails.customerName,
            to_email: orderDetails.customerEmail,
            order_number: orderDetails.orderNumber,
            order_date: orderDetails.date,
            total: formatPrice(orderDetails.total),
            items: orderDetails.cart.map(item => 
                `${item.name} (${item.quantity || 1} x ${formatPrice(item.price)})`
            ).join(', ')
        };
        
        // Enviar email usando EmailJS
        const response = await emailjs.send(
            'service_masterb',  // Reemplaza con tu Service ID
            'template_compra',  // Reemplaza con tu Template ID
            emailParams
        );
        
        console.log('Email enviado con éxito:', response);
        return response;
    } catch (error) {
        console.error('Error al enviar email:', error);
        throw error;
    }
}

// Cargar el carrito desde localStorage
function loadCart() {
  cart = JSON.parse(localStorage.getItem('masterBikesCart') || '[]');
  total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  // Si el carrito está vacío, mostrar mensaje y deshabilitar botón
  if (cart.length === 0) {
    const proceedButton = document.getElementById('proceed-to-payment');
    if (proceedButton) {
      proceedButton.disabled = true;
    }
    
    // Mostrar mensaje en el resumen del pedido
    const orderSummary = document.getElementById('order-summary');
    if (orderSummary) {
      orderSummary.innerHTML = `
        <div class="alert alert-info">
          Tu carrito está vacío. <a href="../index.html" class="alert-link">Volver a la tienda</a>
        </div>
      `;
    }
  }
}

// Mostrar el resumen del carrito (una sola vez)
function displayCartSummary() {
    const orderSummary = document.getElementById('order-summary');
    const subtotalElement = document.getElementById('summary-subtotal');
    const totalElement = document.getElementById('summary-total');
    
    if (!orderSummary) return;
    
    // Limpiar el contenido anterior
    orderSummary.innerHTML = '';
    
    // Verificar si el carrito está vacío
    if (cart.length === 0) {
        orderSummary.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
        return;
    }
    
    // Calcular subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    total = subtotal;
    
    // Mostrar cada producto en el resumen
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item d-flex align-items-center mb-3';
        itemElement.innerHTML = `
            <div class="cart-item-details flex-grow-1">
                <div class="cart-item-name fw-bold">${item.name}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div>Cantidad: ${item.quantity || 1}</div>
                </div>
            </div>
        `;
        orderSummary.appendChild(itemElement);
    });
    
    // Actualizar los totales
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (totalElement) totalElement.textContent = formatPrice(total);
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
  const cardName = document.getElementById('cardName');
  const cardNumber = document.getElementById('cardNumber');
  const expiryDate = document.getElementById('expiryDate');
  const cvv = document.getElementById('cvv');
  
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
  
  if (!expiryDate || !expiryDate.value.trim()) {
    showError(expiryDate, 'La fecha de expiración es obligatoria');
    isValid = false;
  } else if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
    showError(expiryDate, 'Formato inválido. Use MM/AA');
    isValid = false;
  } else {
    clearError(expiryDate);
  }
  
  if (!cvv || !cvv.value.trim()) {
    showError(cvv, 'El código de seguridad es obligatorio');
    isValid = false;
  } else if (!/^\d{3,4}$/.test(cvv.value)) {
    showError(cvv, 'El código debe tener 3 o 4 dígitos');
    isValid = false;
  } else {
    clearError(cvv);
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

// Función para eliminar la tabla duplicada del carrito y mostrar solo el resumen
function cleanupCartDisplay() {
  // 1. Ocultar la sección completa del carrito si existe
  const cartSection = document.getElementById('cart-section');
  if (cartSection) {
    cartSection.style.display = 'none';
  }
  
  // 2. Asegurarse de que solo se muestre el resumen del pedido
  const paymentSection = document.getElementById('payment-section');
  if (paymentSection) {
    paymentSection.style.display = 'block';
  }
  
  // 3. Actualizar la barra de progreso para mostrar que estamos en el paso de pago
  const progressSteps = document.querySelectorAll('.progress-step');
  if (progressSteps.length >= 2) {
    progressSteps[0].classList.remove('active'); // Desactivar paso 1 (Carrito)
    progressSteps[1].classList.add('active');    // Activar paso 2 (Pago)
  }
}

// Configurar validación de formularios
function setupFormValidation() {
  const customerInfoForm = document.getElementById('customer-info-form');
  const paymentForm = document.getElementById('payment-form');
  
  if (customerInfoForm) {
    customerInfoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (this.checkValidity()) {
        // Avanzar al siguiente paso
        document.getElementById('customer-info-section').style.display = 'none';
        document.getElementById('payment-section').style.display = 'block';
        document.getElementById('step-1').classList.remove('active');
        document.getElementById('step-2').classList.add('active');
      }
      this.classList.add('was-validated');
    });
  }
  
  if (paymentForm) {
    paymentForm.addEventListener('submit', procesarPago);
  }
}

// Configurar los botones de navegación
function setupNavigationButtons() {
  const proceedToPaymentBtn = document.getElementById('proceed-to-payment');
  if (proceedToPaymentBtn) {
    proceedToPaymentBtn.addEventListener('click', function(event) {
      // La validación se maneja en el evento submit del formulario
    });
  }
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Cargar el carrito desde localStorage
    loadCart();
    
    // Si el carrito está vacío, redirigir a la página principal
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Serás redirigido a la página principal.');
        window.location.href = '../index.html';
        return;
    }
    
    // Actualizar el resumen del pedido (esto ya existe y funciona)
    displayCartSummary();
    
    // Configurar validación de formularios
    setupFormValidation();
    
    // Configurar los botones de navegación entre pasos
    setupNavigationButtons();
    
    // Configurar navegación entre secciones
    setupSectionNavigation();
    
    // Configurar el botón de volver
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }

    renderSummary();
    renderBadge();
    
    // Configurar el botón de pago
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        // Eliminar cualquier evento anterior
        const newPaymentForm = paymentForm.cloneNode(true);
        paymentForm.parentNode.replaceChild(newPaymentForm, paymentForm);
        
        // Añadir el nuevo evento
        newPaymentForm.addEventListener('submit', procesarPago);
    }
    
    // Actualizar la barra de progreso para mostrar que estamos en el paso de pago
    const progressSteps = document.querySelectorAll('.progress-step');
    if (progressSteps.length >= 2) {
        progressSteps[0].classList.add('active'); // Paso 1 (Carrito)
        progressSteps[1].classList.add('active'); // Paso 2 (Pago)
    }
    
    // Agregar evento al botón de continuar
    const continueButton = document.getElementById('continueToPayment');
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            // Aquí iría la lógica para continuar al siguiente paso
            // Por ahora, simplemente activamos el paso 3 en la barra de progreso
            if (progressSteps.length >= 3) {
                progressSteps[2].classList.add('active'); // Paso 3 (Confirmación)
            }
        });
    }
    
    // Configurar el formulario de información del cliente
    const customerInfoForm = document.getElementById('customer-info-form');
    if (customerInfoForm) {
        customerInfoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validar el formulario
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            
            // Mostrar la sección de pago
            document.getElementById('customer-info-section').style.display = 'none';
            document.getElementById('payment-section').style.display = 'block';
            
            // Actualizar los pasos del progreso
            document.getElementById('step-1').classList.remove('active');
            document.getElementById('step-2').classList.add('active');
            
            // Copiar el email del cliente al formulario de pago
            const customerEmail = document.getElementById('customerEmail').value;
            document.getElementById('email').value = customerEmail;
        });
    }
    
    // Configurar validación de tarjeta de crédito
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Formatear el número de tarjeta (agregar espacios cada 4 dígitos)
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            this.value = formattedValue;
            
            // Validar el número de tarjeta (implementación básica)
            if (value.length < 16) {
                showError(this, 'El número de tarjeta debe tener al menos 16 dígitos');
            } else {
                clearError(this);
            }
        });
    }
    
    // Configurar validación de fecha de expiración
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            // Formatear la fecha (MM/AA)
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.substring(0, 4);
                if (value.length > 2) {
                    this.value = value.substring(0, 2) + '/' + value.substring(2);
                } else {
                    this.value = value;
                }
            }
            
            // Validar la fecha
            if (value.length < 4) {
                showError(this, 'Ingresa una fecha válida (MM/AA)');
            } else {
                const month = parseInt(value.substring(0, 2));
                if (month < 1 || month > 12) {
                    showError(this, 'Mes inválido');
                } else {
                    clearError(this);
                }
            }
        });
    }
    
    // Configurar validación de CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            // Solo permitir números
            this.value = this.value.replace(/\D/g, '').substring(0, 3);
            
            // Validar CVV
            if (this.value.length < 3) {
                showError(this, 'El CVV debe tener 3 dígitos');
            } else {
                clearError(this);
            }
        });
    }
});

// Función para preparar los datos del formulario oculto para Web3Forms
function prepareWeb3FormsData() {
  // Crear o actualizar el campo oculto para la clave de acceso
  let accessKeyInput = document.getElementById('web3forms_access_key');
  if (!accessKeyInput) {
    accessKeyInput = document.createElement('input');
    accessKeyInput.type = 'hidden';
    accessKeyInput.id = 'web3forms_access_key';
    accessKeyInput.name = 'access_key';
    accessKeyInput.value = '6ac00df9-5da4-4eeb-b820-70fdcb4d71e3'; // Tu clave de acceso
    document.getElementById('payment-form').appendChild(accessKeyInput);
  }
  
  // Crear o actualizar el campo oculto para los detalles del pedido
  let orderDetailsInput = document.getElementById('orderDetailsInput');
  if (!orderDetailsInput) {
    orderDetailsInput = document.createElement('input');
    orderDetailsInput.type = 'hidden';
    orderDetailsInput.id = 'orderDetailsInput';
    orderDetailsInput.name = 'order_details';
    document.getElementById('payment-form').appendChild(orderDetailsInput);
  }
  
  // Preparar los detalles del pedido en formato legible
  const orderDetails = cart.map(item => 
    `${item.name} - ${item.quantity || 1} x ${formatPrice(item.price)} = ${formatPrice(item.price * (item.quantity || 1))}`
  ).join('\n');
  
  // Agregar el total
  const fullOrderDetails = `${orderDetails}\n\nTotal: ${formatPrice(total)}`;
  
  // Asignar al campo oculto
  orderDetailsInput.value = fullOrderDetails;
  
  // Crear o actualizar el campo oculto para el asunto del correo
  let subjectInput = document.getElementById('email_subject');
  if (!subjectInput) {
    subjectInput = document.createElement('input');
    subjectInput.type = 'hidden';
    subjectInput.id = 'email_subject';
    subjectInput.name = 'subject';
    subjectInput.value = 'Confirmación de Pedido - MasterBikes';
    document.getElementById('payment-form').appendChild(subjectInput);
  }
  
  // Crear o actualizar el campo oculto para el nombre del remitente
  let fromNameInput = document.getElementById('from_name');
  if (!fromNameInput) {
    fromNameInput = document.createElement('input');
    fromNameInput.type = 'hidden';
    fromNameInput.id = 'from_name';
    fromNameInput.name = 'from_name';
    fromNameInput.value = 'MasterBikes';
    document.getElementById('payment-form').appendChild(fromNameInput);
  }
    // Configurar el botón de pago
    const paymentForm = document.getElementById('payment-form');}

// Actualizar el resumen del pedido
function updateOrderSummary() {
  const orderSummary = document.getElementById('order-summary');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryTotal = document.getElementById('summary-total');
  
  if (!orderSummary || !summarySubtotal || !summaryTotal) return;
  
  // Limpiar el contenedor
  orderSummary.innerHTML = '';
  
  // Verificar si el carrito está vacío
  if (cart.length === 0) {
    orderSummary.innerHTML = `
      <div class="alert alert-info">
        Tu carrito está vacío. <a href="../index.html" class="alert-link">Volver a la tienda</a>
      </div>
    `;
    return;
  }
  
  // Agregar cada item al resumen
  cart.forEach(item => {
    const itemTotal = item.price * (item.quantity || 1);
    const itemHtml = `
      <div class="summary-item">
        <div>
          <strong>${item.name}</strong>
          <div class="text-muted small">
            ${item.quantity || 1} x ${formatPrice(item.price)}
          </div>
        </div>
        <strong>${formatPrice(itemTotal)}</strong>
      </div>
    `;
    orderSummary.innerHTML += itemHtml;
  });
  
  // Actualizar subtotal y total
  summarySubtotal.textContent = formatPrice(total);
  summaryTotal.textContent = formatPrice(total);
  
  // Preparar los datos del formulario oculto para Web3Forms
  prepareWeb3FormsData();
}