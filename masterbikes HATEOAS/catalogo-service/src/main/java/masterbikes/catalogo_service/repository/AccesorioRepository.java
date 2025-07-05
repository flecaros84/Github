package masterbikes.catalogo_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import masterbikes.catalogo_service.model.Accesorio;

public interface AccesorioRepository extends JpaRepository<Accesorio, Long> {

}
