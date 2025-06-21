package masterbikes.inventario_service.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class MovimientoInventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "inventario_id")
    @JsonIgnore
    private Inventario inventario;

    @Column(name="tipo_movimiento")
    private String tipoMovimiento;  // "entrada", "salida", "ajuste"

    private int cantidad;
    private String motivo;          // "venta", "reposición", "daño", etc.
    private LocalDateTime fecha;

    @PrePersist
    public void setearFecha() {
        this.fecha = LocalDateTime.now();
    }
}
