package masterbikes.catalogo_service.model;

import jakarta.persistence.*;
import lombok.*;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

//Esto se usa para ordenar los campos en el JSON obtenido mediante un GET
@JsonPropertyOrder({
        "id",
        "nombreModelo",
        "tallaUsuario",
        "esPredefinida",
        "idCliente",
        "marco",
        "rueda",
        "freno",
        "manubrio",
        "sillin"
})

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Bicicleta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idCliente;       // Puede ser null si es predefinida
    private String tallaUsuario;    // Opcional si es predefinida

    @ManyToOne
    @JoinColumn(name = "id_marco")
    private Componente marco;

    @ManyToOne
    @JoinColumn(name = "id_rueda")
    private Componente rueda;

    @ManyToOne
    @JoinColumn(name = "id_freno")
    private Componente freno;

    @ManyToOne
    @JoinColumn(name = "id_manubrio")
    private Componente manubrio;

    @ManyToOne
    @JoinColumn(name = "id_sillin")
    private Componente sillin;

    @Column(name = "es_predefinida", nullable = false)
    private boolean esPredefinida;

    private String modelo;

    @Column(name="precio_unitario")
    private Double precioUnitario;

}
