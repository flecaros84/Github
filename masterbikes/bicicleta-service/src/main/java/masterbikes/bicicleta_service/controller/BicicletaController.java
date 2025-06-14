package masterbikes.bicicleta_service.controller;
import masterbikes.bicicleta_service.dto.BicicletaDTO;

import masterbikes.bicicleta_service.model.Bicicleta;
import masterbikes.bicicleta_service.service.BicicletaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/bicicletas")
public class BicicletaController {

    private final BicicletaService bicicletaService;


    public BicicletaController(BicicletaService bicicletaService) {
        this.bicicletaService = bicicletaService;
    }

    @GetMapping
    public List<Bicicleta> findAll() {
        return bicicletaService.findAll();
    }

    @PostMapping
    public Bicicleta add(@RequestBody BicicletaDTO dto) {
        return bicicletaService.crearDesdeDTO(dto);
    }

    //@PostMapping
    //public Bicicleta add(@RequestBody Bicicleta bicicleta) {
        //return bicicletaService.save(bicicleta);
    //}

    @GetMapping("/{id}")
    public Bicicleta findById(@PathVariable long id) {
        return bicicletaService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        bicicletaService.delete(id);
    }
}