package masterbikes.sucursal_service.controller;

import masterbikes.sucursal_service.model.Empleado;
import masterbikes.sucursal_service.service.EmpleadoService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/empleados")
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @GetMapping
    public List<Empleado> findAll() {
        return empleadoService.findAll();
    }

    @PostMapping
    public Empleado save(@RequestBody Empleado empleado) {
        return empleadoService.save(empleado);
    }

    @GetMapping("/{id}")
    public Empleado findById(@PathVariable long id) {
        return empleadoService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        empleadoService.delete(id);
    }

}
