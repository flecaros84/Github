
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.*;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class SampleController {

    @Autowired
    private EntityManager entityManager;

    @GetMapping
    public List<Object[]> getClientes() {
        return entityManager.createNativeQuery("SELECT * FROM CLIENTES FETCH FIRST 10 ROWS ONLY").getResultList();
    }
}
