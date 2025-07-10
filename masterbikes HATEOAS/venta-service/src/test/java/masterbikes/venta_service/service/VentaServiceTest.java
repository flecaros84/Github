package masterbikes.venta_service.service;

import masterbikes.venta_service.dto.InventarioDTO;
import masterbikes.venta_service.dto.ProductoBaseDTO;
import masterbikes.venta_service.model.DetalleVenta;
import masterbikes.venta_service.model.Venta;
import masterbikes.venta_service.repository.VentaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Field;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class VentaServiceTest {

    private VentaRepository ventaRepo;
    private RestTemplate restTemplate;
    private VentaService ventaService;

    @BeforeEach
    void setUp() {
        ventaRepo = mock(VentaRepository.class);
        restTemplate = mock(RestTemplate.class);
        ventaService = new VentaService(ventaRepo, restTemplate);

        // Inyectar URLs privadas usando reflexión
        setPrivateField(ventaService, "catalogoServiceUrl", "http://localhost:8082");
        setPrivateField(ventaService, "inventarioServiceUrl", "http://localhost:8084");
    }

    @Test
    void generarVentaValida_deberiaCalcularTotalYGuardarVenta() {
        DetalleVenta detalle = DetalleVenta.builder()
                .productoId(100L)
                .tipoProducto("BICICLETA")
                .cantidad(2)
                .build();

        Venta venta = Venta.builder()
                .clienteId(1L)
                .sucursalId(1L)
                .vendedorId(10L)
                .medioPago("EFECTIVO")
                .detalles(List.of(detalle))
                .build();

        ProductoBaseDTO producto = new ProductoBaseDTO();
        producto.setPrecioUnitario(500.0);

        InventarioDTO inventarioDTO = new InventarioDTO();
        inventarioDTO.setId(200L);

        when(restTemplate.getForObject("http://localhost:8082/api/v1/catalogo/bicicletas/100", ProductoBaseDTO.class))
                .thenReturn(producto);

        when(restTemplate.getForObject("http://localhost:8084/api/v1/inventarios?productoId=100&sucursalId=1", InventarioDTO[].class))
                .thenReturn(new InventarioDTO[]{inventarioDTO});

        when(ventaRepo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Venta resultado = ventaService.generarVenta(venta);

        assertNotNull(resultado);
        assertEquals(1000.0, resultado.getTotal());
        assertNotNull(resultado.getFactura());
        assertEquals(1000.0, resultado.getFactura().getNeto());
        assertEquals(190.0, resultado.getFactura().getIva());
        assertEquals(1190.0, resultado.getFactura().getTotalConIva());

        verify(ventaRepo).save(any());
    }

    @Test
    void generarVenta_conProductoNoExistente_enCatalogo_deberiaLanzarExcepcion() {
        DetalleVenta detalle = DetalleVenta.builder()
                .productoId(999L)
                .tipoProducto("BICICLETA")
                .cantidad(1)
                .build();

        Venta venta = Venta.builder()
                .clienteId(1L)
                .sucursalId(1L)
                .vendedorId(1L)
                .medioPago("EFECTIVO")
                .detalles(List.of(detalle))
                .build();

        when(restTemplate.getForObject("http://localhost:8082/api/v1/catalogo/bicicletas/999", ProductoBaseDTO.class))
                .thenReturn(null);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            ventaService.generarVenta(venta);
        });

        assertEquals("Producto no encontrado en catálogo", ex.getMessage());
    }

    @Test
    void generarVenta_conInventarioInexistente_deberiaLanzarExcepcion() {
        DetalleVenta detalle = DetalleVenta.builder()
                .productoId(100L)
                .tipoProducto("BICICLETA")
                .cantidad(1)
                .build();

        Venta venta = Venta.builder()
                .clienteId(1L)
                .sucursalId(1L)
                .vendedorId(1L)
                .medioPago("EFECTIVO")
                .detalles(List.of(detalle))
                .build();

        ProductoBaseDTO producto = new ProductoBaseDTO();
        producto.setPrecioUnitario(700.0);

        when(restTemplate.getForObject("http://localhost:8082/api/v1/catalogo/bicicletas/100", ProductoBaseDTO.class))
                .thenReturn(producto);

        when(restTemplate.getForObject("http://localhost:8084/api/v1/inventarios?productoId=100&sucursalId=1", InventarioDTO[].class))
                .thenReturn(new InventarioDTO[]{}); // Sin inventario

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            ventaService.generarVenta(venta);
        });

        assertTrue(ex.getMessage().contains("No existe inventario para producto"));
    }

    // Método auxiliar para inyectar campos privados
    private void setPrivateField(Object target, String fieldName, Object value) {
        try {
            Field field = target.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target, value);
        } catch (Exception e) {
            throw new RuntimeException("Error setting field: " + fieldName, e);
        }
    }
}
