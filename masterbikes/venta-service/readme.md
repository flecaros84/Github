# venta-service/ (Microservicio de Ventas y Facturación)

Esta carpeta contiene el **microservicio de Spring Boot** encargado de la gestión de ventas y la emisión de facturas para la aplicación MasterBikes. Este servicio orquesta el proceso de una venta, desde la creación del detalle de los productos vendidos hasta la generación de la factura correspondiente, interactuando con otros microservicios de la arquitectura.

## Descripción General

El `venta-service` es un componente clave en la arquitectura de microservicios de MasterBikes, proporcionando una API RESTful para:

* Registrar nuevas ventas, incluyendo los productos (bicicletas y accesorios) y sus detalles.
* Generar facturas y boletas asociadas a cada venta.
* Consultar el historial de ventas y facturas.
* Interactuar con el servicio de inventario para registrar el egreso de productos vendidos.
* Obtener información de productos desde un servicio de catálogo.

## Contenido

* **`src/main/java/masterbikes/venta_service/`**: Contiene el código fuente principal del microservicio.
    * **`controller/`**: Clases que exponen los endpoints REST.
        * `FacturaController.java`: Maneja las operaciones de consulta de facturas.
        * `VentaController.java`: Maneja las operaciones de creación, consulta y listado de ventas.
    * **`dto/`**: Clases Data Transfer Object (DTO) para la comunicación con otros servicios.
        * `InventarioDTO.java`: DTO para la información de inventario.
        * `MovimientoInventarioDTO.java`: DTO para registrar movimientos de inventario.
        * `ProductoBaseDTO.java`: DTO para la información base de un producto.
    * **`model/`**: Clases que representan las entidades de la base de datos y la lógica de dominio.
        * `DetalleVenta.java`: Entidad que representa un ítem dentro de una venta (producto, cantidad, precio unitario).
        * `Factura.java`: Entidad que representa una factura o boleta, asociada a una venta, incluyendo detalles de IVA.
        * `Venta.java`: Entidad principal que representa una venta, con fecha, cliente, sucursal, vendedor, total y lista de detalles.
    * **`repository/`**: Interfaces para la interacción con la base de datos, utilizando Spring Data JPA.
        * `DetalleVentaRepository.java`: Interfaz para operaciones de persistencia de `DetalleVenta`.
        * `FacturaRepository.java`: Interfaz para operaciones de persistencia de `Factura`, incluyendo búsqueda por `ventaId`.
        * `VentaRepository.java`: Interfaz para operaciones de persistencia de `Venta`.
    * **`service/`**: Clases que contienen la lógica de negocio y orquestan las operaciones del repositorio y la comunicación entre servicios.
        * `FacturaService.java`: Ofrece métodos para listar, guardar, buscar y eliminar facturas.
        * `VentaService.java`: Contiene la lógica para generar una venta, calcular totales y registrar movimientos de inventario; se comunica con los servicios de catálogo e inventario.
    * `VentaServiceApplication.java`: Clase principal que inicia la aplicación Spring Boot, incluyendo la configuración de `RestTemplate` para comunicación entre servicios.
* **`src/test/java/masterbikes/venta_service/`**: Contiene las clases de prueba.
    * `VentaServiceApplicationTests.java`: Clase principal para pruebas de contexto de Spring Boot.
* **`src/main/resources/`**:
    * `application.properties`: Archivo de configuración de la aplicación, incluyendo el puerto del servidor, los detalles de conexión a la base de datos MySQL y las URLs de otros microservicios (`catalogo-service` e `inventario-service`).
* **`.mvn/wrapper/`**: Contiene los scripts y configuraciones para Maven Wrapper.
    * `maven-wrapper.properties`: Configura la versión de Maven a usar para este proyecto.
* **`pom.xml`**: Archivo de configuración del proyecto Maven, define las dependencias y plugins.

## Funcionalidad

Este microservicio proporciona las siguientes funcionalidades a través de su API REST:

### Endpoints de Ventas (`/api/v1/ventas`)

