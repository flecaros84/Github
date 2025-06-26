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

let cart = [];
let total = 0;
let customerInfo = {};

// Inicializar EmailJS (si está disponible)
if (typeof emailjs !== 'undefined') {
    emailjs.init("dF-ZSyQCC3Jx91Pzh"); // Reemplaza con tu clave pública real
}

// Función para depurar el carrito
function debugCart() {
    console.group('Depuración del carrito');
    console.log('Carrito completo:', cart);
    
    if (cart.length === 0) {
        console.log('El carrito está vacío');
    } else {
        cart.forEach((item, index) => {
            console.group(`Item ${index + 1}: ${item.name}`);
            console.log('ID:', item.id);
            console.log('Precio:', item.price, typeof item.price);
            console.log('Cantidad:', item.quantity, typeof item.quantity);
            console.log('Total item:', item.price * item.quantity);
            console.groupEnd();
        });
    }
    
    console.log('Total del carrito:', total);
    console.groupEnd();
}

// Cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de pago cargada');
    
    // Cargar el carrito
    loadCart();
    
    // Depurar el carrito para ver qué está pasando
    debugCart();
    
    // Mostrar el resumen del carrito
    displayCartSummary();
    
    // Actualizar el resumen del pedido
    updateOrderSummary();
    
    // Configurar el formulario de información del cliente
    setupCustomerInfoForm();
    
    // Configurar el formulario de pago
    setupPaymentForm();
    
    // Configurar los pasos del proceso de pago
    setupCheckoutSteps();
});

// Función para verificar y crear elementos necesarios si no existen
function ensureRequiredElements() {
    console.log('Verificando elementos necesarios');
    
    // Verificar si existe el botón para volver al carrito
    let backToCartBtn = document.getElementById('back-to-cart');
    if (!backToCartBtn) {
        console.log('Creando botón para volver al carrito');
        
        // Buscar el contenedor donde debería estar el botón
        const paymentSection = document.getElementById('payment-section');
        if (paymentSection) {
            // Crear el botón
            backToCartBtn = document.createElement('button');
            backToCartBtn.id = 'back-to-cart';
            backToCartBtn.className = 'btn btn-outline-secondary mb-3';
            backToCartBtn.innerHTML = '<i class="bi bi-arrow-left"></i> Volver al carrito';
            
            // Insertar al principio de la sección de pago
            paymentSection.insertBefore(backToCartBtn, paymentSection.firstChild);
        }
    }
    
    // Verificar si existen los indicadores de progreso
    const progressContainer = document.querySelector('.checkout-progress');
    if (!progressContainer) {
        console.log('Creando indicadores de progreso');
        
        // Buscar el contenedor principal
        const mainContainer = document.querySelector('.container');
        if (mainContainer) {
            // Crear el contenedor de progreso
            const progressDiv = document.createElement('div');
            progressDiv.className = 'checkout-progress mb-4';
            
            // Crear los pasos
            progressDiv.innerHTML = `
                <div class="progress-step active" data-step="1">
                    <div class="step-number">1</div>
                    <div class="step-label">Carrito</div>
                </div>
                <div class="progress-step" data-step="2">
                    <div class="step-number">2</div>
                    <div class="step-label">Pago</div>
                </div>
                <div class="progress-step" data-step="3">
                    <div class="step-number">3</div>
                    <div class="step-label">Confirmación</div>
                </div>
            `;
            
            // Insertar al principio del contenedor principal
            mainContainer.insertBefore(progressDiv, mainContainer.firstChild);
        }
    }
}

