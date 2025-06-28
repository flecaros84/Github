api-gateway/
Esta carpeta contiene el código fuente y la configuración del API Gateway del proyecto MasterBikes. El API Gateway es una pieza fundamental de la arquitectura de microservicios, encargada de enrutar las solicitudes de los clientes a los servicios internos correspondientes y de manejar aspectos transversales como la seguridad y la configuración de CORS.

Contenido
pom.xml: El archivo de configuración de Maven para el proyecto. Define las dependencias (Spring Cloud Gateway, Spring Boot), la versión de Java (17) y los plugins de construcción. Es crucial para gestionar las librerías y el ciclo de vida del proyecto.

src/main/java/masterbikes/api_gateway/:

ApiGatewayApplication.java: La clase principal que inicia la aplicación Spring Boot para el API Gateway.

CorsConfig.java: Una configuración de CORS (Cross-Origin Resource Sharing) que permite la comunicación entre el frontend (por ejemplo, en http://localhost:3000) y los servicios del backend. Actualmente está comentada, lo que sugiere que la configuración de CORS se maneja a través de application.properties.

src/main/resources/:

application.properties: Archivo de configuración principal para la aplicación Spring Boot. Aquí se definen:

El puerto del servidor (8080).

El nombre de la aplicación (api-gateway).

Las rutas de enrutamiento para los diferentes microservicios (catalogo-service, inventario-service, sucursal-service, venta-service), incluyendo sus URIs (http://localhost:8082 a 8085), los predicados de ruta (/api/**) y los filtros (StripPrefix).

La configuración global de CORS, especificando los orígenes permitidos (http://localhost:3000), métodos HTTP y cabeceras.

src/test/java/masterbikes/api_gateway/:

ApiGatewayApplicationTests.java: Clase de prueba generada automáticamente por Spring Boot para verificar que el contexto de la aplicación se carga correctamente.

.mvn/wrapper/:

maven-wrapper.properties: Archivo de configuración para el Maven Wrapper. Define la versión de Maven a usar (3.9.10) y la URL de descarga, asegurando que cualquier persona que compile el proyecto use la misma versión de Maven sin necesidad de instalarla globalmente.

mvnw (posiblemente un script fuera de la carpeta, pero relacionado con .mvn/wrapper): Script de shell para ejecutar Maven a través del wrapper.

mvnw.cmd (posiblemente un script fuera de la carpeta, pero relacionado con .mvn/wrapper): Script de comandos para Windows para ejecutar Maven a través del wrapper.

Cómo Usar
Para levantar el API Gateway, asegúrate de tener Java 17 instalado y luego puedes ejecutar la aplicación Spring Boot. Es fundamental que los servicios a los que el Gateway enruta (Catálogo, Inventario, Sucursal, Venta) estén corriendo en los puertos configurados (8082 a 8085) para que las solicitudes sean procesadas correctamente.

Puedes ejecutar la aplicación usando Maven:

Bash

./mvnw spring-boot:run
O construyendo el JAR y ejecutándolo:

Bash

./mvnw clean install
java -jar target/api-gateway-0.0.1-SNAPSHOT.jar