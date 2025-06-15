package masterbikes.sucursal_service.service;

import masterbikes.sucursal_service.model.Sucursal;
import masterbikes.sucursal_service.repository.SucursalRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SucursalService {

    public final SucursalRepository sucursalRepository;

    public SucursalService(SucursalRepository sucursalRepository) {
        this.sucursalRepository = sucursalRepository;
    }

    //Listar
    public List<Sucursal> findAll() {
        return sucursalRepository.findAll();
    }

    //Guardar
    public Sucursal save(Sucursal sucursal) {
        return sucursalRepository.save(sucursal);
    }

    //Buscar
    public Sucursal findById(long id) {
        return sucursalRepository.findById(id).orElse(null);
    }

    //Borrar
    public void delete(long id) {
        sucursalRepository.deleteById(id);
    }






}
