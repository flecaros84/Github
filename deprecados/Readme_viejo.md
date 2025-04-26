
1. **Definir el Proyecto:**
    - Descripción general del proyecto.(nombre)

    El proyecto a desarrollar es un sistema de gestión de inventarios generico.

    # 📦 Requisitos del Sistema de Gestión de Inventario

## ✅ Requisitos Funcionales

### 1. Autenticación
- **RF01**: El sistema debe permitir a los usuarios iniciar sesión con credenciales válidas.

### 2. Gestión de Productos
- **RF02**: El sistema debe permitir agregar nuevos productos al inventario.
- **RF03**: El sistema debe permitir editar los datos de productos existentes.
- **RF04**: El sistema debe permitir eliminar productos del inventario.
- **RF05**: El sistema debe permitir consultar la información de productos.
- **RF06**: El sistema debe permitir consultar el stock de los productos.

### 3. Gestión de Inventario
- **RF07**: El sistema debe permitir registrar la recepción de productos.
- **RF08**: El sistema debe permitir registrar la salida de productos.
- **RF09**: El sistema debe permitir realizar ajustes de inventario.

### 4. Gestión de Proveedores
- **RF10**: El sistema debe permitir agregar nuevos proveedores.
- **RF11**: El sistema debe permitir editar la información de proveedores.
- **RF12**: El sistema debe permitir eliminar proveedores del sistema.

### 5. Gestión de Clientes
- **RF13**: El sistema debe permitir agregar nuevos clientes.
- **RF14**: El sistema debe permitir editar la información de clientes.
- **RF15**: El sistema debe permitir eliminar clientes del sistema.

### 6. Gestión de Usuarios
- **RF16**: El sistema debe permitir agregar nuevos usuarios.
- **RF17**: El sistema debe permitir editar información de usuarios.
- **RF18**: El sistema debe permitir eliminar usuarios del sistema.

### 7. Gestión de Pedidos
- **RF19**: El sistema debe permitir realizar pedidos de productos.
- **RF20**: El sistema debe permitir recibir un pedido.
- **RF21**: El sistema debe permitir despachar un pedido.
- **RF22**: El sistema debe permitir cancelar un pedido (si aplica).
- **RF23**: El sistema debe permitir actualizar el estado de un pedido.

### 8. Generación de Reportes
- **RF24**: El sistema debe permitir seleccionar el tipo de reporte a generar.
- **RF25**: El sistema debe permitir personalizar los reportes con filtros o criterios específicos.

---

## 🛠️ Requisitos No Funcionales

### 🔐 Seguridad
- **RNF01**: El sistema debe encriptar las credenciales de los usuarios durante la autenticación.
- **RNF02**: El sistema debe implementar control de acceso por roles (Administrador, Bodeguero, Operario Externo).
- **RNF03**: El sistema debe cerrar sesión automáticamente tras 15 minutos de inactividad.

### ⚡ Rendimiento
- **RNF04**: El sistema debe responder a cualquier solicitud del usuario en menos de 2 segundos bajo carga normal.
- **RNF05**: El sistema debe ser capaz de soportar al menos 100 usuarios concurrentes sin degradación significativa del rendimiento.

### 📱 Usabilidad
- **RNF06**: La interfaz del sistema debe ser intuitiva y accesible para usuarios con conocimientos básicos de informática.
- **RNF07**: El sistema debe permitir su uso desde navegadores web modernos sin requerir instalación adicional.
- **RNF08**: El sistema debe estar disponible en idioma español por defecto.

### 🔧 Mantenibilidad
- **RNF09**: El sistema debe estar documentado para permitir su mantenimiento por terceros.
- **RNF10**: El código fuente debe seguir una arquitectura modular para facilitar la escalabilidad.

### 🔄 Disponibilidad
- **RNF11**: El sistema debe estar disponible al menos el 99.5% del tiempo durante horas laborales.
- **RNF12**: Las copias de seguridad de la base de datos deben realizarse automáticamente cada 24 horas.

### 📊 Integridad de datos
- **RNF13**: El sistema debe validar la información ingresada por los usuarios antes de guardarla en la base de datos.
- **RNF14**: El sistema debe registrar un historial de cambios para productos, pedidos e inventario.

    - Tecnologías a utilizar (Frontend, Backend, Base de Datos): java, spring, html,css, javascript, oracle

# ⚙️ Kit Básico de Herramientas – Sistema de Gestión de Inventario

Este kit está pensado para estudiantes con conocimientos básicos de Java, que quieran desarrollar una aplicación web funcional utilizando **Spring Boot**, **Oracle Database** y tecnologías web simples.

---

## 🧱 Tecnologías Principales

### 🔙 Backend – Java + Spring Boot

- **Java 17**: Lenguaje principal del sistema.
- **Spring Boot**:
  - `spring-boot-starter-web`: Para construir la lógica del sistema (controladores y endpoints).
  - `spring-boot-starter-thymeleaf`: Para generar páginas web dinámicas.
  - `spring-boot-starter-data-jpa`: Para interactuar con la base de datos Oracle mediante entidades.
  - `spring-boot-starter-validation`: Para validar formularios.
- **Maven**: Herramienta para gestionar dependencias.

---

### 🗃️ Base de Datos – Oracle

- **Oracle Database XE** (Express Edition): Motor de base de datos gratuito.
- **Oracle SQL Developer**: Cliente visual para gestionar tablas, consultas y conexiones.
- **JPA (Hibernate)**: ORM utilizado para mapear clases Java a tablas de Oracle.

---

### 🖥️ Frontend – HTML + CSS + JavaScript

