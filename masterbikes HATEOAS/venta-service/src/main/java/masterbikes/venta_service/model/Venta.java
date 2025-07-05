package masterbikes.venta_service.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@JsonIdentityInfo(
        //generator = ObjectIdGenerators.PropertyGenerator.class,
        //property = "id")

public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime fecha;
    private long clienteId;
    private long sucursalId;
    private long vendedorId;
    private double total;
    private String medioPago;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleVenta> detalles;

    @OneToOne(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Factura factura;


}
