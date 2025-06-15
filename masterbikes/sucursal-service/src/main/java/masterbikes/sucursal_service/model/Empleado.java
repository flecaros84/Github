package masterbikes.sucursal_service.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String rol; //supervisor, vendedor, técnico

    @ManyToOne
    @JoinColumn(name = "id_supervisor")
    private Empleado supervisor;

    @ManyToOne
    @JoinColumn(name = "id_sucursal")
    @JsonIgnore
    private Sucursal sucursal;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId; // para vincular con Auth-Service
}
