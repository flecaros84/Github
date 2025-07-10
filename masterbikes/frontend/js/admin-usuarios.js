// admin-usuarios.js
// Lógica para gestión de usuarios en el panel de administración

// Aquí irá la lógica de renderizado, alta, edición, eliminación y asignación de roles de usuarios
// Se recomienda estructurar funciones como: cargarUsuarios, agregarUsuario, editarUsuario, eliminarUsuario, etc.

// Ejemplo de estructura base:
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAccess();
    cargarUsuarios();

    // Alta usuario desde modal
    document.getElementById('formUsuario').addEventListener('submit', async function(e) {
        e.preventDefault();
        const nombre = document.getElementById('usuarioNombre').value;
        const email = document.getElementById('usuarioEmail').value;
        const password = document.getElementById('usuarioPassword').value;
        const rol = document.getElementById('usuarioRol').value;
        const token = sessionStorage.getItem('jwt');
        try {
            const resp = await fetch('http://localhost:8080/api/auth/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ nombre, email, password, rol })
            });
            if (!resp.ok) throw new Error('Error al crear usuario');
            bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide();
            this.reset();
            cargarUsuarios();
        } catch (err) {
            alert('Error al crear usuario');
        }
    });
});

async function cargarUsuarios() {
    const tabla = document.getElementById('tabla-usuarios').querySelector('tbody');
    tabla.innerHTML = `<tr><td colspan="5" class="text-center"><em>Cargando usuarios...</em></td></tr>`;
    try {
        // Llama al API Gateway para obtener usuarios
        const token = sessionStorage.getItem('jwt');
        const resp = await fetch('http://localhost:8080/api/auth/api/usuarios', {
            headers: { 'Authorization': token ? `Bearer ${token}` : '' }
        });
        if (!resp.ok) throw new Error('Error al obtener usuarios');
        const data = await resp.json();
        if (!Array.isArray(data) || data.length === 0) {
            tabla.innerHTML = `<tr><td colspan="5" class="text-center">No hay usuarios registrados.</td></tr>`;
            return;
        }
        tabla.innerHTML = data.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.rol}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="asignarAdmin(${user.id})">Asignar Admin</button>
                    <button class="btn btn-secondary btn-sm" onclick="desactivarUsuario(${user.id})">Desactivar</button>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        tabla.innerHTML = `<tr><td colspan="5" class="text-danger text-center">Error al cargar usuarios</td></tr>`;
    }
}

async function asignarAdmin(id) {
    const token = sessionStorage.getItem('jwt');
    if (!confirm('¿Seguro que deseas asignar rol ADMIN a este usuario?')) return;
    try {
        const resp = await fetch(`http://localhost:8080/api/auth/api/usuarios/${id}/rol`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify({ rol: 'ADMIN' })
        });
        if (!resp.ok) throw new Error('Error al cambiar rol');
        cargarUsuarios();
    } catch (err) {
        alert('Error al cambiar rol');
    }
}

async function desactivarUsuario(id) {
    const token = sessionStorage.getItem('jwt');
    if (!confirm('¿Seguro que deseas desactivar este usuario?')) return;
    try {
        const resp = await fetch(`http://localhost:8080/api/auth/api/usuarios/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token ? `Bearer ${token}` : '' }
        });
        if (!resp.ok) throw new Error('Error al desactivar usuario');
        cargarUsuarios();
    } catch (err) {
        alert('Error al desactivar usuario');
    }
}
