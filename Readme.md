# Link al GoogleDocs:
https://docs.google.com/document/d/1L2oZydWk8yrXAr68o2ikXGucSavi13PVdmq6Dz7_olo/edit?hl=es&tab=t.0

# Documentación del Proyecto MasterBikes

Este documento presenta la planificación, análisis, especificación de requisitos y kit de herramientas para el desarrollo de un sistema de gestión integral para la empresa **MasterBikes**.

---

## 🌟 1. Objetivos del Proyecto

### Objetivo General
Desarrollar una plataforma web que modernice los procesos de venta, arriendo, reparación y despacho de bicicletas, mejorando la experiencia del cliente y la eficiencia operativa de la empresa MasterBikes.

### Objetivos Específicos
- Crear una plataforma en línea para mostrar y vender productos.
- Implementar funcionalidades de arriendo y reparación.
- Mejorar el control de stock y trazabilidad de pedidos.
- Facilitar la integración con proveedores como SHIMANO.
- Automatizar reportes y comunicaciones con clientes.

---

## 📅 2. Planificación - Carta Gantt

### Metodología
Se utilizará una **metodología incremental**, enfocada en entregar módulos funcionales por etapas y recolectar retroalimentación continua.

### Ciclo de vida del software aplicado:
- Inicio
- Análisis
- Diseño
- Desarrollo
- Pruebas
- Mantenimiento

### Cronograma resumido
| Fase              | Actividad                        | Inicio      | Duración | Fin         |
|------------------|----------------------------------|-------------|-----------|-------------|
| Inicio           | Inicio del Proyecto              | 2025-04-10  | 3 días   | 2025-04-13  |
|                  | Definición de Objetivos          | 2025-04-13  | 2 días   | 2025-04-15  |
| Análisis         | Análisis de Requisitos           | 2025-04-15  | 5 días   | 2025-04-20  |
|                  | Especificación de Requisitos     | 2025-04-20  | 4 días   | 2025-04-24  |
| Diseño           | Arquitectura, BD, Interfaces     | 2025-04-24  | 9 días   | 2025-05-04  |
| Desarrollo       | Backend, Frontend, Integración   | 2025-05-04  | 20 días  | 2025-05-24  |
| Pruebas          | Unitarias, Integración, Usuario | 2025-05-27  | 9 días   | 2025-06-06  |
| Mantenimiento    | Despliegue, soporte inicial      | 2025-06-06  | 9 días   | 2025-06-15  |

---

## 🔗 3. Requisitos del Sistema (IEEE 830)

### 3.1 Requisitos Funcionales por Módulo

A continuación se detallan los requisitos funcionales por módulo, acompañados de su respectiva historia de usuario como guía para su implementación:

#### Gestión de Clientes
- **RF01 – Registro de usuarios con verificación por correo.**
  - *Historia de Usuario:* Como nuevo cliente, quiero poder registrarme usando mi correo electrónico para acceder a los servicios de arriendo, reparación y seguimiento de mis pedidos.
- **RF02 – Inicio y cierre de sesión.**
  - *Historia de Usuario:* Como cliente registrado, quiero iniciar y cerrar sesión de forma segura para acceder a mis servicios personalizados.
- **RF08 – Visualización del historial de servicios.**
  - *Historia de Usuario:* Como cliente, quiero poder consultar mi historial de arriendos y reparaciones para saber cuándo y qué servicios he utilizado.
- **RF12 – Gestión y recepción de promociones.**
  - *Historia de Usuario:* Como cliente registrado, quiero recibir promociones personalizadas en mi correo para aprovechar descuentos en servicios.

#### Arriendo de Bicicletas
- **RF03 – Solicitud de arriendo de bicicletas.**
  - *Historia de Usuario:* Como usuario, quiero solicitar una bicicleta por un periodo definido para utilizarla en paseos o traslados específicos.
- **RF07 – Seguimiento del despacho del producto al cliente.**
  - *Historia de Usuario:* Como cliente, quiero seguir en línea el estado del despacho de mi bicicleta para saber cuándo llegará a mi domicilio.