* `GET /api/v1/ventas`: Obtiene una lista de todas las ventas registradas.
* `GET /api/v1/ventas/{id}`: Obtiene los detalles de una venta específica por su ID.
* `POST /api/v1/ventas`: Permite crear una nueva venta. Este endpoint orquesta la generación de la venta, el cálculo del total, la interacción con el servicio de inventario para el egreso de productos y la creación de la factura.

### Endpoints de Facturas (`/api/v1/facturas`)

* `GET /api/v1/facturas`: Lista todas las facturas generadas.
* `GET /api/v1/facturas/{id}`: Busca una factura por su ID.

## Tecnologías Utilizadas

* **Spring Boot**: Framework para el desarrollo rápido de aplicaciones Java.
    * Versión: 3.5.3.
* **Java**: Versión 17.
* **Spring Data JPA**: Para la interacción con la base de datos relacional.
* **Spring Web**: Para construir la API RESTful.
* **Lombok**: Para reducir el boilerplate code en las clases de modelo y DTO.
* **Maven**: Herramienta de gestión de proyectos y dependencias.
* **MySQL Connector/J**: Driver JDBC para conectar con bases de datos MySQL.
* **Springdoc OpenAPI UI**: Para generar la documentación de la API.
* **Jakarta Persistence (JPA)**: Para el mapeo objeto-relacional.
* **RestTemplate**: Para la comunicación HTTP síncrona entre microservicios.

## Configuración y Ejecución

Para levantar el microservicio `venta-service`:

1.  **Requisitos**: Asegúrate de tener instalado Java Development Kit (JDK) 17 o superior y Maven.
2.  **Base de Datos**: Este servicio se conecta a una base de datos MySQL llamada `masterbikes_venta_01v`. Asegúrate de que esta base de datos exista y sea accesible. Los detalles de conexión están configurados en `src/main/resources/application.properties`.
    * URL: `jdbc:mysql://localhost:3306/masterbikes_venta_01v`
    * Usuario: `root`
    * Contraseña: (vacía)
    * La propiedad `spring.jpa.hibernate.ddl-auto=update` configurará Hibernate para actualizar el esquema de la base de datos automáticamente al iniciar la aplicación si hay cambios en las entidades.
3.  **Comunicación entre servicios**: Las URLs de los servicios de catálogo e inventario están configuradas en `application.properties`:
    * `catalogo-service`: `http://localhost:8082`
    * `inventario-service`: `http://localhost:8084`
4.  **Compilación**: Navega hasta la raíz de esta carpeta (`venta-service/`) en tu terminal y ejecuta:
    ```bash
    ./mvnw clean install
    ```
5.  **Ejecución**: Una vez compilado, puedes ejecutar la aplicación con:
    ```bash
    java -jar target/venta-service-0.0.1-SNAPSHOT.jar
    ```
    O, si estás en tu IDE (IntelliJ IDEA, Eclipse), puedes ejecutar la clase `VentaServiceApplication.java`.

El servicio estará disponible en el puerto `8085` en `http://localhost:8085`. La documentación de la API (Springdoc OpenAPI/Swagger UI) estará accesible en `http://localhost:8085/swagger-ui.html` (asumiendo que está configurado por defecto con Springdoc).

## Pruebas

Las pruebas unitarias y de integración se encuentran en `src/test/java/masterbikes/venta_service/`. Puedes ejecutarlas con el siguiente comando:

```bash
./mvnw test

Interacción con Otros Servicios
Este servicio interactúa con:

Servicio de Catálogo/Producto: Para obtener los detalles de los productos (precio unitario, modelo, marca) que se incluyen en los DetalleVenta a través de ProductoBaseDTO.

Servicio de Inventario: A través de InventarioDTO y MovimientoInventarioDTO para registrar la salida de productos después de una venta.

Auth-Service / Cliente-Service: Para obtener la información del clienteId y vendedorId asociados a la venta.

Sucursal-Service: Para obtener la información de la sucursalId donde se realiza la venta.