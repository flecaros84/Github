package masterbikes.inventario_service.service;

import masterbikes.inventario_service.model.Inventario;
import masterbikes.inventario_service.repository.InventarioRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class InventarioServiceTest {

    private InventarioRepository inventarioRepository;
    private InventarioService inventarioService;

    @BeforeEach
    void setUp() {
        inventarioRepository = mock(InventarioRepository.class);
        inventarioService = new InventarioService(inventarioRepository);
    }

    @Test
    void listarTodo_deberiaRetornarListaDeInventario() {
        Inventario i1 = Inventario.builder()
                .id(1L)
                .productoId(10L)
                .tipoProducto("bicicleta")
                .sucursalId(1L)
                .cantidad(5)
                .build();

        Inventario i2 = Inventario.builder()
                .id(2L)
                .productoId(20L)
                .tipoProducto("accesorio")
                .sucursalId(1L)
                .cantidad(8)
                .build();

        when(inventarioRepository.findAll()).thenReturn(List.of(i1, i2));

        List<Inventario> resultado = inventarioService.findAll();

        assertEquals(2, resultado.size());
        verify(inventarioRepository).findAll();
    }

    @Test
    void guardarInventario_deberiaRetornarInventarioGuardado() {
        Inventario inventario = Inventario.builder()
                .productoId(100L)
                .tipoProducto("componente")
                .sucursalId(2L)
                .cantidad(12)
                .build();

        when(inventarioRepository.save(inventario)).thenReturn(inventario);

        Inventario resultado = inventarioService.save(inventario);

        assertNotNull(resultado);
        assertEquals(100L, resultado.getProductoId());
        assertEquals("componente", resultado.getTipoProducto());
        verify(inventarioRepository).save(inventario);
    }

    @Test
    void buscarPorId_existente_deberiaRetornarInventario() {
        Inventario inventario = Inventario.builder()
                .id(5L)
                .productoId(55L)
                .tipoProducto("accesorio")
                .sucursalId(3L)
                .cantidad(3)
                .build();

        when(inventarioRepository.findById(5L)).thenReturn(Optional.of(inventario));

        Inventario resultado = inventarioService.findById(5L);

        assertNotNull(resultado);
        assertEquals(55L, resultado.getProductoId());
        verify(inventarioRepository).findById(5L);
    }

    @Test
    void buscarPorId_inexistente_deberiaRetornarNull() {
        when(inventarioRepository.findById(999L)).thenReturn(Optional.empty());

        Inventario resultado = inventarioService.findById(999L);

        assertNull(resultado);
        verify(inventarioRepository).findById(999L);
    }

    @Test
    void eliminarPorId_deberiaLlamarARepositorio() {
        inventarioService.deleteById(3L);
        verify(inventarioRepository).deleteById(3L);
    }

    @Test
    void buscarPorProductoYTipo_deberiaRetornarLista() {
        Inventario inventario = Inventario.builder()
                .productoId(123L)
                .tipoProducto("bicicleta")
                .sucursalId(1L)
                .cantidad(2)
                .build();

        when(inventarioRepository.findByProductoIdAndTipoProducto(123L, "bicicleta"))
                .thenReturn(List.of(inventario));

        List<Inventario> resultado = inventarioService.findByProductoIdAndTipoProducto(123L, "bicicleta");

        assertEquals(1, resultado.size());
        assertEquals("bicicleta", resultado.get(0).getTipoProducto());
        verify(inventarioRepository).findByProductoIdAndTipoProducto(123L, "bicicleta");
    }
}
