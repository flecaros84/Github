# sucursal-service/ (Microservicio de Sucursales y Empleados)

Esta carpeta contiene el **microservicio de Spring Boot** encargado de la gestión de sucursales y empleados para la aplicación MasterBikes. Este servicio maneja la lógica de negocio y la persistencia de datos relacionada con las ubicaciones físicas de las tiendas y el personal que trabaja en ellas.

## Descripción General

El `sucursal-service` es una pieza fundamental de la arquitectura de microservicios de MasterBikes, proporcionando una API RESTful para:

* Administrar información de las sucursales (nombre, dirección, horarios, tipo de sucursal).
* Gestionar los datos de los empleados, incluyendo su rol y la sucursal a la que pertenecen.

## Contenido

* **`src/main/java/masterbikes/sucursal_service/`**: Contiene el código fuente principal del microservicio.
    * **`controller/`**: Clases que exponen los endpoints REST para interactuar con las sucursales y los empleados.
        * `EmpleadoController.java`: Maneja las operaciones CRUD para los empleados.
        * `SucursalController.java`: Maneja las operaciones CRUD para las sucursales.
    * **`model/`**: Clases que representan las entidades de la base de datos y la lógica de dominio.
        * `Empleado.java`: Entidad que representa a un empleado, con relaciones con `Sucursal` y `Usuario`.
        * `Sucursal.java`: Entidad que representa una sucursal, incluyendo sus horarios, tipo (venta/taller) y la lista de empleados asociados.
    * **`repository/`**: Interfaces para la interacción con la base de datos, utilizando Spring Data JPA.
        * `EmpleadoRepository.java`: Interfaz para operaciones de persistencia de `Empleado`.
        * `SucursalRepository.java`: Interfaz para operaciones de persistencia de `Sucursal`.
    * **`service/`**: Clases que contienen la lógica de negocio y orquestan las operaciones del repositorio.
        * `EmpleadoService.java`: Ofrece métodos para listar, guardar, buscar y eliminar empleados.
        * `SucursalService.java`: Ofrece métodos para listar, guardar, buscar y eliminar sucursales.
    * `SucursalServiceApplication.java`: Clase principal que inicia la aplicación Spring Boot.
* **`src/test/java/masterbikes/sucursal_service/`**: Contiene las clases de prueba.
    * `SucursalServiceApplicationTests.java`: Clase principal para pruebas de contexto de Spring Boot.
* **`src/main/resources/`**:
    * `application.properties`: Archivo de configuración de la aplicación, incluyendo el puerto del servidor y los detalles de conexión a la base de datos MySQL.
* **`.mvn/wrapper/`**: Contiene los scripts y configuraciones para Maven Wrapper.
    * `maven-wrapper.properties`: Configura la versión de Maven a usar para este proyecto.
* **`pom.xml`**: Archivo de configuración del proyecto Maven, define las dependencias y plugins.

## Funcionalidad

Este microservicio proporciona las siguientes funcionalidades a través de su API REST:

### Endpoints de Sucursales (`/api/v1/sucursales`)

* `GET /api/v1/sucursales`: Obtiene una lista de todas las sucursales.
* `POST /api/v1/sucursales`: Crea una nueva sucursal.
* `GET /api/v1/sucursales/{id}`: Busca una sucursal por su ID.
* `DELETE /api/v1/sucursales/{id}`: Elimina una sucursal por su ID.

### Endpoints de Empleados (`/api/v1/empleados`)

* `GET /api/v1/empleados`: Obtiene una lista de todos los empleados.
* `POST /api/v1/empleados`: Crea un nuevo empleado.
* `GET /api/v1/empleados/{id}`: Busca un empleado por su ID.
* `DELETE /api/v1/empleados/{id}`: Elimina un empleado por su ID.

## Tecnologías Utilizadas

* **Spring Boot**: Framework para el desarrollo rápido de aplicaciones Java.
    * Versión: 3.5.0
* **Java**: Versión 17.
* **Spring Data JPA**: Para la interacción con la base de datos relacional.
* **Spring Web**: Para construir la API RESTful.
* **Lombok**: Para reducir el boilerplate code en las clases de modelo.
* **Maven**: Herramienta de gestión de proyectos y dependencias.
* **MySQL Connector/J**: Driver JDBC para conectar con bases de datos MySQL.
* **Springdoc OpenAPI UI**: Para generar la documentación de la API.
* **Jakarta Persistence (JPA)**: Para el mapeo objeto-relacional.

## Configuración y Ejecución

Para levantar el microservicio `sucursal-service`:

1.  **Requisitos**: Asegúrate de tener instalado Java Development Kit (JDK) 17 o superior y Maven.
2.  **Base de Datos**: Este servicio se conecta a una base de datos MySQL llamada `masterbikes_sucursal_01v`. Asegúrate de que esta base de datos exista y sea accesible. Los detalles de conexión están configurados en `src/main/resources/application.properties`.
    * URL: `jdbc:mysql://localhost:3306/masterbikes_sucursal_01v`
    * Usuario: `root`
    * Contraseña: (vacía)
    * La propiedad `spring.jpa.hibernate.ddl-auto=update` configurará Hibernate para actualizar el esquema de la base de datos automáticamente al iniciar la aplicación si hay cambios en las entidades.
3.  **Compilación**: Navega hasta la raíz de esta carpeta (`sucursal-service/`) en tu terminal y ejecuta:
    ```bash
    ./mvnw clean install
    ```
4.  **Ejecución**: Una vez compilado, puedes ejecutar la aplicación con:
    ```bash
    java -jar target/sucursal-service-0.0.1-SNAPSHOT.jar
    ```
    O, si estás en tu IDE (IntelliJ IDEA, Eclipse), puedes ejecutar la clase `SucursalServiceApplication.java`.

El servicio estará disponible en el puerto `8083` en `http://localhost:8083`. La documentación de la API (Springdoc OpenAPI/Swagger UI) estará accesible en `http://localhost:8083/swagger-ui.html`.

## Pruebas

Las pruebas unitarias y de integración se encuentran en `src/test/java/masterbikes/sucursal_service/`. Puedes ejecutarlas con el siguiente comando:

```bash
./mvnw test

Interacción con Otros Servicios
Este servicio está diseñado para interactuar con:

Auth-Service: Para la gestión de usuarios, ya que la entidad Empleado tiene un usuarioId para vincular con un usuario del servicio de autenticación.

Gateway API: Deberá ser expuesto a través de un API Gateway para su consumo por el frontend u otros microservicios.


