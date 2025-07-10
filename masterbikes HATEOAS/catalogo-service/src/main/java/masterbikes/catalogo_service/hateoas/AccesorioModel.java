package masterbikes.catalogo_service.hateoas;

import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

@Data
public class AccesorioModel extends RepresentationModel<AccesorioModel> {
    private Long id;
    private String modelo;
    private String categoria;
    private String marca;
    private String descripcion;
    private String talla;
    private String tipoUso;
    private double precioUnitario;
}
