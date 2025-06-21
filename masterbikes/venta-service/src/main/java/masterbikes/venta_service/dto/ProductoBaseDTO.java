package masterbikes.venta_service.dto;

import lombok.Data;

@Data
public class ProductoBaseDTO {
    private long id;
    private String modelo;
    private String marca;
    private double precioUnitario;
}
