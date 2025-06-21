package masterbikes.inventario_service.service;

import masterbikes.inventario_service.model.Inventario;
import masterbikes.inventario_service.repository.InventarioRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InventarioService {

    public final InventarioRepository inventarioRepository;

    public InventarioService(InventarioRepository inventarioRepository) {
        this.inventarioRepository = inventarioRepository;
    }

    //Listar
    public List<Inventario> findAll() {
        return inventarioRepository.findAll();
    }

    //Guardar
    public Inventario save(Inventario inventario) {
        return inventarioRepository.save(inventario);
    }

    //Buscar
    public Inventario findById(long id) {
        return inventarioRepository.findById(id).orElse(null);
    }

    //Eliminar
    public void deleteById(long id) {
        inventarioRepository.deleteById(id);
    }

}
