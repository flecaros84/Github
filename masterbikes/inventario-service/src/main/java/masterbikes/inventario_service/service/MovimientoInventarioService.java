package masterbikes.inventario_service.service;

import masterbikes.inventario_service.dto.MovimientoInventarioDTO;
import masterbikes.inventario_service.model.Inventario;
import masterbikes.inventario_service.model.MovimientoInventario;
import masterbikes.inventario_service.repository.InventarioRepository;
import masterbikes.inventario_service.repository.MovimientoInventarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovimientoInventarioService {

    private final MovimientoInventarioRepository movimientoInventarioRepository;
    private final InventarioRepository inventarioRepository;

    /** Lista todos los movimientos de inventario */
    public List<MovimientoInventario> findAll() {
        return movimientoInventarioRepository.findAll();
    }

    /** Busca un movimiento por su ID */
    public MovimientoInventario findById(Long id) {
        return movimientoInventarioRepository.findById(id).orElse(null);
    }

    /** Elimina un movimiento por su ID */
    public void deleteById(Long id) {
        movimientoInventarioRepository.deleteById(id);
    }

    /**
     * Registra un nuevo movimiento y actualiza el inventario
     * @param dto datos de entrada para el movimiento
     * @return movimiento persistido
     */
    @Transactional
    public MovimientoInventario registrarMovimiento(MovimientoInventarioDTO dto) {
        // 1) Buscar inventario
        Inventario inventario = inventarioRepository.findById(dto.getInventarioId())
                .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));

        // 2) Calcular nueva cantidad
        int nuevaCantidad = inventario.getCantidad();
        String tipo = dto.getTipoMovimiento().toUpperCase();

        switch (tipo) {
            case "ENTRADA":
                if (dto.getCantidad() <= 0) {
                    throw new IllegalArgumentException("La cantidad para una ENTRADA debe ser positiva");
                }
                nuevaCantidad += dto.getCantidad();
                break;

            case "SALIDA":
                if (dto.getCantidad() <= 0) {
                    throw new IllegalArgumentException("La cantidad para una SALIDA debe ser positiva");
                }
                if (dto.getCantidad() > inventario.getCantidad()) {
                    throw new RuntimeException("Stock insuficiente");
                }
                nuevaCantidad -= dto.getCantidad();
                break;

            case "AJUSTE":
                // Puede ser positivo o negativo
                nuevaCantidad += dto.getCantidad();
                break;

            default:
                throw new IllegalArgumentException("Tipo de movimiento no válido");
        }

        // 3) Actualizar inventario
        inventario.setCantidad(nuevaCantidad);
        inventario.setFechaActualizacion(LocalDateTime.now());
        inventarioRepository.save(inventario);

        // 4) Construir y persistir el movimiento
        MovimientoInventario movimiento = MovimientoInventario.builder()
                .inventario(inventario)
                .tipoMovimiento(tipo)
                .cantidad(dto.getCantidad())
                .motivo(dto.getMotivo())
                .fecha(LocalDateTime.now())
                .build();

        return movimientoInventarioRepository.save(movimiento);
    }
}

