package masterbikes.catalogo_service.dto;
import lombok.Data;

@Data
public class BicicletaDTO {
    private String idCliente;
    private String tallaUsuario;

    private Long idMarco;
    private Long idRueda;
    private Long idFreno;
    private Long idManubrio;
    private Long idSillin;

    private boolean esPredefinida;
    private String modelo;

}
