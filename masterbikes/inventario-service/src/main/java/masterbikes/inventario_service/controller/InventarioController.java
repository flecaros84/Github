package masterbikes.inventario_service.controller;

import masterbikes.inventario_service.model.Inventario;
import masterbikes.inventario_service.repository.InventarioRepository;
import masterbikes.inventario_service.service.InventarioService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/inventarios")
public class InventarioController {

    public final InventarioService inventarioService;
    private final InventarioRepository inventarioRepository;

    public InventarioController(InventarioService inventarioService, InventarioRepository inventarioRepository) {
        this.inventarioService = inventarioService;
        this.inventarioRepository = inventarioRepository;
    }

    @GetMapping
    public List<Inventario> findAll() {
        return inventarioService.findAll();
    }

    @PostMapping
    public Inventario save(@RequestBody Inventario inventario) {
        return inventarioService.save(inventario);
    }

    @GetMapping("/{id}")
    public Inventario findById(@PathVariable long id) {
        return inventarioService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        inventarioService.deleteById(id);
    }

    @GetMapping(params = { "productoId", "sucursalId" })
    public List<Inventario> findByProductoYSucursal(
            @RequestParam Long productoId,
            @RequestParam Long sucursalId
    ) {
        return inventarioRepository.findByProductoIdAndSucursalId(productoId, sucursalId);
    }












}
