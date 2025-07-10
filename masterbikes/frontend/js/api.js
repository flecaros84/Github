// frontend/js/api.js

// Cambia esta URL base según la configuración real de tu API Gateway
const API_BASE_URL = "http://localhost:8080"; // Puerto 8080 según application.yml

const API = {
    // Obtener productos del catálogo (pública)
    async getProductos() {
        const response = await fetch(`${API_BASE_URL}/catalogo/productos`);
        if (!response.ok) throw new Error("Error al obtener productos");
        return response.json();
    },

    // Obtener stock de una bicicleta por ID (pública)
    async getStockBicicleta(idBicicleta) {
        const response = await fetch(`${API_BASE_URL}/inventario/stock/${idBicicleta}`);
        if (!response.ok) throw new Error("Error al obtener stock");
        return response.json();
    },

    // Obtener sucursales (pública)
    async getSucursales() {
        const response = await fetch(`${API_BASE_URL}/sucursal/sucursales`);
        if (!response.ok) throw new Error("Error al obtener sucursales");
        return response.json();
    },

    // Login de usuario (devuelve token y roles)
    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            let errorMsg = "Credenciales inválidas";
            try {
                const error = await response.json();
                if (error && error.message) errorMsg = error.message;
            } catch (e) {}
            throw new Error(errorMsg);
        }
        return response.json(); // Se espera { token, user, roles }
    },

    // Registro de usuario
    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/api/usuarios/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            let errorMsg = "Error al registrar usuario";
            try {
                const error = await response.json();
                if (error && error.message) errorMsg = error.message;
            } catch (e) {}
            throw new Error(errorMsg);
        }
        return response.json();
    },

    // Método genérico para peticiones autenticadas
    async fetchWithAuth(url, options = {}) {
        const token = sessionManager.getToken && sessionManager.getToken();
        const headers = options.headers || {};
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const response = await fetch(url, { ...options, headers });
        return response;
    },

    // Ejemplo de endpoint protegido:
    // async getPerfilUsuario() {
    //     const response = await this.fetchWithAuth(`${API_BASE_URL}/auth/me`);
    //     if (!response.ok) throw new Error("No autorizado");
    //     return response.json();
    // },
};

// Hacer disponible el objeto API globalmente
window.API = API;
