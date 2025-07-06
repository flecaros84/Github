// auth-navbar.js - Controla la visibilidad de botones según login y rol

document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('masterbikes_user'));
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userMenu = document.getElementById('userMenu');
    const userNameSpan = document.querySelector('.user-name');
    const adminMenuLink = document.getElementById('adminMenuLink');

    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = user.name || user.email;
        if (adminMenuLink) {
            if (user.role === 'admin') {
                adminMenuLink.style.display = 'block';
            } else {
                adminMenuLink.style.display = 'none';
            }
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (userMenu) userMenu.style.display = 'none';
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    // Redirigir perfil según rol
    const perfilLinks = document.querySelectorAll('.dropdown-item[href="#"]');
    perfilLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (user) {
                if (user.role === 'admin') {
                    window.location.href = '/frontend/pages/admin.html';
                } else {
                    window.location.href = '/frontend/pages/cliente.html';
                }
            }
        });
    });
});
