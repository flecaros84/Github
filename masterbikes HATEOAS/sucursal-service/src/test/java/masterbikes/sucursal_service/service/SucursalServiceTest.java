package masterbikes.sucursal_service.service;

import masterbikes.sucursal_service.model.Sucursal;
import masterbikes.sucursal_service.repository.SucursalRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class SucursalServiceTest {

    private SucursalRepository sucursalRepository;
    private SucursalService sucursalService;

    @BeforeEach
    void configurar() {
        sucursalRepository = mock(SucursalRepository.class);
        sucursalService = new SucursalService(sucursalRepository);
    }

    @Test
    void listarSucursales_deberiaRetornarLista() {
        Sucursal s1 = Sucursal.builder().id(1L).nombre("Sucursal A").build();
        Sucursal s2 = Sucursal.builder().id(2L).nombre("Sucursal B").build();

        when(sucursalRepository.findAll()).thenReturn(List.of(s1, s2));

        List<Sucursal> resultado = sucursalService.findAll();

        assertEquals(2, resultado.size());
        verify(sucursalRepository).findAll();
    }

    @Test
    void guardarSucursalValida_deberiaRetornarSucursalGuardada() {
        Sucursal sucursal = Sucursal.builder()
                .nombre("Sucursal Centro")
                .direccion("Av. Principal 123")
                .comuna("Santiago")
                .telefono("999999999")
                .email("contacto@masterbikes.cl")
                .horarioApertura(LocalTime.of(9, 0))
                .horarioCierre(LocalTime.of(18, 0))
                .esLocalVenta(true)
                .esTaller(true)
                .build();

        when(sucursalRepository.save(sucursal)).thenReturn(sucursal);

        Sucursal resultado = sucursalService.save(sucursal);

        assertNotNull(resultado);
        assertEquals("Sucursal Centro", resultado.getNombre());
        verify(sucursalRepository).save(sucursal);
    }

    @Test
    void buscarSucursalExistente_deberiaRetornarSucursal() {
        Sucursal sucursal = Sucursal.builder().id(1L).nombre("Sucursal Norte").build();

        when(sucursalRepository.findById(1L)).thenReturn(Optional.of(sucursal));

        Sucursal resultado = sucursalService.findById(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals("Sucursal Norte", resultado.getNombre());
    }

    @Test
    void buscarSucursalInexistente_deberiaRetornarNull() {
        when(sucursalRepository.findById(99L)).thenReturn(Optional.empty());

        Sucursal resultado = sucursalService.findById(99L);

        assertNull(resultado);
    }

    @Test
    void eliminarSucursalExistente_deberiaEjecutarDelete() {
        doNothing().when(sucursalRepository).deleteById(1L);

        sucursalService.delete(1L);

        verify(sucursalRepository).deleteById(1L);
    }
}
