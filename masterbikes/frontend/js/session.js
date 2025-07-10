// Session Management System for MasterBikes
class SessionManager {
    constructor() {
        this.user = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('masterbikes_user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    handleLogin(userData) {
        this.user = userData;
        localStorage.setItem('masterbikes_user', JSON.stringify(userData));
        this.updateUI();
    }

    logout() {
        this.user = null;
        localStorage.removeItem('masterbikes_user');
        this.updateUI();
        location.reload();
    }

    updateUI() {
        const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
        const registerBtn = document.querySelector('[data-bs-target="#registroModal"]');
        const userMenu = document.getElementById('userMenu');
        const userDropdown = document.getElementById('userDropdown');

        if (this.user) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            
            if (userMenu) {
                userMenu.style.display = 'block';
                const userName = userMenu.querySelector('.user-name');
                if (userName) userName.textContent = this.user.name;
            }
        } else {
            // User is not logged in
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (registerBtn) registerBtn.style.display = 'inline-block';
            
            if (userMenu) {
                userMenu.style.display = 'none';
            }
        }
    }

    isLoggedIn() {
        return this.user !== null;
    }

    getCurrentUser() {
        return this.user;
    }
}

// Initialize session manager
const sessionManager = new SessionManager();

// Add logout functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionManager.logout();
        });
    }
});
