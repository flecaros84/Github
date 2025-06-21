package masterbikes.catalogo_service.service;

import java.util.Objects;
import masterbikes.catalogo_service.model.Componente;

public class ValidadorCompatibilidad {

    public static boolean validarMarcoRueda(Componente marco, Componente rueda) {
        return Objects.equals(marco.getDiametroRueda(), rueda.getDiametroRueda())
                && Objects.equals(marco.getTipoUso(), rueda.getTipoUso());
    }

    public static boolean validarMarcoFreno(Componente marco, Componente freno) {
        return marco.getTipoFreno() != null
                && freno.getTipoFreno() != null
                && marco.getTipoFreno().trim().equalsIgnoreCase(freno.getTipoFreno().trim());
    }

}