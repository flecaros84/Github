// auth.js - Lógica de autenticación y roles para MasterBikes MVP

// Simulación de login (esto debe ser reemplazado por llamada real al backend)
function login(email, password) {
    // Simulación: admin@masterbikes.cl es ADMIN, el resto es CLIENTE
    if (email === 'admin@masterbikes.cl' && password === 'admin123') {
        const user = { name: 'Administrador', email, role: 'ADMIN' };
        localStorage.setItem('masterbikes_user', JSON.stringify(user));
        window.location.href = '/frontend/pages/admin.html';
    } else if (email && password) {
        const user = { name: 'Cliente', email, role: 'CLIENTE' };
        localStorage.setItem('masterbikes_user', JSON.stringify(user));
        window.location.href = '/frontend/pages/cliente.html';
    } else {
        alert('Credenciales inválidas');
    }
}

// Proteger páginas según rol
function protectPage(requiredRole) {
    const user = JSON.parse(localStorage.getItem('masterbikes_user'));
    if (!user) {
        window.location.href = '/frontend/index.html';
        return;
    }
    if (requiredRole && user.role !== requiredRole) {
        // Redirigir a su perfil
        if (user.role === 'admin') {
            window.location.href = '/frontend/pages/admin.html';
        } else {
            window.location.href = '/frontend/pages/cliente.html';
        }
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('masterbikes_user');
    window.location.href = '/frontend/index.html';
}

// Exponer funciones globalmente
window.login = login;
window.protectPage = protectPage;
window.logout = logout;
