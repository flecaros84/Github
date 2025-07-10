// Manejo de formularios
document.addEventListener('DOMContentLoaded', function() {
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    window.location.href = '/dashboard';
                } else {
                    alert('Credenciales inválidas');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al iniciar sesión');
            }
        });
    }

    // Formulario de registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('emailRegistro').value;
            const password = document.getElementById('passwordRegistro').value;

            try {
                const response = await fetch('/api/auth/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre, email, password })
                });

                if (response.ok) {
                    alert('Registro exitoso');
                    window.location.href = '/login';
                } else {
                    alert('Error en el registro');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al registrar');
            }
        });
    }
    // Manejo de modales de Bootstrap
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const registroModal = new bootstrap.Modal(document.getElementById('registroModal'));

    // Formulario de login en modal
    const loginFormModal = document.getElementById('loginForm');
    if (loginFormModal) {
        loginFormModal.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!validarEmail(email)) {
                alert('Por favor, ingrese un email válido');
                return;
            }

            if (!validarPassword(password)) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    loginModal.hide();
                    window.location.href = '/dashboard';
                } else {
                    alert('Credenciales inválidas');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al iniciar sesión');
            }
        });
    }

    // Formulario de registro en modal
    const registroFormModal = document.getElementById('registroForm');
    if (registroFormModal) {
        registroFormModal.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('regNombre').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const telefono = document.getElementById('regTelefono').value;

            if (!validarEmail(email)) {
                alert('Por favor, ingrese un email válido');
                return;
            }

            if (!validarPassword(password)) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            try {
                const response = await fetch('/api/auth/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        nombre, 
                        email, 
                        password,
                        telefono 
                    })
                });

                if (response.ok) {
                    alert('Registro exitoso');
                    registroModal.hide();
                    loginModal.show(); // Mostrar modal de login después del registro exitoso
                } else {
                    const data = await response.json();
                    alert(data.message || 'Error en el registro');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al registrar');
            }
        });
    }
});

// Funciones de utilidad
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
}

// Validaciones
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarPassword(password) {
    return password.length >= 8;
}