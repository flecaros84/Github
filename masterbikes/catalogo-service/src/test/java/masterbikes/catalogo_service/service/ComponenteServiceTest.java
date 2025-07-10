package masterbikes.catalogo_service.service;

import masterbikes.catalogo_service.model.Componente;
import masterbikes.catalogo_service.repository.ComponenteRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ComponenteServiceTest {

    private ComponenteRepository componenteRepository;
    private ComponenteService componenteService;

    @BeforeEach
    void configurarAntesDeCadaTest() {
        componenteRepository = mock(ComponenteRepository.class);
        componenteService = new ComponenteService(componenteRepository);
    }

    @Test
    void listarTodos_deberiaRetornarListaDeComponentes() {
        Componente c1 = Componente.builder()
                .id(1L)
                .tipo("Marco")
                .modelo("Trail-X")
                .marca("Shimano")
                .build();

        Componente c2 = Componente.builder()
                .id(2L)
                .tipo("Rueda")
                .modelo("Speedster")
                .marca("Continental")
                .build();

        when(componenteRepository.findAll()).thenReturn(List.of(c1, c2));

        List<Componente> resultado = componenteService.findAll();

        assertEquals(2, resultado.size());
        assertEquals("Marco", resultado.get(0).getTipo());
        verify(componenteRepository).findAll();
    }

    @Test
    void guardarComponenteValido_deberiaRetornarComponenteGuardado() {
        Componente c = Componente.builder()
                .tipo("Freno")
                .marca("Tektro")
                .modelo("HydroDisc")
                .tipoFreno("Disco")
                .tipoUso("Montaña")
                .precioUnitario(59.99)
                .build();

        when(componenteRepository.save(c)).thenReturn(c);

        Componente resultado = componenteService.save(c);

        assertNotNull(resultado);
        assertEquals("Freno", resultado.getTipo());
        assertEquals(59.99, resultado.getPrecioUnitario());
        verify(componenteRepository).save(c);
    }

    @Test
    void buscarPorId_existente_deberiaRetornarComponente() {
        Componente c = Componente.builder()
                .id(10L)
                .tipo("Marco")
                .modelo("Alu-X")
                .build();

        when(componenteRepository.findById(10L)).thenReturn(Optional.of(c));

        Componente resultado = componenteService.findById(10L);

        assertNotNull(resultado);
        assertEquals("Marco", resultado.getTipo());
        verify(componenteRepository).findById(10L);
    }

    @Test
    void buscarPorId_inexistente_deberiaRetornarNull() {
        when(componenteRepository.findById(99L)).thenReturn(Optional.empty());

        Componente resultado = componenteService.findById(99L);

        assertNull(resultado);
        verify(componenteRepository).findById(99L);
    }

    @Test
    void eliminarPorId_deberiaLlamarAlRepositorio() {
        componenteService.delete(5L);
        verify(componenteRepository).deleteById(5L);
    }
}

