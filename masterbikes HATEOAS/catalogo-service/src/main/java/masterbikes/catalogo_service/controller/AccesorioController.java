package masterbikes.catalogo_service.controller;

import masterbikes.catalogo_service.model.Accesorio;
import masterbikes.catalogo_service.service.AccesorioService;
import masterbikes.catalogo_service.hateoas.AccesorioModel;
import masterbikes.catalogo_service.hateoas.AccesorioAssembler;

import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/catalogo/accesorios")
public class AccesorioController {

    private final AccesorioService accesorioService;
    private final AccesorioAssembler accesorioAssembler;

    public AccesorioController(AccesorioService accesorioService, AccesorioAssembler accesorioAssembler) {
        this.accesorioService = accesorioService;
        this.accesorioAssembler = accesorioAssembler;
    }

    @GetMapping
    public CollectionModel<AccesorioModel> findAll() {
        List<AccesorioModel> accesorios = accesorioService.findAll().stream()
                .map(accesorioAssembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(accesorios);
    }

    @PostMapping
    public AccesorioModel save(@RequestBody Accesorio accesorio) {
        Accesorio saved = accesorioService.save(accesorio);
        return accesorioAssembler.toModel(saved);
    }

    @GetMapping("/{id}")
    public AccesorioModel findById(@PathVariable long id) {
        Accesorio accesorio = accesorioService.findById(id);
        return accesorioAssembler.toModel(accesorio);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        accesorioService.delete(id);
    }
}
