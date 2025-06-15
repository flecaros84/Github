package masterbikes.sucursal_service.repository;

import masterbikes.sucursal_service.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}
