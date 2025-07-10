package masterbikes.sucursal_service.service;

import masterbikes.sucursal_service.model.Empleado;
import masterbikes.sucursal_service.repository.EmpleadoRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmpleadoService {

    public final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    //Listar
    public List<Empleado> findAll() {
        return empleadoRepository.findAll();
    }

    //Guardar
    public Empleado save(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    //Buscar
    public Empleado findById(long id) {
        return empleadoRepository.findById(id).orElse(null);
    }

    //Borrar
    public void delete(long id) {
        empleadoRepository.deleteById(id);
    }

}
