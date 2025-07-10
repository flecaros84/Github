// admin-productos.js - Lógica de gestión de inventario/productos para panel admin
// (Extraído de admin.js)

// --- Productos ---
async function cargarProductos() {
    const tabla = document.getElementById('tabla-inventario').querySelector('tbody');
    tabla.innerHTML = `<tr><td colspan="7" class="text-center"><em>Cargando inventario...</em></td></tr>`;
    try {
        const resp = await fetch('http://localhost:8080/api/inventario/api/v1/reportesucursal');
        if (!resp.ok) throw new Error('Error al obtener inventario');
        const data = await resp.json();
        if (!Array.isArray(data) || data.length === 0) {
            tabla.innerHTML = `<tr><td colspan="7" class="text-center">No hay productos en inventario.</td></tr>`;
            return;
        }
        tabla.innerHTML = data.map(item => `
            <tr>
                <td>${item.inventarioId}</td>
                <td>${item.modeloProducto}</td>
                <td>${item.tipoProducto}</td>
                <td>$${item.precioUnitario ? item.precioUnitario.toLocaleString('es-CL') : '-'}</td>
                <td>${item.nombreSucursal}</td>
                <td>${item.cantidad}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2 btn-editar-producto" 
                        data-id="${item.inventarioId}"
                        data-nombre="${item.modeloProducto}"
                        data-categoria="${item.tipoProducto}"
                        data-precio="${item.precioUnitario || ''}"
                        data-sucursal="${item.nombreSucursal}"
                        data-stock="${item.cantidad}"
                        data-imagen="${item.imagenUrl || ''}">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm" data-id="${item.inventarioId}" onclick="eliminarProducto(${item.inventarioId})">Eliminar</button>
                </td>
            </tr>
        `).join('');
        document.querySelectorAll('.btn-editar-producto').forEach(btn => {
            btn.addEventListener('click', function() {
                document.getElementById('productoId').value = this.dataset.id;
                document.getElementById('productoNombre').value = this.dataset.nombre;
                document.getElementById('productoCategoria').value = this.dataset.categoria;
                document.getElementById('productoPrecio').value = this.dataset.precio;
                document.getElementById('productoSucursal').value = this.dataset.sucursal;
                document.getElementById('productoStock').value = this.dataset.stock;
                document.getElementById('productoImagen').value = this.dataset.imagen;
                const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
                modal.show();
            });
        });
    } catch (err) {
        tabla.innerHTML = `<tr><td colspan="7" class="text-danger text-center">Error al cargar inventario</td></tr>`;
    }
}

async function eliminarProducto(id) {
    if (!confirm('¿Seguro que deseas eliminar este producto del inventario?')) return;
    try {
        const resp = await fetch(`http://localhost:8080/api/inventario/api/v1/inventarios/${id}`, { method: 'DELETE' });
        if (!resp.ok) throw new Error('Error al eliminar producto');
        cargarProductos();
    } catch (err) {
        alert('Error al eliminar producto');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    document.getElementById('formProducto').addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('productoId').value;
        const nombre = document.getElementById('productoNombre').value;
        const categoria = document.getElementById('productoCategoria').value;
        const precio = document.getElementById('productoPrecio').value;
        const sucursal = document.getElementById('productoSucursal').value;
        const stock = document.getElementById('productoStock').value;
        const imagen = document.getElementById('productoImagen').value;
        try {
            let resp;
            if (id) {
                resp = await fetch(`http://localhost:8080/api/inventario/api/v1/inventarios/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, categoria, precio, sucursal, cantidad: stock, imagen })
                });
            } else {
                resp = await fetch('http://localhost:8080/api/inventario/api/v1/inventarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, categoria, precio, sucursal, cantidad: stock, imagen })
                });
            }
            if (!resp.ok) throw new Error('Error al guardar producto');
            bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide();
            this.reset();
            document.getElementById('productoId').value = '';
            cargarProductos();
        } catch (err) {
            alert('Error al guardar producto');
        }
    });
    document.getElementById('btn-agregar-producto').addEventListener('click', function() {
        document.getElementById('productoId').value = '';
        document.getElementById('formProducto').reset();
    });
});

// No se usa más, edición es por botón dinámico
function editarProducto(id) { return; }