- **HTML**: Estructura de las páginas web.
- **CSS**: Estilo básico de las interfaces.
- **JavaScript (básico)**: Para validaciones simples o alertas.
- **Thymeleaf**: Motor de plantillas que integra backend con frontend sin necesidad de frameworks complejos.

---

### 📁 Estructura del Proyecto Sugerida


<pre>
    src/
├── main/
│   ├── java/
│   │   └── com.miempresa.inventario/
│   │       ├── controllers/      # Controladores Spring MVC
│   │       ├── models/           # Entidades JPA (tablas)
│   │       ├── repositories/     # Repositorios JPA
│   │       └── InventarioApp.java
│   └── resources/
│       ├── static/               # Archivos CSS / JS
│       ├── templates/            # Vistas HTML (Thymeleaf)
│       └── application.properties

</pre>

### 🧪 Herramientas de Desarrollo

- **IDE:** IntelliJ IDEA Community o Eclipse
- **Navegador Web:** Para probar formularios y vistas
- **Postman (opcional):** Para probar endpoints si se usan APIs
- **Git + GitHub:** Para control de versiones del proyecto

---

### ✅ ¿Qué permite este kit?

- Crear formularios para gestionar productos, clientes, usuarios, pedidos, etc.
- Conectar formularios con base de datos usando Spring Boot y JPA.
- Validar datos antes de guardarlos.
- Mostrar información en pantalla con HTML y Thymeleaf.
- Usar operaciones CRUD (crear, leer, actualizar, eliminar) completas.

---

> 🎓 Este stack es ideal para aprender a crear una aplicación web full-stack sencilla, sin frameworks ni servicios externos complejos.

    - Metodología de desarrollo a emplear (Scrum, Kanban, etc.): kanban
    - Posible vinculación con otras asignaturas: fullstack, base de datos, ingenieria de software?
    
# 🔗 Relación entre Requisitos y Herramientas – Sistema de Gestión de Inventario

Este documento describe qué herramientas del kit básico se deben usar para implementar cada requisito funcional y no funcional del sistema, incluyendo una breve explicación del rol que cumple cada herramienta.

---

## ✅ Requisitos Funcionales

### RF01: Inicio de sesión
**Herramientas:** Spring Boot (Security opcional), Thymeleaf, HTML, Oracle  
**Explicación:** Spring Boot maneja el flujo de login. Thymeleaf genera el formulario. Oracle almacena los usuarios y contraseñas (encriptadas si se usa Spring Security).

### RF02–RF06: Gestión de Productos
**Herramientas:** Spring Boot + JPA, Thymeleaf, HTML, Oracle  
**Explicación:** JPA permite mapear clases Producto a tablas. Thymeleaf muestra productos y formularios en pantalla. HTML estructura la vista. Oracle guarda los datos.

### RF07–RF09: Gestión de Inventario
**Herramientas:** Spring Boot + JPA, Thymeleaf, Oracle, HTML  
**Explicación:** Se registran entradas, salidas y ajustes con formularios Thymeleaf y se guardan en Oracle usando JPA.

### RF10–RF12: Gestión de Proveedores
**Herramientas:** Spring Boot + JPA, Thymeleaf, Oracle, HTML  
**Explicación:** CRUD de proveedores manejado por Spring Boot y persistido con JPA en Oracle. Thymeleaf crea la interfaz.

### RF13–RF15: Gestión de Clientes
**Herramientas:** Spring Boot + JPA, Thymeleaf, Oracle, HTML  
**Explicación:** Igual que proveedores, pero aplicado a entidades Cliente.

### RF16–RF18: Gestión de Usuarios
**Herramientas:** Spring Boot + JPA, Thymeleaf, Oracle, HTML  
**Explicación:** Solo accesible por administradores. Se administra quién puede acceder al sistema.

### RF19–RF23: Gestión de Pedidos
**Herramientas:** Spring Boot + JPA, Thymeleaf, HTML, Oracle  
**Explicación:** El sistema permite crear y actualizar pedidos con formularios y listas renderizadas con Thymeleaf.

### RF24–RF25: Reportes
**Herramientas:** Spring Boot, Thymeleaf, HTML, Oracle (consultas), JavaScript (descarga PDF opcional)  
**Explicación:** Los reportes se generan en base a consultas SQL, se visualizan con HTML + Thymeleaf y se pueden descargar con JS.

---

## 🛠️ Requisitos No Funcionales

### RNF01–RNF03: Seguridad
**Herramientas:** Spring Boot Security, Oracle (roles), validaciones  
**Explicación:** Spring Security permite manejar roles y sesiones. Las validaciones protegen la entrada de datos maliciosos.

### RNF04–RNF05: Rendimiento
**Herramientas:** Java eficiente, consultas optimizadas en Oracle  
**Explicación:** Buenas prácticas en código y consultas aseguran un sistema rápido incluso con muchos datos.

### RNF06–RNF08: Usabilidad
**Herramientas:** Thymeleaf, HTML/CSS, diseño simple  
**Explicación:** Interfaz clara y formularios intuitivos permiten que cualquier usuario pueda navegar fácilmente.

### RNF09–RNF10: Mantenibilidad
**Herramientas:** Estructura en capas con Spring Boot, buenas prácticas  
**Explicación:** Organizar bien el código (controladores, servicios, repositorios) facilita futuros cambios.

### RNF11–RNF12: Disponibilidad
**Herramientas:** Despliegue estable en PC local o servidor básico  
**Explicación:** El sistema debe estar accesible de forma continua, incluso si no se usa la nube.

### RNF13–RNF14: Integridad de datos
**Herramientas:** Spring Validation, Oracle, control de errores  
**Explicación:** Se validan datos antes de guardarlos y se controla que no haya fallos en las operaciones.

---