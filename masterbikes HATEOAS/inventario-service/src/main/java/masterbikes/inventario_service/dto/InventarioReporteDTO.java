package masterbikes.inventario_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventarioReporteDTO {
    private Long inventarioId;
    private String tipoProducto;        // “BICICLETA” | “ACCESORIO” | “COMPONENTE”
    private Long productoId;
    private String modeloProducto;      // viene de Catalogo-Service
    private int cantidad;
    private Long sucursalId;
    private String nombreSucursal;      // viene de Sucursal-Service
    private LocalDateTime ultimaActualizacion;
}