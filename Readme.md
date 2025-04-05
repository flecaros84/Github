
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
---
### FIGMA

    - Espacio para trabajar el diseño en Figma:
            https://www.figma.com/files/team/1373693046743509687/project/359582592/GestionInventario?fuid=1373693044816156470