// Formatear precios en CLP
function formatPrice(price) {
    // Asegurarse de que el precio sea un número
    if (typeof price !== 'number' || isNaN(price)) {
        console.error('Precio inválido para formatear:', price);
        price = 0;
    }
    
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Cargar el carrito desde localStorage
function loadCart() {
    // Intentar cargar desde localStorage
    const cartData = localStorage.getItem('masterbikes_cart');
    if (cartData) {
        try {
            cart = JSON.parse(cartData);
            console.log('Carrito cargado:', cart);
            
            // Verificar que cada item tenga precio y cantidad válidos
            cart = cart.map(item => {
                // Asegurarse de que el precio sea un número
                if (typeof item.price !== 'number' || isNaN(item.price)) {
                    console.warn(`Precio inválido para ${item.name}:`, item.price);
                    // Intentar convertir el precio a número si es una cadena
                    if (typeof item.price === 'string') {
                        const numericPrice = parseInt(item.price.replace(/[^\d]/g, ''));
                        item.price = isNaN(numericPrice) ? 0 : numericPrice;
                    } else {
                        item.price = 0;
                    }
                }
                
                // Asegurarse de que la cantidad sea un número
                if (!item.quantity || typeof item.quantity !== 'number' || isNaN(item.quantity)) {
                    console.warn(`Cantidad inválida para ${item.name}:`, item.quantity);
                    item.quantity = 1;
                }
                
                return item;
            });
            
            // Calcular el total
            total = cart.reduce((sum, item) => {
                const itemPrice = typeof item.price === 'number' ? item.price : 0;
                const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1;
                return sum + (itemPrice * itemQuantity);
            }, 0);
            
            console.log('Total calculado:', total);
            
        } catch (error) {
            console.error('Error al parsear el carrito:', error);
            cart = [];
            total = 0;
        }
    } else {
        console.warn('No se encontró ningún carrito en localStorage');
        cart = [];
        total = 0;
    }
}

// Mostrar el resumen del carrito
function displayCartSummary() {
    const cartSummaryContainer = document.getElementById('cart-summary');
    if (!cartSummaryContainer) {
        console.warn('No se encontró el contenedor del resumen del carrito');
        return;
    }
    
    // Limpiar el contenedor
    cartSummaryContainer.innerHTML = '';
    
    // Verificar si el carrito está vacío
    if (!cart || cart.length === 0) {
        cartSummaryContainer.innerHTML = `
            <div class="alert alert-info">
                Tu carrito está vacío. <a href="../index.html" class="alert-link">Volver a la tienda</a>
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
        
        // Deshabilitar el botón de proceder al pago
        const proceedButton = document.getElementById('proceed-to-payment');
        if (proceedButton) {
            proceedButton.disabled = true;
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
    if (cartItemsContainer) {
        cart.forEach(item => {
            const row = document.createElement('tr');
            const itemTotal = item.price * (item.quantity || 1);
            row.innerHTML = `
                <td>
                    <strong>${item.name}</strong>
                    ${item.isCustom ? `<br><small>Modelo base: ${item.baseModel}</small>` : ''}
                </td>
                <td>${item.quantity || 1}</td>
                <td class="text-end">${formatPrice(itemTotal)}</td>
            `;
            cartItemsContainer.appendChild(row);
        });
    }
}

// Actualizar el resumen del pedido
function updateOrderSummary() {
    const orderSummaryContainer = document.getElementById('order-summary');
    if (!orderSummaryContainer) {
        console.warn('No se encontró el contenedor del resumen del pedido');
        return;
    }
    
    // Verificar que el total sea un número válido
    if (typeof total !== 'number' || isNaN(total)) {
        console.error('Total inválido:', total);
        total = 0;
    }
    
    // Calcular subtotal
    const subtotal = total;
    
    // Calcular impuestos (19% IVA en Chile)
    const taxRate = 0.19;
    const taxes = subtotal * taxRate;
    
    // Calcular envío (gratis por ahora)
    const shipping = 0;
    
    // Calcular total final
    const finalTotal = subtotal + taxes + shipping;
    
    console.log('Resumen del pedido:');
    console.log('- Subtotal:', subtotal);
    console.log('- Impuestos:', taxes);
    console.log('- Envío:', shipping);
    console.log('- Total final:', finalTotal);
    
    // Actualizar el resumen
    orderSummaryContainer.innerHTML = `
        <div class="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>IVA (19%):</span>
            <span>${formatPrice(taxes)}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Envío:</span>
            <span>${shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
        </div>
        <div class="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>${formatPrice(finalTotal)}</span>
        </div>
    `;
}

// Configurar los pasos del proceso de pago
function setupCheckoutSteps() {
    console.log('Configurando pasos del checkout');
    
    // Obtener referencias a las secciones
    const customerInfoSection = document.getElementById('customer-info-section');
    const cartSection = document.getElementById('cart-section');
    const paymentSection = document.getElementById('payment-section');
    const confirmationSection = document.getElementById('confirmation-section');
    
    // Verificar si las secciones existen
    if (!customerInfoSection) console.warn('No se encontró la sección de información del cliente');
    if (!cartSection) console.warn('No se encontró la sección del carrito');
    if (!paymentSection) console.warn('No se encontró la sección de pago');
    if (!confirmationSection) console.warn('No se encontró la sección de confirmación');
    
    // Configurar estado inicial
    if (customerInfoSection) customerInfoSection.style.display = 'block';
    if (cartSection) cartSection.style.display = 'none';
    if (paymentSection) paymentSection.style.display = 'none';
    if (confirmationSection) confirmationSection.style.display = 'none';
    
    // Obtener referencias a los indicadores de progreso
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    
    console.log('Pasos de progreso encontrados:', {
        step1: !!step1,
        step2: !!step2,
        step3: !!step3
    });
    
    // Configurar el formulario de información del cliente
    const customerInfoForm = document.getElementById('customer-info-form');
    if (customerInfoForm) {
        console.log('Formulario de información del cliente encontrado');
        
        customerInfoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Formulario de información del cliente enviado');
            
            // Validar el formulario
            if (!customerInfoForm.checkValidity()) {
                event.stopPropagation();
                customerInfoForm.classList.add('was-validated');
                console.log('Formulario de información del cliente inválido');
                return;
            }
            
            // Guardar la información del cliente
            customerInfo = {
                name: document.getElementById('customerName').value,
                email: document.getElementById('customerEmail').value,
                phone: document.getElementById('customerPhone').value,
                address: {
                    line1: document.getElementById('addressLine1').value,
                    line2: document.getElementById('addressLine2').value,
                    city: document.getElementById('city').value,
                    region: document.getElementById('region').value,
                    postalCode: document.getElementById('postalCode').value
                }
            };
            
            console.log('Información del cliente guardada:', customerInfo);
            
            // Cambiar a la sección de pago
            if (customerInfoSection) customerInfoSection.style.display = 'none';
            if (paymentSection) paymentSection.style.display = 'block';
            
            // Actualizar indicador de progreso
            if (step1) step1.classList.remove('active');
            if (step2) step2.classList.add('active');
            
            console.log('Cambiado a la sección de pago');
            
            // Prellenar el email en el formulario de pago
            const emailInput = document.getElementById('email');
            if (emailInput && customerInfo.email) {
                emailInput.value = customerInfo.email;
            }
        });
    } else {
        console.warn('No se encontró el formulario de información del cliente');
    }
    
    // Configurar el botón para proceder al pago
    const proceedToPaymentBtn = document.getElementById('proceed-to-payment');
    if (proceedToPaymentBtn) {
        console.log('Botón de proceder al pago encontrado');
        
        // Asegurarse de que el botón esté dentro del formulario
        const parentForm = proceedToPaymentBtn.closest('form');
        if (!parentForm) {
            console.warn('El botón de proceder al pago no está dentro de un formulario');
        }
    } else {
        console.warn('No se encontró el botón para proceder al pago');
    }
}

// Configurar el formulario de información del cliente
function setupCustomerInfoForm() {
    const customerInfoForm = document.getElementById('customer-info-form');
    if (!customerInfoForm) {
        console.warn('No se encontró el formulario de información del cliente');
        return;
    }
    
    // Prellenar con información del usuario si está disponible
    const userInfo = getUserInfo();
    if (userInfo) {
        const nameInput = document.getElementById('customerName');
        const emailInput = document.getElementById('customerEmail');
        
        if (nameInput && userInfo.name) nameInput.value = userInfo.name;
        if (emailInput && userInfo.email) emailInput.value = userInfo.email;
    }
}

// Obtener información del usuario (simulada)
function getUserInfo() {
    // Intentar obtener información del usuario desde localStorage
    const userInfoStr = localStorage.getItem('user_info');
    if (userInfoStr) {
        try {
            return JSON.parse(userInfoStr);
        } catch (e) {
            console.error('Error al parsear la información del usuario:', e);
        }
    }
    return null;
}

// Configurar el formulario de pago
function setupPaymentForm() {
    const paymentForm = document.getElementById('payment-form');
    if (!paymentForm) {
        console.warn('No se encontró el formulario de pago');
        return;
    }
    
    // Configurar formateo automático de campos
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
    
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            formatExpiryDate(this);
        });
    }
    
    // Configurar el evento de envío del formulario
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validar el formulario
        if (!validateForm()) {
            return;
        }
        
        procesarPago(event);
    });
}

// Formatear número de tarjeta
function formatCardNumber(input) {
    // Eliminar todos los caracteres no numéricos
    let value = input.value.replace(/\D/g, '');
    
    // Limitar a 16 dígitos
    value = value.substring(0, 16);
    
    // Formatear con espacios cada 4 dígitos
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    // Actualizar el valor del input
    input.value = formattedValue;
}

// Formatear fecha de expiración
function formatExpiryDate(input) {
    // Eliminar todos los caracteres no numéricos
    let value = input.value.replace(/\D/g, '');
    
    // Limitar a 4 dígitos
    value = value.substring(0, 4);
    
    // Formatear con / después de los primeros 2 dígitos
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    
    // Actualizar el valor del input
    input.value = value;
}

// Validar formulario de pago
function validateForm() {
    const paymentForm = document.getElementById('payment-form');
    if (!paymentForm) return false;
    
    // Añadir clase para activar validaciones de Bootstrap
    paymentForm.classList.add('was-validated');
    
    // Validar campos específicos
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    let isValid = true;
    
    // Validar número de tarjeta (16 dígitos)
    if (cardNumber) {
        const digits = cardNumber.value.replace(/\s+/g, '');
        if (digits.length !== 16) {
            isValid = false;
            cardNumber.classList.add('is-invalid');
        } else {
            cardNumber.classList.remove('is-invalid');
        }
    }
    
    // Validar fecha de expiración (formato MM/YY y no vencida)
    if (expiryDate) {
        const [month, year] = expiryDate.value.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (!month || !year || month.length !== 2 || year.length !== 2 || parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            isValid = false;
            expiryDate.classList.add('is-invalid');
        } else {
            expiryDate.classList.remove('is-invalid');
        }
    }
    
    // Validar CVV (3 o 4 dígitos)
    if (cvv) {
        const cvvDigits = cvv.value;
        if (!cvvDigits || (cvvDigits.length !== 3 && cvvDigits.length !== 4)) {
            isValid = false;
            cvv.classList.add('is-invalid');
        } else {
            cvv.classList.remove('is-invalid');
        }
    }
    
    return isValid && paymentForm.checkValidity();
}

// Procesar el pago
async function procesarPago(event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('submit-payment');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
    }
    
    try {
        // Simulación de procesamiento de pago (esperar 2 segundos)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Datos para el email
        const nombre = document.getElementById('cardName')?.value || 'Cliente';
        const correo = document.getElementById('email')?.value || '';
        const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        
        console.log('Enviando email de confirmación a:', correo);
        
        // Enviar email de confirmación si EmailJS está disponible
        if (typeof emailjs !== 'undefined' && correo) {
            try {
                await emailjs.send('service_masterb', 'template_compra', {
                    to_name: nombre,
                    to_email: correo,
                    order_id: orderNumber,
                    total: formatPrice(total)
                });
                console.log('Email enviado correctamente');
            } catch (emailError) {
                console.error('Error al enviar email:', emailError);
                // Continuamos con el proceso aunque falle el email
            }
        }
        
        // Limpiar carrito
        localStorage.removeItem('masterbikes_cart');
        
        // Mostrar sección de confirmación
        const paymentSection = document.getElementById('payment-section');
        const confirmationSection = document.getElementById('confirmation-section');
        
        if (paymentSection) paymentSection.style.display = 'none';
        if (confirmationSection) {
            confirmationSection.style.display = 'block';
            const orderNumberElement = document.getElementById('order-number');
            if (orderNumberElement) orderNumberElement.textContent = orderNumber;
        }
        
        // Actualizar indicador de progreso
        document.querySelectorAll('.progress-step')[1].classList.remove('active');
        document.querySelectorAll('.progress-step')[2].classList.add('active');
        
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        alert('Ha ocurrido un error al procesar el pago. Por favor, inténtalo de nuevo.');
        
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Pagar Ahora';
        }
    }
}
