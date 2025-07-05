package masterbikes.venta_service.service;

import masterbikes.venta_service.dto.MovimientoInventarioDTO;
import masterbikes.venta_service.dto.ProductoBaseDTO;
import masterbikes.venta_service.dto.InventarioDTO;
import masterbikes.venta_service.model.DetalleVenta;
import masterbikes.venta_service.model.Factura;
import masterbikes.venta_service.model.Venta;
import masterbikes.venta_service.repository.VentaRepository;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepo;
    private final RestTemplate restTemplate;

    @Value("http://localhost:8082")
    private String catalogoServiceUrl;

    @Value("http://localhost:8084")
    private String inventarioServiceUrl;

    public VentaService(VentaRepository ventaRepo, RestTemplate restTemplate) {
        this.ventaRepo = ventaRepo;
        this.restTemplate = restTemplate;
    }

    public Venta generarVenta(Venta venta) {
        double total = 0;

        for (DetalleVenta detalle : venta.getDetalles()) {
            String tipoProducto = detalle.getTipoProducto();

            // 1. Consultar precio desde catálogo
            double precioUnitario = obtenerPrecioDesdeCatalogo(detalle.getProductoId(), tipoProducto);

            // Guardar precio en el detalle
            detalle.setPrecioUnitario(precioUnitario);

            // 2. Registrar salida de stock
            registrarMovimientoInventario(detalle.getProductoId(), venta.getSucursalId(), "SALIDA", detalle.getCantidad());

            // 3. Calcular total parcial
            total += precioUnitario * detalle.getCantidad();

            // 4. Asociar venta al detalle
            detalle.setVenta(venta);
        }

        // 5. Completar datos de la venta
        venta.setFecha(LocalDateTime.now());
        venta.setTotal(total);

        // 6. Generar factura
        Factura factura = Factura.builder()
                .venta(venta)
                .fechaEmision(LocalDateTime.now())
                .tipo("BOLETA")
                .folio("FOLIO-" + System.currentTimeMillis())
                .neto(total)
                .iva(total * 0.19)
                .totalConIva(total * 1.19)
                .build();

        venta.setFactura(factura);

        return ventaRepo.save(venta);
    }

    private double obtenerPrecioDesdeCatalogo(long productoId, String tipoProducto) {
        String endpoint = switch (tipoProducto.toUpperCase()) {
            case "ACCESORIO" -> "/api/v1/catalogo/accesorios/";
            case "BICICLETA" -> "/api/v1/catalogo/bicicletas/";
            case "COMPONENTE" -> "/api/v1/catalogo/componentes/";
            default -> throw new IllegalArgumentException("Tipo de producto no reconocido: " + tipoProducto);
        };

        String url = catalogoServiceUrl + endpoint + productoId;
        ProductoBaseDTO producto = restTemplate.getForObject(url, ProductoBaseDTO.class);

        if (producto == null) {
            throw new RuntimeException("Producto no encontrado en catálogo");
        }

        return producto.getPrecioUnitario();
    }

    private void registrarMovimientoInventario(long productoId,
                                               long sucursalId,
                                               String tipoMovimiento,
                                               int cantidad) {
        Long inventarioId = buscarInventarioId(productoId, sucursalId);
        MovimientoInventarioDTO dto = MovimientoInventarioDTO.builder()
                .inventarioId(inventarioId)
                .tipoMovimiento(tipoMovimiento)
                .cantidad(cantidad)
                .motivo("Venta automatica")
                .build();

        // <-- aquí el cambio: Void.class
        restTemplate.postForObject(
                inventarioServiceUrl + "/api/v1/movimientosinventario",
                dto,
                Void.class
        );
    }

    private Long buscarInventarioId(long productoId, long sucursalId) {
        String url = inventarioServiceUrl
                + "/api/v1/inventarios?productoId=" + productoId
                + "&sucursalId="  + sucursalId;
        InventarioDTO[] arr = restTemplate.getForObject(url, InventarioDTO[].class);
        if (arr == null || arr.length == 0) {
            throw new RuntimeException(
                    "No existe inventario para producto "
                            + productoId + " en sucursal " + sucursalId
            );
        }
        return arr[0].getId();
    }

    public List<Venta> findAll() {
        return ventaRepo.findAll();
    }

    public Venta findById(Long id) {
        return ventaRepo.findById(id).orElse(null);
    }
}

