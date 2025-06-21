package masterbikes.catalogo_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Componente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipo;              // Clasificación de componentes Ej: "Marco", "Rueda", "Freno"
    private String marca;             // Marca del componente
    private String modelo;              // Modelo del componente

    @Column(name="diametro_rueda")
    private Integer diametroRueda;    // Valida compatibilidad. Solo aplica a marco/rueda.

    @Column(name="tipo_freno")
    private String tipoFreno;         // Valida compatibilidad. Solo aplica a marco/freno

    @Column(name="tipo_uso")
    private String tipoUso;           // Coherencia entre componentes. "Montaña", "Ruta", etc.

    private String talla;             // Ajustar a talla del cliente. Solo para marco
    private String descripcion;       // Detalle en interfaz

    @Column(name="precio_unitario")
    private Double precioUnitario;
}
