package masterbikes.inventario_service.controller;

import masterbikes.inventario_service.service.ReporteInventarioService;
import masterbikes.inventario_service.dto.InventarioReporteDTO;


import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/v1/reportesucursal")
@RequiredArgsConstructor
public class ReporteInventarioController {
    private final ReporteInventarioService reporteService;


    @GetMapping("/{sucursalId}")
    public ResponseEntity<List<InventarioReporteDTO>> reportePorSucursal(
            @PathVariable Long sucursalId) {
        var lista = reporteService.obtenerPorSucursal(sucursalId);
        return ResponseEntity.ok(lista);
    }

    /** Nuevo: reporte de todo el inventario */
    @GetMapping
    public ResponseEntity<List<InventarioReporteDTO>> reporteCompleto() {
        return ResponseEntity.ok(reporteService.obtenerTodos());
    }

}