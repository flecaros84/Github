# catalogo-service/

Este directorio contiene el microservicio de **Catálogo** del proyecto *MasterBikes*. Este servicio es responsable de gestionar la información de bicicletas, componentes y accesorios ofrecidos, tanto para la fabricación personalizada como para el arriendo o venta de modelos predefinidos.

---

## 📁 Contenido

El microservicio está estructurado siguiendo los principios de **Spring Boot** para aplicaciones RESTful.

---

### 1. Clases de Modelo  
📂 `src/main/java/masterbikes/catalogo_service/model/`

Definen la estructura de los datos persistidos en la base de datos:

- **`Accesorio.java`**: Representa un accesorio para bicicletas. Contiene modelo, categoría, marca, descripción, talla, tipo de uso y precio unitario.

- **`Bicicleta.java`**: Entidad principal. Puede representar bicicletas personalizadas (con `idCliente`, `tallaUsuario` y componentes específicos) o modelos predefinidos. Incluye referencias a `marco`, `rueda`, `freno`, `manubrio`, `sillín`.

- **`Componente.java`**: Representa una parte individual de la bicicleta. Atributos: tipo, marca, modelo, diámetro de rueda, tipo de freno, tipo de uso, talla, precio unitario.

---

### 2. DTOs  
📂 `src/main/java/masterbikes/catalogo_service/dto/`

Objetos de Transferencia de Datos para simplificar estructuras de datos entre capas:

- **`BicicletaDTO.java`**: Facilita la creación o actualización de bicicletas usando IDs de componentes y datos del cliente.

---

### 3. Repositorios  
📂 `src/main/java/masterbikes/catalogo_service/repository/`

Interfaces que extienden `JpaRepository` para operaciones con base de datos:

- **`AccesorioRepository.java`**
- **`BicicletaRepository.java`**: Incluye métodos personalizados para buscar bicicletas por modelo, cliente o tipo.
- **`ComponenteRepository.java`**

---

### 4. Servicios  
📂 `src/main/java/masterbikes/catalogo_service/service/`

Contienen la lógica de negocio:

- **`AccesorioService.java`**: Gestión de accesorios (listar, guardar, buscar, eliminar).
- **`BicicletaService.java`**: Lógica de compatibilidad entre componentes al guardar una bicicleta. Permite crear bicicletas desde un DTO.
- **`ComponenteService.java`**: Operaciones sobre componentes.
- **`ValidadorCompatibilidad.java`**: Clase utilitaria para validar compatibilidad entre componentes (ej. marco con rueda/freno).

---

### 5. Controladores  
📂 `src/main/java/masterbikes/catalogo_service/controller/`

Manejan solicitudes HTTP entrantes:

- **`AccesorioController.java`** → `/api/v1/catalogo/accesorios`
- **`BicicletaController.java`** → `/api/v1/catalogo/bicicletas`
- **`ComponenteController.java`** → `/api/v1/catalogo/componentes`

---

### 6. Configuración Principal

- **`CatalogoServiceApplication.java`**: Clase principal que inicializa la aplicación Spring Boot.
- **`application.properties`**:
  - Nombre de la aplicación: `catalogo-service`
  - Puerto: `8082`
  - Configuración de base de datos MySQL (URL, usuario, contraseña, dialecto Hibernate)

---

### 7. Pruebas  
📂 `src/test/java/masterbikes/catalogo_service/`

- **`CatalogoServiceApplicationTests.java`**: Verifica que el contexto Spring Boot se cargue correctamente.

---

### 8. Archivos de Proyecto y Build

- **`pom.xml`**:
  - Define dependencias: Spring Boot Data JPA, MySQL Connector, Lombok, Web, Test, SpringDoc OpenAPI.
  - Java 17
  - Configuración del Maven Compiler Plugin.

- **`maven-wrapper.properties`**:
  - Versión de Maven: `3.9.10`

---

## ▶️ Cómo Usar

### Requisitos

- **Java 17**
- **Base de datos MySQL** corriendo y accesible en:
