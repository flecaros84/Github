package masterbikes.catalogo_service.service;

import masterbikes.catalogo_service.model.Accesorio;
import masterbikes.catalogo_service.repository.AccesorioRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AccesorioServiceTest {

    private AccesorioRepository accesorioRepository;
    private AccesorioService accesorioService;

    @BeforeEach
    void configurarAntesDeCadaTest() {
        accesorioRepository = mock(AccesorioRepository.class);
        accesorioService = new AccesorioService(accesorioRepository);
    }

    @Test
    void listarTodos_deberiaRetornarListaDeAccesorios() {
        Accesorio a1 = Accesorio.builder()
                .id(1L)
                .modelo("Casco Bell Sanction")
                .categoria("Casco")
                .build();

        Accesorio a2 = Accesorio.builder()
                .id(2L)
                .modelo("Luz LED trasera")
                .categoria("Luz")
                .build();

        when(accesorioRepository.findAll()).thenReturn(List.of(a1, a2));

        List<Accesorio> resultado = accesorioService.findAll();

        assertEquals(2, resultado.size());
        assertEquals("Casco", resultado.get(0).getCategoria());
        verify(accesorioRepository).findAll();
    }

    @Test
    void guardarAccesorio_deberiaRetornarAccesorioGuardado() {
        Accesorio a = Accesorio.builder()
                .modelo("Bomba Mini Pro")
                .categoria("Bomba")
                .marca("Topeak")
                .descripcion("Bomba de aire portátil")
                .precioUnitario(29.99)
                .talla("Única")
                .tipoUso("Ruta")
                .build();

        when(accesorioRepository.save(a)).thenReturn(a);

        Accesorio resultado = accesorioService.save(a);

        assertNotNull(resultado);
        assertEquals("Topeak", resultado.getMarca());
        assertEquals(29.99, resultado.getPrecioUnitario());
        verify(accesorioRepository).save(a);
    }

    @Test
    void buscarPorId_existente_deberiaRetornarAccesorio() {
        Accesorio a = Accesorio.builder()
                .id(1L)
                .modelo("Casco Giro")
                .categoria("Casco")
                .build();

        when(accesorioRepository.findById(1L)).thenReturn(Optional.of(a));

        Accesorio resultado = accesorioService.findById(1L);

        assertNotNull(resultado);
        assertEquals("Casco", resultado.getCategoria());
        verify(accesorioRepository).findById(1L);
    }

    @Test
    void buscarPorId_inexistente_deberiaRetornarNull() {
        when(accesorioRepository.findById(99L)).thenReturn(Optional.empty());

        Accesorio resultado = accesorioService.findById(99L);

        assertNull(resultado);
        verify(accesorioRepository).findById(99L);
    }

    @Test
    void eliminarPorId_deberiaLlamarAlRepositorio() {
        accesorioService.delete(1L);
        verify(accesorioRepository).deleteById(1L);
    }
}
