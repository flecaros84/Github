package masterbikes.venta_service.model;

import jakarta.persistence.*;
import lombok.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (name="tipo_producto")
    private String tipoProducto;

    private long productoId; //Solo guarda Id del producto
    private int cantidad;
    private double precioUnitario; //el precio debemos leerlo de catalogo

    @ManyToOne
    @JoinColumn(name = "venta_id")
    @JsonBackReference //Se agrega para evitar loop infinito en POST al visualizar detalle
    private Venta venta;

}
