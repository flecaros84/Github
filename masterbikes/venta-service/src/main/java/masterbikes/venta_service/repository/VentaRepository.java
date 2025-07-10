package masterbikes.venta_service.repository;

import masterbikes.venta_service.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepository extends JpaRepository<Venta, Long> {

}
