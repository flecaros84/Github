package masterbikes.catalogo_service.service;

import masterbikes.catalogo_service.model.Accesorio;
import masterbikes.catalogo_service.repository.AccesorioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccesorioService {

    public final AccesorioRepository accesorioRepository;

    public AccesorioService(AccesorioRepository accesorioRepository) {
        this.accesorioRepository = accesorioRepository;
    }

    //Listar
    public List<Accesorio> findAll() {
        return accesorioRepository.findAll();
    }

    //Guardar
    public Accesorio save(Accesorio accesorio) {
        return accesorioRepository.save(accesorio);
    }

    //Buscar
    public Accesorio findById(long id) {
        return accesorioRepository.findById(id).orElse(null);
    }

    //Eliminar
    public void delete(long id) {
        accesorioRepository.deleteById(id);
    }


}
