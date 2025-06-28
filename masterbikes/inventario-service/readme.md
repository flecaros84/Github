# Microservicio de Inventario (inventario-service) del Proyecto MasterBikes

Esta carpeta contiene el microservicio de inventario del proyecto MasterBikes. Este servicio es responsable de gestionar el stock de bicicletas, componentes y accesorios en las diferentes sucursales, así como de registrar los movimientos de inventario y generar reportes detallados.

## Contenido

El microservicio está estructurado siguiendo los principios de Spring Boot para aplicaciones RESTful.

### 1. Clases de Modelo (`src/main/java/masterbikes/inventario_service/model/`)

Definen la estructura de los datos persistidos en la base de datos para el inventario.

* `Inventario.java`: Entidad principal que representa el stock de un producto específico (bicicleta, componente o accesorio) en una sucursal determinada. Incluye atributos como `productoId`, `tipoProducto`, `sucursalId`, `cantidad`, y `fechaActualizacion`.
* `MovimientoInventario.java`: Entidad que registra cada operación de entrada, salida o ajuste de inventario. Contiene detalles como el `inventario` asociado, `tipoMovimiento`, `cantidad` afectada, `motivo` del movimiento y la `fecha` en que ocurrió.

### 2. DTOs (`src/main/java/masterbikes/inventario_service/dto/`)

Objetos de Transferencia de Datos utilizados para la comunicación entre capas y con otros microservicios, simplificando las estructuras de datos para las solicitudes y respuestas de la API.

* `InventarioReporteDTO.java`: DTO diseñado para la generación de reportes de inventario. Combina información del propio inventario con datos obtenidos de otros microservicios (modelo del producto del Catálogo-Service y nombre de la sucursal del Sucursal-Service).
* `MovimientoInventarioDTO.java`: DTO para la entrada de datos al registrar un nuevo movimiento de inventario, incluyendo el `inventarioId`, `tipoMovimiento`, `cantidad` y `motivo`.
* `ProductoDTO.java`: DTO simplificado para recibir datos de productos (id y modelo) desde el microservicio de Catálogo.
* `SucursalDTO.java`: DTO simplificado para recibir datos de sucursales (id y nombre) desde el microservicio de Sucursales.

### 3. Repositorios (`src/main/java/masterbikes/inventario_service/repository/`)

Interfaces que extienden `JpaRepository` para la interacción con la base de datos, proporcionando métodos CRUD y consultas personalizadas para las entidades de inventario.

* `InventarioRepository.java`: Repositorio para la entidad `Inventario`. Incluye métodos para buscar inventarios por `sucursalId` y por la combinación de `productoId` y `sucursalId`.
* `MovimientoInventarioRepository.java`: Repositorio para la entidad `MovimientoInventario`.

### 4. Servicios (`src/main/java/masterbikes/inventario_service/service/`)

Contienen la lógica de negocio y orquestan las operaciones entre controladores, repositorios y, en este caso, la interacción con otros microservicios.

* `InventarioService.java`: Servicio para gestionar las operaciones CRUD básicas sobre los registros de inventario (listar, guardar, buscar por ID, eliminar).
* `MovimientoInventarioService.java`: Servicio clave para registrar los movimientos de inventario (`ENTRADA`, `SALIDA`, `AJUSTE`). Implementa la lógica para validar las cantidades y actualizar el stock en la tabla `Inventario` de manera transaccional.
* `ReporteInventarioService.java`: Servicio encargado de generar reportes de inventario. Utiliza `RestTemplate` para consumir información de `Catalogo-Service` (para detalles de productos) y `Sucursal-Service` (para nombres de sucursales) y combinarla con los datos de inventario propios.

### 5. Controladores (`src/main/java/masterbikes/inventario_service/controller/`)

Manejan las solicitudes HTTP entrantes y dirigen el flujo de la aplicación hacia los servicios correspondientes.

* `InventarioController.java`: Controlador REST para los endpoints relacionados con la gestión directa del inventario (`/api/v1/inventarios`), permitiendo listar, guardar, buscar y eliminar registros de inventario, así como buscar por producto y sucursal.
* `MovimientoInventarioController.java`: Controlador REST para los endpoints de movimientos de inventario (`/api/v1/movimientosinventario`), facilitando el registro de nuevas entradas, salidas o ajustes de stock.
* `ReporteInventarioController.java`: Controlador REST para la generación de reportes de inventario (`/api/v1/reportesucursal`), permitiendo obtener reportes por sucursal específica o un reporte completo de todo el inventario.

### 6. Configuración Principal

Archivos esenciales para la configuración e inicialización de la aplicación Spring Boot.

* `InventarioServiceApplication.java`: Clase principal de la aplicación Spring Boot que inicializa el microservicio. También configura un `RestTemplate` como un bean para facilitar las llamadas a otros microservicios.
* `application.properties`: Archivo de configuración de Spring Boot. Define el nombre de la aplicación (`inventario-service`), el puerto del servidor (`8084`), y la configuración de la base de datos MySQL (URL, usuario, contraseña, dialecto Hibernate y estrategia `ddl-auto`).

### 7. Pruebas (`src/test/java/masterbikes/inventario_service/`)

Contiene las clases de prueba para asegurar el correcto funcionamiento del microservicio.

* `InventarioServiceApplicationTests.java`: Clase de prueba estándar de Spring Boot para verificar que el contexto de la aplicación carga correctamente.

### 8. Archivos de Proyecto y Build

Archivos de configuración de Maven para la gestión del proyecto y sus dependencias.

* `pom.xml`: Archivo de configuración de Maven. Define las dependencias del proyecto (Spring Boot Starter Data JPA, MySQL Connector, Lombok, Spring Boot Starter Web, Spring Boot Starter Test, SpringDoc OpenAPI UI) y la versión de Java (17). También configura el Maven Compiler Plugin para Lombok.
* `maven-wrapper.properties`: Archivo de configuración para el Maven Wrapper, asegurando que se utilice una versión específica de Maven (3.9.10) para la construcción del proyecto.

## Cómo Usar

Para ejecutar el microservicio `inventario-service`, asegúrate de tener:

* Java Development Kit (JDK) 17 instalado.
* Una base de datos MySQL corriendo y accesible en `jdbc:mysql://localhost:3306/masterbikes_inventario_01v` con el usuario `root` (o ajusta según tu configuración en `application.properties`).

Puedes iniciar la aplicación usando Maven Wrapper desde la raíz de esta carpeta:

```bash
./mvnw spring-boot:run