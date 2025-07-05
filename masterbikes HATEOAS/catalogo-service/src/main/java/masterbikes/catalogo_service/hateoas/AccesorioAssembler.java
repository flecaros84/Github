package masterbikes.catalogo_service.hateoas;

import masterbikes.catalogo_service.controller.AccesorioController;
import masterbikes.catalogo_service.model.Accesorio;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class AccesorioAssembler implements RepresentationModelAssembler<Accesorio, AccesorioModel> {

    @Override
    public AccesorioModel toModel(Accesorio entity) {
        AccesorioModel model = new AccesorioModel();
        model.setId(entity.getId());
        model.setModelo(entity.getModelo());
        model.setCategoria(entity.getCategoria());
        model.setMarca(entity.getMarca());
        model.setDescripcion(entity.getDescripcion());
        model.setTalla(entity.getTalla());
        model.setTipoUso(entity.getTipoUso());
        model.setPrecioUnitario(entity.getPrecioUnitario());

        model.add(linkTo(methodOn(AccesorioController.class).findById(entity.getId())).withSelfRel());
        model.add(linkTo(methodOn(AccesorioController.class).findAll()).withRel("accesorios"));

        return model;
    }
}
