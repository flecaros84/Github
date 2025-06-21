package masterbikes.inventario_service.repository;

import masterbikes.inventario_service.model.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventarioRepository extends JpaRepository<Inventario, Long> {

    /** Devuelve todos los inventarios de una sucursal dada */
    List<Inventario> findBySucursalId(Long sucursalId);

    List<Inventario> findByProductoIdAndSucursalId(Long productoId, Long sucursalId);
}