#### Reparaciones
- **RF04 – Solicitud de reparación indicando problema y horario.**
  - *Historia de Usuario:* Como usuario, quiero poder solicitar la reparación de mi bicicleta indicando el problema y mi disponibilidad para que el técnico lo revise.
- **RF05 – Consulta de stock por parte del técnico.**
  - *Historia de Usuario:* Como técnico, quiero consultar el stock de piezas para saber si puedo realizar una reparación en base a la disponibilidad.
- **RF06 – Consulta del estado de reparación por el cliente.**
  - *Historia de Usuario:* Como cliente, quiero consultar en qué etapa se encuentra la reparación de mi bicicleta para estar informado del progreso.

#### Supervisión y Administración
- **RF10 – Reportes de ventas y servicios para supervisores.**
  - *Historia de Usuario:* Como supervisor, quiero acceder a reportes de ventas y servicios para analizar el rendimiento del negocio y tomar decisiones.

#### Integración con Proveedores
- **RF11 – Acceso a servicios web del proveedor SHIMANO.**
  - *Historia de Usuario:* Como responsable de bodega, quiero consultar el stock y precios de SHIMANO desde el sistema para agilizar los pedidos y mantener el inventario actualizado.

#### Comunicación y Notificaciones
- **RF09 – Envío de correos automáticos de confirmación, estado de reparación y seguimiento.**
  - *Historia de Usuario:* Como cliente, quiero recibir notificaciones automáticas sobre mis pedidos y servicios para mantenerme informado sin necesidad de llamar o consultar manualmente.

### 3.2 Requisitos No Funcionales por Tipo

#### Seguridad
- RNF01 – Autenticación y cifrado de la información de los usuarios.
- RNF08 – Registro de accesos y acciones administrativas (auditoría).

#### Usabilidad
- RNF02 – Interfaz amigable para usuarios no técnicos.
- RNF12 – Adaptación futura a distintos idiomas (localización).

#### Rendimiento / Eficiencia
- RNF04 – Respuestas en menos de 2 segundos bajo carga normal.
- RNF11 – Soporte para múltiples usuarios concurrentes.

#### Compatibilidad / Portabilidad
- RNF07 – Accesibilidad desde navegadores modernos y dispositivos móviles.

#### Mantenibilidad
- RNF06 – Arquitectura modular que facilite mantenimiento.

#### Disponibilidad / Fiabilidad
- RNF05 – Disponibilidad del sistema al menos 99% mensual.
- RNF09 – Backup diario automático de la base de datos.

#### Interoperabilidad / Escalabilidad
- RNF10 – Integración mediante APIs.
- RNF03 – Posibilidad de ampliar funcionalidades futuras.

---

## 🔬 4. Casos de Uso

### Actores Principales
- Cliente
- Técnico
- Vendedor
- Supervisor
- Proveedor (SHIMANO)
- Sistema (automatizado)

### Casos de Uso Destacados
- CU01: Registrarse
- CU03: Solicitar arriendo
- CU04: Solicitar reparación
- CU05: Ver estado de reparación
- CU06: Ver historial de servicios
- CU09: Ver solicitudes técnicas
- CU10: Confirmar posibilidad de reparación
- CU14: Reportes de ventas
- CU16: Consulta a SHIMANO
- CU20: Enviar promociones

*El diagrama UML está disponible en la carpeta de diagramas del repositorio.*

---

# ⚙️ Microservicios Propuestos – Sistema Bicicletas Masterbikes

Esta propuesta define los microservicios necesarios para cubrir los requisitos funcionales y no funcionales del sistema, siguiendo una arquitectura basada en **Spring Boot** y **Oracle Database**, en un contexto académico.

---

## 1. 🧑‍💼 Microservicio de Usuarios y Autenticación

- **Requisitos Relacionados:** RF01, RF02, RF12, RNF01, RNF08
- **Responsabilidades:**
  - Registro de usuarios con validación por correo.
  - Inicio y cierre de sesión con control de acceso.
  - Gestión de perfiles de usuario.
  - Registro de actividad y accesos (auditoría).
  - Envío de promociones personalizadas por correo.

---

## 2. 🚲 Microservicio de Arriendos

