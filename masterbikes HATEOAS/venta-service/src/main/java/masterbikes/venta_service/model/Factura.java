package masterbikes.venta_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)

public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo; // Ej: "BOLETA" o "FACTURA"
    private String folio; // Puedes usar UUID o número correlativo
    private LocalDateTime fechaEmision;

    @OneToOne
    @JoinColumn(name = "venta_id")
    @JsonIgnore //
    private Venta venta;

    // Campos para el IVA
    private double neto;
    private double iva;
    private double totalConIva;

}
