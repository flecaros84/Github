package masterbikes.venta_service.service;

import masterbikes.venta_service.model.Factura;
import masterbikes.venta_service.repository.FacturaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaService {

    public final FacturaRepository facturaRepository;

    public FacturaService(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    //listar
    public List<Factura> listar() {
        return facturaRepository.findAll();
    }

    //guardar
    public Factura guardar(Factura factura) {
        return facturaRepository.save(factura);
    }

    //buscar
    public Factura buscar(Long id) {
        return facturaRepository.findById(id).orElse(null);
    }

    //eliminar
    public void eliminar(Long id) {
        facturaRepository.deleteById(id);
    }

}
