package masterbikes.bicicleta_service.controller;

import masterbikes.bicicleta_service.model.Componente;
import masterbikes.bicicleta_service.service.ComponenteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/componentes")
public class ComponenteController {

    private final ComponenteService componenteService;

    public ComponenteController(ComponenteService componenteService) {
        this.componenteService = componenteService;
    }

    @GetMapping
    public List<Componente> findAll() {
        return componenteService.findAll();
    }

    @PostMapping
    public Componente save(@RequestBody Componente componente) {
        return componenteService.save(componente);
    }

    @GetMapping("/{id}")
    public Componente findById(@PathVariable Long id) {
        return componenteService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        componenteService.delete(id);
    }
}
