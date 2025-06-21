package masterbikes.catalogo_service.service;
import masterbikes.catalogo_service.dto.BicicletaDTO;
import masterbikes.catalogo_service.repository.ComponenteRepository;

import masterbikes.catalogo_service.model.Bicicleta;
import masterbikes.catalogo_service.repository.BicicletaRepository;
import masterbikes.catalogo_service.model.Componente;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BicicletaService {

    public final BicicletaRepository bicicletaRepository;
    private final ComponenteRepository componenteRepository;

    public BicicletaService(BicicletaRepository bicicletaRepository,ComponenteRepository componenteRepository) {
        this.bicicletaRepository = bicicletaRepository;
        this.componenteRepository = componenteRepository;
    }

    //Listar
    public List<Bicicleta> findAll() {
        return bicicletaRepository.findAll();
    }

    //Guardar
    public Bicicleta save(Bicicleta bicicleta) {

        //Validación de compatibilidad
        Componente marco = bicicleta.getMarco();
        Componente rueda = bicicleta.getRueda();
        Componente freno = bicicleta.getFreno();

        if (marco == null || rueda == null || freno == null) {
            throw new IllegalArgumentException("El marco, la rueda y el freno son obligatorios.");
        }

        if (!ValidadorCompatibilidad.validarMarcoRueda(marco, rueda)) {
            throw new IllegalArgumentException("La rueda no es compatible con el marco.");
        }

        if (!ValidadorCompatibilidad.validarMarcoFreno(marco, freno)) {
            throw new IllegalArgumentException("El freno no es compatible con el marco.");
        }

        return bicicletaRepository.save(bicicleta);
    }

    //Buscar
    public Bicicleta findById(long id) {
        return bicicletaRepository.findById(id).orElse(null);
    }

    //Eliminar
    public void delete(long id) {
        bicicletaRepository.deleteById(id);
    }

    //Creación de bicicleta desde DTO
    public Bicicleta crearDesdeDTO(BicicletaDTO dto) {
        Componente marco = componenteRepository.findById(dto.getIdMarco()).orElseThrow();
        Componente rueda = componenteRepository.findById(dto.getIdRueda()).orElseThrow();
        Componente freno = componenteRepository.findById(dto.getIdFreno()).orElseThrow();
        Componente manubrio = componenteRepository.findById(dto.getIdManubrio()).orElseThrow();
        Componente sillin = componenteRepository.findById(dto.getIdSillin()).orElseThrow();

        Bicicleta bicicleta = Bicicleta.builder()
                .idCliente(dto.getIdCliente())
                .tallaUsuario(dto.getTallaUsuario())
                .marco(marco)
                .rueda(rueda)
                .freno(freno)
                .manubrio(manubrio)
                .sillin(sillin)
                .esPredefinida(dto.isEsPredefinida())
                .modelo(dto.getModelo())
                .build();

        // Reutiliza la validación existente
        return this.save(bicicleta);
    }

}
