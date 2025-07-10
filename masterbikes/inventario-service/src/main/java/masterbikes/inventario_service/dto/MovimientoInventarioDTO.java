package masterbikes.inventario_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class MovimientoInventarioDTO {
    private Long inventarioId;
    private String tipoMovimiento; // "ENTRADA", "SALIDA", "AJUSTE"
    private int cantidad;
    private String motivo;
}
