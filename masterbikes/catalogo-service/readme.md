catalogo-service/
Esta carpeta contiene el microservicio de catalogo del proyecto MasterBikes. Este servicio es responsable de gestionar la información de las bicicletas, componentes y accesorios que se ofrecen, tanto para la fabricación personalizada como para el arriendo o venta de modelos predefinidos.

Contenido
El microservicio está estructurado siguiendo los principios de Spring Boot para aplicaciones RESTful.

1. Clases de Modelo (src/main/java/masterbikes/catalogo_service/model/)
Definen la estructura de los datos persistidos en la base de datos.

Accesorio.java: Entidad que representa un accesorio para bicicletas, con atributos como modelo, categoría, marca, descripción, talla, tipo de uso y precio unitario.

Bicicleta.java: Entidad principal que representa una bicicleta. Puede ser una bicicleta personalizada (con idCliente, tallaUsuario y componentes específicos) o predefinida. Incluye referencias a los componentes (marco, rueda, freno, manubrio, sillín).

Componente.java: Entidad que representa una parte individual de una bicicleta (ej. marco, rueda, freno, manubrio, sillín). Incluye atributos como tipo, marca, modelo, diámetro de rueda, tipo de freno, tipo de uso, talla y precio unitario.

2. DTOs (src/main/java/masterbikes/catalogo_service/dto/)
Objetos de Transferencia de Datos utilizados para la comunicación entre capas, simplificando las estructuras de datos para las solicitudes de la API.

BicicletaDTO.java: DTO para la creación o actualización de bicicletas, especialmente útil para ensamblar una bicicleta a partir de IDs de componentes y datos del cliente.

3. Repositorios (src/main/java/masterbikes/catalogo_service/repository/)
Interfaces que extienden JpaRepository para la interacción con la base de datos, proporcionando métodos CRUD y consultas personalizadas.

AccesorioRepository.java: Repositorio para la entidad Accesorio.

BicicletaRepository.java: Repositorio para la entidad Bicicleta, incluyendo métodos para buscar bicicletas predefinidas, personalizadas por cliente o por modelo.

ComponenteRepository.java: Repositorio para la entidad Componente, con métodos para buscar componentes por tipo, tipo de uso y talla.

4. Servicios (src/main/java/masterbikes/catalogo_service/service/)
Contienen la lógica de negocio y orquestan las operaciones entre controladores y repositorios.

AccesorioService.java: Servicio para gestionar las operaciones de negocio relacionadas con los accesorios (listar, guardar, buscar por ID, eliminar).

BicicletaService.java: Servicio principal para las bicicletas. Incluye lógica de compatibilidad entre componentes al guardar una bicicleta y un método para crear bicicletas desde un DTO.

ComponenteService.java: Servicio para gestionar las operaciones de negocio relacionadas con los componentes (listar, guardar, buscar por ID, eliminar).

ValidadorCompatibilidad.java: Clase utilitaria estática para validar la compatibilidad entre diferentes componentes de bicicleta (marco con rueda, marco con freno) basándose en atributos como diámetro de rueda y tipo de freno.

5. Controladores (src/main/java/masterbikes/catalogo_service/controller/)
Manejan las solicitudes HTTP entrantes y dirigen el flujo de la aplicación.

AccesorioController.java: Controlador REST para los endpoints relacionados con los accesorios (/api/v1/catalogo/accesorios).

BicicletaController.java: Controlador REST para los endpoints relacionados con las bicicletas (/api/v1/catalogo/bicicletas).

ComponenteController.java: Controlador REST para los endpoints relacionados con los componentes (/api/v1/catalogo/componentes).

6. Configuración Principal
CatalogoServiceApplication.java: Clase principal de la aplicación Spring Boot que inicializa el microservicio.

application.properties: Archivo de configuración del Spring Boot. Define el nombre de la aplicación (catalogo-service), el puerto del servidor (8082), y la configuración de la base de datos MySQL (URL, usuario, contraseña, dialecto Hibernate).

7. Pruebas (src/test/java/masterbikes/catalogo_service/)
CatalogoServiceApplicationTests.java: Clase de prueba para verificar que el contexto de Spring Boot se carga correctamente.

8. Archivos de Proyecto y Build
pom.xml: Archivo de configuración de Maven. Define las dependencias del proyecto (Spring Boot Starter Data JPA, MySQL Connector, Lombok, Spring Boot Starter Web, Spring Boot Starter Test, SpringDoc OpenAPI UI) y la versión de Java (17). También configura el Maven Compiler Plugin para Lombok.

maven-wrapper.properties: Archivo de configuración para el Maven Wrapper, asegurando que se utilice una versión específica de Maven (3.9.10) para la construcción del proyecto.

Cómo Usar
Para ejecutar el microservicio catalogo-service, asegúrate de tener:

Java Development Kit (JDK) 17 instalado.

Una base de datos MySQL corriendo y accesible en jdbc:mysql://localhost:3306/masterbikes_catalogo_01v con el usuario root (o ajusta según tu configuración en application.properties).

Puedes iniciar la aplicación usando Maven Wrapper desde la raíz de esta carpeta:

Bash

./mvnw spring-boot:run
Alternativamente, puedes construir el paquete JAR y luego ejecutarlo:

Bash

./mvnw clean install
java -jar target/catalogo-service-0.0.1-SNAPSHOT.jar
Una vez en ejecución, el servicio estará disponible en http://localhost:8082 y sus endpoints REST en la ruta /api/v1/catalogo/.