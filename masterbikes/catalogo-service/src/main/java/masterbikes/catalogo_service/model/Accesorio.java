package masterbikes.catalogo_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Accesorio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modelo;           // “Casco Bell Sanction”
    private String categoria;        // “Casco”, “Luz”, “Bomba”
    private String marca;
    private String descripcion;
    private String talla;

    @Column(name="tipo_uso")
    private String tipoUso;         // "Montaña", "Ruta", etc.

    @Column(name="precio_unitario")
    private Double precioUnitario;
}
