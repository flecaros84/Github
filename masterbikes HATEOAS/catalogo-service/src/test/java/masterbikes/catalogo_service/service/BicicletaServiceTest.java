package masterbikes.catalogo_service.service;

import masterbikes.catalogo_service.model.Bicicleta;
import masterbikes.catalogo_service.model.Componente;
import masterbikes.catalogo_service.repository.BicicletaRepository;
import masterbikes.catalogo_service.repository.ComponenteRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BicicletaServiceTest {

    private BicicletaRepository bicicletaRepository;
    private ComponenteRepository componenteRepository;
    private BicicletaService bicicletaService;

    @BeforeEach
    void configurarAntesDeCadaTest() {
        bicicletaRepository = mock(BicicletaRepository.class);
        componenteRepository = mock(ComponenteRepository.class);
        bicicletaService = new BicicletaService(bicicletaRepository, componenteRepository);
    }

    @Test
    void listarTodas_deberiaRetornarListaDeBicicletas() {
        Bicicleta bici1 = Bicicleta.builder().id(1L).modelo("Modelo A").build();
        Bicicleta bici2 = Bicicleta.builder().id(2L).modelo("Modelo B").build();

        when(bicicletaRepository.findAll()).thenReturn(List.of(bici1, bici2));

        List<Bicicleta> resultado = bicicletaService.findAll();

        assertEquals(2, resultado.size());
        verify(bicicletaRepository).findAll();
    }

    @Test
    void guardarBicicletaValida_deberiaPasarValidacionesYGuardar() {
        // Crear componentes compatibles
        Componente marco = new Componente();
        marco.setTipo("MARCO");
        marco.setDiametroRueda(29);
        marco.setTipoUso("MONTAÑA");
        marco.setTipoFreno("DISCO");

        Componente rueda = new Componente();
        rueda.setTipo("RUEDA");
        rueda.setDiametroRueda(29);
        rueda.setTipoUso("MONTAÑA");

        Componente freno = new Componente();
        freno.setTipo("FRENO");
        freno.setTipoFreno("Disco"); // Insensible a mayúsculas

        Bicicleta bici = Bicicleta.builder()
                .modelo("X-Trail 900")
                .marca("MasterBikes")
                .descripcion("Bici de montaña avanzada")
                .valoracion(4.7)
                .precioUnitario(1299.99)
                .tallaUsuario("M")
                .esPredefinida(false)
                .idCliente("123ABC")
                .marco(marco)
                .rueda(rueda)
                .freno(freno)
                .build();

        when(bicicletaRepository.save(bici)).thenReturn(bici);

        Bicicleta resultado = bicicletaService.save(bici);

        assertNotNull(resultado);
        assertEquals("X-Trail 900", resultado.getModelo());
        verify(bicicletaRepository).save(bici);
    }

    @Test
    void guardarBicicletaConRuedaIncompatible_deberiaLanzarExcepcion() {
        Componente marco = new Componente();
        marco.setDiametroRueda(29);
        marco.setTipoUso("MONTAÑA");

        Componente rueda = new Componente();
        rueda.setDiametroRueda(26); // Incompatible
        rueda.setTipoUso("CIUDAD");

        Componente freno = new Componente();
        freno.setTipoFreno("Disco");

        Bicicleta bici = Bicicleta.builder()
                .marco(marco)
                .rueda(rueda)
                .freno(freno)
                .build();

        Exception ex = assertThrows(IllegalArgumentException.class, () -> bicicletaService.save(bici));
        assertEquals("La rueda no es compatible con el marco.", ex.getMessage());
    }

    @Test
    void guardarBicicletaConFrenoIncompatible_deberiaLanzarExcepcion() {
        Componente marco = new Componente();
        marco.setTipoFreno("V-BRAKE");
        marco.setDiametroRueda(29);
        marco.setTipoUso("MONTAÑA");

        Componente rueda = new Componente();
        rueda.setDiametroRueda(29);
        rueda.setTipoUso("MONTAÑA");

        Componente freno = new Componente();
        freno.setTipoFreno("DISCO"); // Incompatible

        Bicicleta bici = Bicicleta.builder()
                .marco(marco)
                .rueda(rueda)
                .freno(freno)
                .build();

        Exception ex = assertThrows(IllegalArgumentException.class, () -> bicicletaService.save(bici));
        assertEquals("El freno no es compatible con el marco.", ex.getMessage());
    }
}
