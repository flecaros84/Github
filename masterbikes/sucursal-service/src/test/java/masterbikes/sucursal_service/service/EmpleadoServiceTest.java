package masterbikes.sucursal_service.service;

import masterbikes.sucursal_service.model.Empleado;
import masterbikes.sucursal_service.model.Sucursal;
import masterbikes.sucursal_service.repository.EmpleadoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EmpleadoServiceTest {

    private EmpleadoRepository empleadoRepository;
    private EmpleadoService empleadoService;

    @BeforeEach
    void configurar() {
        empleadoRepository = mock(EmpleadoRepository.class);
        empleadoService = new EmpleadoService(empleadoRepository);
    }

    @Test
    void listarEmpleados_deberiaRetornarLista() {
        Empleado e1 = Empleado.builder().id(1L).nombre("Juan").rol("vendedor").usuarioId(101L).build();
        Empleado e2 = Empleado.builder().id(2L).nombre("Ana").rol("técnico").usuarioId(102L).build();

        when(empleadoRepository.findAll()).thenReturn(List.of(e1, e2));

        List<Empleado> resultado = empleadoService.findAll();

        assertEquals(2, resultado.size());
        verify(empleadoRepository).findAll();
    }

    @Test
    void guardarEmpleadoValido_deberiaRetornarEmpleadoGuardado() {
        Sucursal sucursal = Sucursal.builder().id(1L).nombre("Sucursal Centro").build();

        Empleado empleado = Empleado.builder()
                .nombre("Luis")
                .rol("supervisor")
                .sucursal(sucursal)
                .usuarioId(200L)
                .build();

        when(empleadoRepository.save(empleado)).thenReturn(empleado);

        Empleado resultado = empleadoService.save(empleado);

        assertNotNull(resultado);
        assertEquals("Luis", resultado.getNombre());
        verify(empleadoRepository).save(empleado);
    }

    @Test
    void buscarEmpleadoExistente_deberiaRetornarEmpleado() {
        Empleado empleado = Empleado.builder().id(1L).nombre("Carlos").rol("técnico").usuarioId(300L).build();

        when(empleadoRepository.findById(1L)).thenReturn(Optional.of(empleado));

        Empleado resultado = empleadoService.findById(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals("Carlos", resultado.getNombre());
    }

    @Test
    void buscarEmpleadoInexistente_deberiaRetornarNull() {
        when(empleadoRepository.findById(99L)).thenReturn(Optional.empty());

        Empleado resultado = empleadoService.findById(99L);

        assertNull(resultado);
    }

    @Test
    void eliminarEmpleadoExistente_deberiaEjecutarDelete() {
        doNothing().when(empleadoRepository).deleteById(1L);

        empleadoService.delete(1L);

        verify(empleadoRepository).deleteById(1L);
    }
}
