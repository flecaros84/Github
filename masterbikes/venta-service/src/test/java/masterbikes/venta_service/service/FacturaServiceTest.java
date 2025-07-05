package masterbikes.venta_service.service;

import masterbikes.venta_service.model.Factura;
import masterbikes.venta_service.model.Venta;
import masterbikes.venta_service.repository.FacturaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FacturaServiceTest {

    private FacturaRepository facturaRepository;
    private FacturaService facturaService;

    @BeforeEach
    void setUp() {
        facturaRepository = mock(FacturaRepository.class);
        facturaService = new FacturaService(facturaRepository);
    }

    @Test
    void listarFacturas_deberiaRetornarLista() {
        Factura f1 = Factura.builder().id(1L).folio("FOLIO-001").tipo("BOLETA").build();
        Factura f2 = Factura.builder().id(2L).folio("FOLIO-002").tipo("FACTURA").build();

        when(facturaRepository.findAll()).thenReturn(List.of(f1, f2));

        List<Factura> resultado = facturaService.listar();

        assertEquals(2, resultado.size());
        verify(facturaRepository).findAll();
    }

    @Test
    void guardarFacturaValida_deberiaRetornarFacturaGuardada() {
        Venta venta = Venta.builder().id(100L).build();

        Factura factura = Factura.builder()
                .tipo("BOLETA")
                .folio("FOLIO-123")
                .fechaEmision(LocalDateTime.now())
                .venta(venta)
                .neto(1000.0)
                .iva(190.0)
                .totalConIva(1190.0)
                .build();

        when(facturaRepository.save(factura)).thenReturn(factura);

        Factura resultado = facturaService.guardar(factura);

        assertNotNull(resultado);
        assertEquals("FOLIO-123", resultado.getFolio());
        verify(facturaRepository).save(factura);
    }

    @Test
    void buscarFacturaExistente_deberiaRetornarFactura() {
        Factura factura = Factura.builder().id(1L).folio("FOLIO-001").build();

        when(facturaRepository.findById(1L)).thenReturn(Optional.of(factura));

        Factura resultado = facturaService.buscar(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
    }

    @Test
    void buscarFacturaInexistente_deberiaRetornarNull() {
        when(facturaRepository.findById(99L)).thenReturn(Optional.empty());

        Factura resultado = facturaService.buscar(99L);

        assertNull(resultado);
    }

    @Test
    void eliminarFacturaExistente_deberiaEjecutarDelete() {
        doNothing().when(facturaRepository).deleteById(1L);

        facturaService.eliminar(1L);

        verify(facturaRepository).deleteById(1L);
    }
}
