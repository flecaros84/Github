# api-gateway/

Esta carpeta contiene el código fuente y la configuración del **API Gateway** del proyecto *MasterBikes*. El API Gateway es una pieza fundamental de la arquitectura de microservicios, encargada de enrutar las solicitudes de los clientes a los servicios internos correspondientes y de manejar aspectos transversales como la seguridad y la configuración de CORS.

---

## 📁 Contenido

### `pom.xml`
Archivo de configuración de Maven para el proyecto. Define:

- Las dependencias (Spring Cloud Gateway, Spring Boot).
- La versión de Java (17).
- Los plugins de construcción.

Es crucial para gestionar las librerías y el ciclo de vida del proyecto.

---

### `src/main/java/masterbikes/api_gateway/`

- **`ApiGatewayApplication.java`**: Clase principal que inicia la aplicación Spring Boot para el API Gateway.

- **`CorsConfig.java`**: Configuración de CORS (Cross-Origin Resource Sharing) que permite la comunicación entre el frontend (por ejemplo, `http://localhost:3000`) y los servicios del backend.  
  Actualmente está comentada, lo que sugiere que la configuración de CORS se maneja a través de `application.properties`.

---

### `src/main/resources/`

- **`application.properties`**: Archivo de configuración principal de Spring Boot. Define:

  - Puerto del servidor (`8080`).
  - Nombre de la aplicación (`api-gateway`).
  - Rutas de enrutamiento hacia los microservicios:
    - `catalogo-service`: `http://localhost:8082`
    - `inventario-service`: `http://localhost:8083`
    - `sucursal-service`: `http://localhost:8084`
    - `venta-service`: `http://localhost:8085`
  - Predicados de ruta (`/api/**`) y filtros (`StripPrefix`).
  - Configuración global de CORS:
    - Orígenes permitidos: `http://localhost:3000`
    - Métodos HTTP permitidos y cabeceras.

---

### `src/test/java/masterbikes/api_gateway/`

- **`ApiGatewayApplicationTests.java`**: Clase de prueba generada automáticamente por Spring Boot para verificar que el contexto de la aplicación se carga correctamente.

---

### `.mvn/wrapper/`

- **`maven-wrapper.properties`**: Define la versión de Maven a usar (`3.9.10`) y la URL de descarga.  
  Asegura que todos los desarrolladores usen la misma versión sin instalar Maven globalmente.

- **`mvnw` / `mvnw.cmd`**: Scripts para ejecutar Maven usando el wrapper (Unix/Windows).

---

## ▶️ Cómo Usar

Para levantar el API Gateway:

1. Asegúrate de tener **Java 17** instalado.
2. Asegúrate de que los servicios de destino (Catálogo, Inventario, Sucursal, Venta) estén ejecutándose en los puertos `8082` a `8085`.

### Opción 1: Ejecutar con Maven
```bash
./mvnw spring-boot:run