- **Requisitos Relacionados:** RF03, RF07, RF08
- **Responsabilidades:**
  - Solicitud y registro de arriendos de bicicletas.
  - Seguimiento del estado del arriendo y despacho.
  - Consulta de historial de arriendos por parte del cliente.

---

## 3. 🔧 Microservicio de Reparaciones

- **Requisitos Relacionados:** RF04, RF05, RF06
- **Responsabilidades:**
  - Registro y solicitud de reparaciones con detalle del problema.
  - Consulta de disponibilidad de repuestos.
  - Seguimiento del estado del proceso de reparación por parte del cliente.

---

## 4. 📊 Microservicio de Supervisión y Reportes

- **Requisitos Relacionados:** RF10, RNF04, RNF05
- **Responsabilidades:**
  - Generación de reportes de ventas y servicios.
  - Acceso para perfiles administrativos.
  - Exportación y visualización de datos consolidados.

---

## 5. 📬 Microservicio de Notificaciones

- **Requisitos Relacionados:** RF09, RF12, RNF01
- **Responsabilidades:**
  - Envío de correos automáticos (registro, confirmaciones, reparaciones).
  - Enlace con los otros microservicios vía REST para recibir eventos y generar notificaciones.
  - Manejo de plantillas de correo y promociones.

---

## 6. 🏭 Microservicio de Integración con Proveedores

- **Requisitos Relacionados:** RF11, RNF10
- **Responsabilidades:**
  - Conexión con servicios externos como el sistema de SHIMANO.
  - Consulta de stock y precios de productos externos.
  - Actualización de inventario desde proveedores.

---

## 7. 🌐 API Gateway *(opcional para versiones más avanzadas)*

- **Requisitos Relacionados:** RNF07, RNF10
- **Responsabilidades:**
  - Punto único de entrada para el frontend.
  - Redirección de peticiones a cada microservicio.
  - Gestión básica de rutas públicas/privadas.

---

## 8. ⚙️ Configuración Centralizada *(opcional para escalar el proyecto)*

- **Herramienta:** Spring Cloud Config Server
- **Responsabilidad:**
  - Gestión de propiedades de configuración para todos los microservicios desde un repositorio central.

---

## 🔄 Comunicación entre Microservicios

- Comunicación **sincrónica REST** mediante `RestTemplate`.
- Ejemplos:
  - **Arriendos** ↔ **Notificaciones**
  - **Reparaciones** ↔ **Notificaciones**
  - **Usuarios** ↔ **Reportes**

---


# 🧰 Kit de Herramientas Tecnológicas – Microservicios (Versión Académica)

Este kit está diseñado para implementar una solución de microservicios en un contexto académico, manteniendo la base tecnológica de **Spring Boot** y **Oracle Database**, pero simplificando herramientas para facilitar el aprendizaje.

## ⚙️ Backend (Microservicios con Spring Boot)

| Herramienta               | Propósito                                                                 |
|---------------------------|---------------------------------------------------------------------------|
| Spring Boot (MVC, JPA)    | Base para cada microservicio (controladores REST, lógica y persistencia). |
| Spring Security           | Seguridad básica: login, rutas protegidas, cifrado.                       |
| Spring Boot Mail          | Envío de correos automáticos (servicio de notificaciones).                |
| RestTemplate              | Comunicación entre servicios o con SHIMANO.                               |

## 🛢️ Base de Datos

| Herramienta             | Propósito                                                    |
|-------------------------|--------------------------------------------------------------|
| Oracle Database XE      | Almacén de datos (compartido o por servicio según diseño).   |
| SQL Developer           | Gestión visual de tablas, datos y consultas.                 |

## 💻 Frontend

| Herramienta             | Propósito                                                   |
|-------------------------|-------------------------------------------------------------|
| HTML5 + CSS3 + JS       | Interfaz del usuario.                                       |
| Bootstrap               | Estilo responsivo y componentes visuales.                   |
| Thymeleaf (opcional)    | Plantillas si se usa renderizado desde el backend.          |

## 🧪 Desarrollo y Pruebas

