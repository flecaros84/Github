package masterbikes.sucursal_service.controller;

import masterbikes.sucursal_service.model.Sucursal;
import masterbikes.sucursal_service.service.SucursalService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/sucursales")
public class SucursalController {

    private final SucursalService sucursalService;

    public SucursalController(SucursalService sucursalService) {
        this.sucursalService = sucursalService;
    }

    @GetMapping
    public List<Sucursal> getAll() {
        return sucursalService.findAll();
    }

    @PostMapping
    public Sucursal create(@RequestBody Sucursal sucursal) {
        return sucursalService.save(sucursal);
    }

    @GetMapping("/{id}")
    public Sucursal findById(@PathVariable long id) {
        return sucursalService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        sucursalService.delete(id);
    }

}
