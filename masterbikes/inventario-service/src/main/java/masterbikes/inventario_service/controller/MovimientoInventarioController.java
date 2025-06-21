package masterbikes.inventario_service.controller;

import masterbikes.inventario_service.dto.MovimientoInventarioDTO;
import masterbikes.inventario_service.model.MovimientoInventario;
import masterbikes.inventario_service.service.MovimientoInventarioService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/movimientosinventario")
@RequiredArgsConstructor
public class MovimientoInventarioController {

    private final MovimientoInventarioService movimientoInventarioService;

    @GetMapping
    public List<MovimientoInventario> getAllMovimientoInventario() {
        return movimientoInventarioService.findAll();
    }

    @PostMapping
    public ResponseEntity<MovimientoInventario> registrarMovimiento(@RequestBody MovimientoInventarioDTO dto) {
        MovimientoInventario movimiento = movimientoInventarioService.registrarMovimiento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(movimiento);
    }

    @GetMapping("/{id}")
    public MovimientoInventario findMovimientoInventarioById(@PathVariable Long id) {
        return movimientoInventarioService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        movimientoInventarioService.deleteById(id);
    }

}