| Herramienta              | Propósito                                                  |
|--------------------------|------------------------------------------------------------|
| IntelliJ IDEA / Eclipse  | Entorno de desarrollo para codificar microservicios.       |
| Postman                  | Probar endpoints de cada servicio.                         |
| JUnit                    | Pruebas unitarias básicas por servicio.                    |
| Git + GitHub             | Versionado y trabajo colaborativo.                         |
| Maven                    | Manejo de dependencias y estructura del proyecto.          |

## 📋 Planificación y Gestión

| Herramienta         | Propósito                                   |
|---------------------|---------------------------------------------|
| Trello / Notion     | Organización de tareas y seguimiento ágil. |

---

## ✅ Relación Herramientas – Requisitos

| Herramienta               | Requisitos Relacionados           | Explicación de la Interacción                                                             |
|---------------------------|-----------------------------------|--------------------------------------------------------------------------------------------|
| Spring Boot (MVC, JPA)    | RF01–RF12, RNF03, RNF04, RNF06, RNF10 | Desarrolla cada microservicio con REST y acceso a datos.                                  |
| Spring Security           | RF02, RNF01, RNF08                | Login seguro y control de acceso.                                                         |
| JavaMailSender            | RF09, RF12                        | Envío de correos automatizados.                                                           |
| RestTemplate              | RF11, RNF10                       | Conexión con servicios externos como SHIMANO.                                             |
| Oracle Database XE        | RF01–RF10, RNF05, RNF09           | Persistencia de datos críticos.                                                           |
| SQL Developer             | RF05, RF10                        | Consulta y gestión de la base de datos Oracle.                                            |
| HTML + Bootstrap + JS     | RF03–RF07, RF10, RNF02, RNF07     | Interfaces responsivas y funcionales.                                                     |
| Thymeleaf (opcional)      | RF01–RF10                         | Renderizado desde backend.                                                                |
| IntelliJ IDEA / Eclipse   | —                                 | IDE de desarrollo.                                                                        |
| Postman                   | RF03–RF11                         | Pruebas de endpoints REST.                                                                |
| JUnit                     | RNF04, RNF06                      | Validación de comportamiento de servicios.                                                |
| Git + GitHub              | RNF06                             | Control de versiones y colaboración.                                                      |
| Maven                     | RNF06, RNF10                      | Gestión de dependencias y estructura modular.                                             |
| Trello / Notion           | —                                 | Planificación y seguimiento académico del proyecto.                                       |

# 🔗 Relación entre Requisitos, Módulos y Microservicios

| **Requisito (ID)** | **Descripción del Requisito**                                | **Módulo Funcional**            | **Microservicio Responsable**             |
|--------------------|---------------------------------------------------------------|----------------------------------|-------------------------------------------|
| RF01               | Registro de usuarios con verificación por correo              | Gestión de Clientes              | Usuarios y Autenticación                  |
| RF02               | Inicio y cierre de sesión seguro                              | Gestión de Clientes              | Usuarios y Autenticación                  |
| RF08               | Visualización del historial de servicios                      | Gestión de Clientes              | Usuarios y Autenticación                  |
| RF12               | Gestión y recepción de promociones                            | Gestión de Clientes              | Usuarios y Autenticación / Notificaciones |
| RF03               | Solicitud de arriendo de bicicletas                           | Arriendo de Bicicletas           | Arriendos                                 |
| RF07               | Seguimiento del despacho del producto al cliente              | Arriendo de Bicicletas           | Arriendos                                 |
| RF04               | Solicitud de reparación indicando problema y horario          | Reparaciones                     | Reparaciones                              |
| RF05               | Consulta de stock por parte del técnico                       | Reparaciones                     | Reparaciones / Proveedores                |
| RF06               | Consulta del estado de reparación por el cliente              | Reparaciones                     | Reparaciones                              |
| RF10               | Reportes de ventas y servicios para supervisores              | Supervisión y Administración     | Supervisión y Reportes                    |
| RF11               | Acceso a servicios web del proveedor SHIMANO                  | Integración con Proveedores      | Proveedores                               |
| RF09               | Envío de correos automáticos de confirmación y seguimiento    | Comunicación y Notificaciones    | Notificaciones                            |



---


