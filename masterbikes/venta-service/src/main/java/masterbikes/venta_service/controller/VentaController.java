package masterbikes.venta_service.controller;

import lombok.RequiredArgsConstructor;
import masterbikes.venta_service.model.Venta;
import masterbikes.venta_service.service.VentaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ventas")
@RequiredArgsConstructor
public class VentaController {

    private final VentaService ventaService;

    @GetMapping
    public List<Venta> getAllVentas() {
        return ventaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venta> getVentaById(@PathVariable Long id) {
        Venta venta = ventaService.findById(id);
        if (venta != null) {
            return ResponseEntity.ok(venta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> crearVenta(@RequestBody Venta venta) {
        try {
            Venta nuevaVenta = ventaService.generarVenta(venta);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error generando venta: " + e.getMessage());
        }
    }
}
