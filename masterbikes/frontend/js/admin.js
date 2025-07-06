// admin.js - Lógica para Panel de Administración MasterBikes

// Verifica si el usuario es admin, si no, redirige a catálogo
function checkAdminAccess() {
    const user = sessionManager.getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
        alert('Acceso solo para administradores.');
        window.location.href = '../pages/catalogo.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Este archivo solo mantiene la protección de acceso y lógica común si es necesario.
    checkAdminAccess();
    // La lógica de productos está en admin-productos.js
    // La lógica de usuarios está en admin-usuarios.js
});


