package masterbikes.inventario_service.dto;
import lombok.*;

//DTO para importar datos de microservicio Catalogo
@Data
public class ProductoDTO {
    private Long id;
    private String modelo;

}
