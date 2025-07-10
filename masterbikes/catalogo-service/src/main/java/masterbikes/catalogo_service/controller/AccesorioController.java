package masterbikes.catalogo_service.controller;

import masterbikes.catalogo_service.model.Accesorio;
import masterbikes.catalogo_service.service.AccesorioService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/catalogo/accesorios")
public class AccesorioController {

    private final AccesorioService accesorioService;

    public AccesorioController(AccesorioService accesorioService) {
        this.accesorioService = accesorioService;
    }

    @GetMapping
    public List<Accesorio> findAll() {
        return accesorioService.findAll();
    }

    @PostMapping
    public Accesorio save(@RequestBody Accesorio accesorio) {
        return accesorioService.save(accesorio);
    }

    @GetMapping("/{id}")
    public Accesorio findById(@PathVariable long id) {
        return accesorioService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        accesorioService.delete(id);
    }

}
