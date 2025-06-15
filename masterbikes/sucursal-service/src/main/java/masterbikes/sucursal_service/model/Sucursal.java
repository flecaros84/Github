package masterbikes.sucursal_service.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Sucursal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String direccion;
    private String comuna;
    private String telefono;
    private String email;

    @Column(name = "horario_apertura")
    private LocalTime horarioApertura;

    @Column(name = "horario_cierre")
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime horarioCierre;

    @Column(name = "es_local_venta")
    @JsonFormat(pattern = "HH:mm:ss")
    private boolean esLocalVenta;

    @Column(name = "es_taller")
    private boolean esTaller;

    @OneToMany(mappedBy = "sucursal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Empleado> empleados = new ArrayList<>();

}
