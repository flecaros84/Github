package masterbikes.catalogo_service.repository;

import masterbikes.catalogo_service.model.Bicicleta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BicicletaRepository extends JpaRepository<Bicicleta, Long> {

    List<Bicicleta> findByEsPredefinidaTrue();

    List<Bicicleta> findByEsPredefinidaFalse();

    List<Bicicleta> findByIdClienteAndEsPredefinidaFalse(String idCliente);

    Optional<Bicicleta> findByModelo(String modelo);
}
