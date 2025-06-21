package masterbikes.inventario_service.service;

import masterbikes.inventario_service.dto.InventarioReporteDTO;
import masterbikes.inventario_service.dto.SucursalDTO;
import masterbikes.inventario_service.dto.ProductoDTO;
import masterbikes.inventario_service.repository.InventarioRepository;
import masterbikes.inventario_service.model.Inventario;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ReporteInventarioService {

    private final InventarioRepository invRepo;
    private final RestTemplate restTemplate;

    // URLs base (pueden venir de application.properties)
    @Value("http://localhost:8083/api/v1/sucursales")
    private String sucursalServiceUrl;        // ej. http://localhost:8081/api/v1/sucursales
    @Value("http://localhost:8082/api/v1/catalogo")
    private String catalogoServiceUrl;        // ej. http://localhost:8082/api/v1

    public List<InventarioReporteDTO> obtenerPorSucursal(Long sucursalId) {
        // 1) obtengo inventarios de esa sucursal
        var inventarios = invRepo.findBySucursalId(sucursalId);

        // 2) llamo a sucursal-service
        String urlSuc = sucursalServiceUrl + "/" + sucursalId;
        SucursalDTO sucursal = restTemplate.getForObject(urlSuc, SucursalDTO.class);

        return inventarios.stream().map(inv -> {
            // 3) según el tipo, llamo al endpoint correspondiente del catálogo
            String urlProd;
            switch (inv.getTipoProducto().toUpperCase()) {
                case "BICICLETA":
                    urlProd = catalogoServiceUrl + "/bicicletas/" + inv.getProductoId();
                    break;
                case "ACCESORIO":
                    urlProd = catalogoServiceUrl + "/accesorios/" + inv.getProductoId();
                    break;
                case "COMPONENTE":
                    urlProd = catalogoServiceUrl + "/componentes/" + inv.getProductoId();
                    break;
                default:
                    throw new IllegalArgumentException("Tipo de producto desconocido");
            }
            ProductoDTO prod = restTemplate.getForObject(urlProd, ProductoDTO.class);

            // 4) armo el DTO de reporte
            return new InventarioReporteDTO(
                    inv.getId(),
                    inv.getTipoProducto(),
                    inv.getProductoId(),
                    prod.getModelo(),
                    inv.getCantidad(),
                    sucursal.getId(),
                    sucursal.getNombre(),
                    inv.getFechaActualizacion()
            );
        }).toList();
    }

    public List<InventarioReporteDTO> obtenerTodos() {
        List<InventarioReporteDTO> reportes = new ArrayList<>();
        for (Inventario inv : invRepo.findAll()) {
            // 1) datos de la sucursal
            SucursalDTO suc = restTemplate.getForObject(
                    sucursalServiceUrl + "/" + inv.getSucursalId(),
                    SucursalDTO.class
            );
            // 2) datos del producto
            String urlProd;
            switch (inv.getTipoProducto().toUpperCase()) {
                case "BICICLETA":
                    urlProd = catalogoServiceUrl + "/bicicletas/" + inv.getProductoId();
                    break;
                case "ACCESORIO":
                    urlProd = catalogoServiceUrl + "/accesorios/" + inv.getProductoId();
                    break;
                case "COMPONENTE":
                    urlProd = catalogoServiceUrl + "/componentes/" + inv.getProductoId();
                    break;
                default:
                    throw new IllegalArgumentException("Tipo de producto desconocido");
            }
            ProductoDTO prod = restTemplate.getForObject(urlProd, ProductoDTO.class);

            // 3) arma el DTO
            reportes.add(InventarioReporteDTO.builder()
                    .inventarioId(inv.getId())
                    .tipoProducto(inv.getTipoProducto())
                    .productoId(inv.getProductoId())
                    .modeloProducto(prod.getModelo())
                    .cantidad(inv.getCantidad())
                    .sucursalId(suc.getId())
                    .nombreSucursal(suc.getNombre())
                    .ultimaActualizacion(inv.getFechaActualizacion())
                    .build()
            );
        }
        return reportes;
    }
}

