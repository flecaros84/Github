package masterbikes.catalogo_service.service;

import masterbikes.catalogo_service.model.Componente;
import masterbikes.catalogo_service.repository.ComponenteRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ComponenteService {

    public final ComponenteRepository componenteRepository;

    public ComponenteService(ComponenteRepository componenteRepository) {
        this.componenteRepository = componenteRepository;
    }

    //Listar
    public List<Componente> findAll() {
        return componenteRepository.findAll();
    }

    //Guardar
    public Componente save(Componente componente) {
        return componenteRepository.save(componente);
    }

    //Buscar
    public Componente findById(long id) {
        return componenteRepository.findById(id).orElse(null);
    }

    //Eliminar
    public void delete(long id) {
        componenteRepository.deleteById(id);
    }

}
