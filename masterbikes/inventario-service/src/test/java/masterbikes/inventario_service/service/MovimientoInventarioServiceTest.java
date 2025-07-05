package masterbikes.inventario_service.service;

import masterbikes.inventario_service.dto.MovimientoInventarioDTO;
import masterbikes.inventario_service.model.Inventario;
import masterbikes.inventario_service.model.MovimientoInventario;
import masterbikes.inventario_service.repository.InventarioRepository;
import masterbikes.inventario_service.repository.MovimientoInventarioRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MovimientoInventarioServiceTest {

    private MovimientoInventarioRepository movimientoRepo;
    private InventarioRepository inventarioRepo;
    private MovimientoInventarioService movimientoService;

    @BeforeEach
    void configurarAntesDeCadaTest() {
        movimientoRepo = mock(MovimientoInventarioRepository.class);
        inventarioRepo = mock(InventarioRepository.class);
        movimientoService = new MovimientoInventarioService(movimientoRepo, inventarioRepo);
    }

    @Test
    void registrarEntrada_deberiaIncrementarInventarioYGuardarMovimiento() {
        Inventario inventario = Inventario.builder()
                .id(1L)
                .cantidad(10)
                .build();

        MovimientoInventarioDTO dto = MovimientoInventarioDTO.builder()
                .inventarioId(1L)
                .tipoMovimiento("ENTRADA")
                .cantidad(5)
                .motivo("Reposición")
                .build();

        when(inventarioRepo.findById(1L)).thenReturn(Optional.of(inventario));
        when(inventarioRepo.save(any())).thenReturn(inventario);
        when(movimientoRepo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        MovimientoInventario resultado = movimientoService.registrarMovimiento(dto);

        assertNotNull(resultado);
        assertEquals("ENTRADA", resultado.getTipoMovimiento());
        assertEquals(15, inventario.getCantidad());
        verify(inventarioRepo).save(inventario);
        verify(movimientoRepo).save(any());
    }

    @Test
    void registrarSalida_conStockSuficiente_deberiaReducirInventarioYGuardarMovimiento() {
        Inventario inventario = Inventario.builder()
                .id(2L)
                .cantidad(10)
                .build();

        MovimientoInventarioDTO dto = MovimientoInventarioDTO.builder()
                .inventarioId(2L)
                .tipoMovimiento("SALIDA")
                .cantidad(4)
                .motivo("Venta")
                .build();

        when(inventarioRepo.findById(2L)).thenReturn(Optional.of(inventario));
        when(inventarioRepo.save(any())).thenReturn(inventario);
        when(movimientoRepo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        MovimientoInventario resultado = movimientoService.registrarMovimiento(dto);

        assertNotNull(resultado);
        assertEquals("SALIDA", resultado.getTipoMovimiento());
        assertEquals(6, inventario.getCantidad());
    }

    @Test
    void registrarSalida_conStockInsuficiente_deberiaLanzarExcepcion() {
        Inventario inventario = Inventario.builder()
                .id(3L)
                .cantidad(2)
                .build();

        MovimientoInventarioDTO dto = MovimientoInventarioDTO.builder()
                .inventarioId(3L)
                .tipoMovimiento("SALIDA")
                .cantidad(5)
                .motivo("Error")
                .build();

        when(inventarioRepo.findById(3L)).thenReturn(Optional.of(inventario));

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            movimientoService.registrarMovimiento(dto);
        });

        assertEquals("Stock insuficiente", ex.getMessage());
    }

    @Test
    void registrarAjuste_deberiaActualizarCantidadDeInventario() {
        Inventario inventario = Inventario.builder()
                .id(4L)
                .cantidad(10)
                .build();

        MovimientoInventarioDTO dto = MovimientoInventarioDTO.builder()
                .inventarioId(4L)
                .tipoMovimiento("AJUSTE")
                .cantidad(-3)
                .motivo("Corrección")
                .build();

        when(inventarioRepo.findById(4L)).thenReturn(Optional.of(inventario));
        when(inventarioRepo.save(any())).thenReturn(inventario);
        when(movimientoRepo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        MovimientoInventario resultado = movimientoService.registrarMovimiento(dto);

        assertEquals("AJUSTE", resultado.getTipoMovimiento());
        assertEquals(7, inventario.getCantidad());
    }

    @Test
    void registrarMovimiento_conTipoInvalido_deberiaLanzarExcepcion() {
        Inventario inventario = Inventario.builder()
                .id(5L)
                .cantidad(10)
                .build();

        MovimientoInventarioDTO dto = MovimientoInventarioDTO.builder()
                .inventarioId(5L)
                .tipoMovimiento("TRASPASO")
                .cantidad(5)
                .build();

        when(inventarioRepo.findById(5L)).thenReturn(Optional.of(inventario));

        assertThrows(IllegalArgumentException.class, () -> {
            movimientoService.registrarMovimiento(dto);
        });
    }
}
