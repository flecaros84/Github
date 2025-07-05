package masterbikes.inventario_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Inventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name="id_producto")
    private Long productoId;        // ID del producto (bicicleta, componente o accesorio)

    @Column(nullable = false,name="tipo_producto")
    private String tipoProducto;    // "bicicleta", "componente", "accesorio"

    @Column(nullable = false,name="id_sucursal")
    private Long sucursalId;

    @Column(nullable = false)
    private int cantidad;

    @Column(name="fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @PrePersist
    @PreUpdate
    public void actualizarFecha() {
        this.fechaActualizacion = LocalDateTime.now();
    }
}
