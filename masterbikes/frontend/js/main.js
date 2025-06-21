// Manejo de formularios y autenticación local
document.addEventListener('DOMContentLoaded', function() {
    // Funciones de utilidad
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validarPassword(password) {
        return password.length >= 8;
    }

    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function isLoggedIn() {
        return localStorage.getItem('currentUser') !== null;
    }

    function updateUIForLoggedUser() {
        const loginButtons = document.querySelectorAll('.login-buttons');
        const userMenu = document.getElementById('userMenu');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            loginButtons.forEach(btn => btn.style.display = 'none');
            if (userMenu) {
                userMenu.style.display = 'block';
                userMenu.querySelector('.user-name').textContent = currentUser.nombre;
            }
        } else {
            loginButtons.forEach(btn => btn.style.display = 'block');
            if (userMenu) {
                userMenu.style.display = 'none';
            }
        }
    }

    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!validarEmail(email)) {
                alert('Por favor, ingrese un email válido');
                return;
            }

            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                if (loginModal) loginModal.hide();
                updateUIForLoggedUser();
                window.location.reload();
            } else {
                alert('Credenciales inválidas');
            }
        });
    }

    // Formulario de registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('registroNombre').value;
            const email = document.getElementById('registroEmail').value;
            const password = document.getElementById('registroPassword').value;

            if (!validarEmail(email)) {
                alert('Por favor, ingrese un email válido');
                return;
            }

            if (!validarPassword(password)) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }

            const users = getUsers();
            if (users.some(u => u.email === email)) {
                alert('Este email ya está registrado');
                return;
            }

            users.push({ nombre, email, password });
            saveUsers(users);

            const registroModal = bootstrap.Modal.getInstance(document.getElementById('registroModal'));
            if (registroModal) registroModal.hide();
            
            alert('Registro exitoso. Por favor, inicie sesión.');
        });
    }

    // Cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateUIForLoggedUser();
            window.location.reload();
        });
    }

    // Inicializar estado de UI
    updateUIForLoggedUser();
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