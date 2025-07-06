// navbar-admin.js
// Inserta dinámicamente el enlace de administración de productos solo para admins

document.addEventListener('DOMContentLoaded', function() {
    // Espera a que sessionManager esté disponible
    if (typeof sessionManager === 'undefined') return;
    if (!sessionManager.isLoggedIn()) return;
    const roles = sessionManager.getRoles();
    if (!roles || !roles.includes('ADMIN')) return;

    // Busca la barra de navegación principal
    const navList = document.querySelector('.navbar-nav.me-auto');
    if (!navList) return;

    // Evita duplicados
    if (document.getElementById('admin-productos-link')) return;

    // Crea el nuevo enlace
    const li = document.createElement('li');
    li.className = 'nav-item';
    const a = document.createElement('a');
    a.className = 'nav-link';
    a.id = 'admin-productos-link';
    a.href = 'pages/admin-productos.html';
    a.innerHTML = '<i class="bi bi-tools"></i> Admin Productos';
    li.appendChild(a);

    // Inserta el enlace al final del menú principal
    navList.appendChild(li);
});
