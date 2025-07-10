package masterbikes.catalogo_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import masterbikes.catalogo_service.model.Componente;
import java.util.List;

public interface ComponenteRepository extends JpaRepository<Componente, Long> {

    // Buscar por tipo (ej: "Marco")
    List<Componente> findByTipo(String tipo);

    // Buscar por tipo y uso (ej: ruedas de montaña)
    List<Componente> findByTipoAndTipoUso(String tipo, String tipoUso);

    // Buscar por tipo, uso y talla (para marcos)
    List<Componente> findByTipoAndTipoUsoAndTalla(String tipo, String tipoUso, String talla);

}
