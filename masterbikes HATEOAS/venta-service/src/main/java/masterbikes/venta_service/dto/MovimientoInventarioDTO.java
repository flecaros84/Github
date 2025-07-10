package masterbikes.venta_service.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoInventarioDTO {
    private Long inventarioId;
    private String tipoMovimiento;
    private int cantidad;
    private String motivo;
}