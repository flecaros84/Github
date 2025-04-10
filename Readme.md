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

## 🚀 5. Kit de Herramientas Tecnológicas

### Backend (Java + Spring Boot)
- Spring Boot (MVC, JPA, Mail)
- Hibernate (ORM)
- Java 17

### Base de Datos
- Oracle Database XE
- SQL Developer

### Frontend
- HTML5 + CSS3 + JavaScript
- Bootstrap (diseño responsive)
- Thymeleaf (plantillas)

### Dev & Testing
- IntelliJ IDEA / Eclipse
- Postman (API REST)
- Git + GitHub
- Maven (dependencias)
- JUnit (testing)

### Extras
- WebClient / RestTemplate (integración con SHIMANO)
- JavaMailSender (notificaciones)
- Trello / Notion (planificación)

---

## 🌐 6. Relación Herramientas - Requisitos

A continuación se explica cómo cada herramienta contribuye directamente al cumplimiento de uno o varios requisitos del sistema:

| Herramienta               | Requisitos Relacionados                   | Explicación de la Interacción |
|---------------------------|-------------------------------------------|-------------------------------|
| **Spring Boot**           | RF01-12, RNF04, RNF06, RNF10, RNF03       | Proporciona el framework para crear la lógica de negocio, APIs REST y la estructura modular del sistema. |
| **Thymeleaf**             | RF01-10, RNF02, RNF07                     | Permite generar páginas dinámicas conectadas con el backend para formularios, historial, seguimientos, etc. |
| **Oracle Database**       | RF01, RF03-10, RNF05, RNF09               | Guarda toda la información del sistema: usuarios, productos, historial, stock y respaldo. |
| **Spring Security**       | RF02, RNF01, RNF08                        | Asegura el inicio de sesión, protege rutas y registra eventos de seguridad. |
| **JavaMailSender**        | RF09, RF12, RNF01                         | Envía correos de confirmación, estado de servicios y promociones de manera automática. |
| **WebClient / RestTemplate** | RF11, RNF10                             | Se usa para conectar la plataforma con los servicios web de proveedores como SHIMANO. |
| **HTML + Bootstrap**      | RF03, RF04, RF06, RF07, RNF02, RNF07      | Construye interfaces responsivas y usables en distintos dispositivos. |
| **Git + GitHub**          | RNF06                                    | Controla versiones, historial de cambios y facilita trabajo colaborativo. |
| **JUnit**                 | RNF04, RNF06                              | Permite validar el comportamiento del sistema mediante pruebas automatizadas. |
| **Postman**               | RF03–RF11                                 | Prueba los endpoints de la API para asegurar que responden correctamente. |
| **SQL Developer**         | RF05, RF10, RNF09                         | Herramienta visual para gestionar base de datos Oracle y ejecutar consultas necesarias. |
| **Maven**                 | RNF06, RNF10                              | Maneja dependencias y organiza el proyecto de forma estructurada. |
| **Trello / Notion**       | —                                         | Ayudan a planificar tareas, iteraciones y seguimiento de entregas. |

---

Este documento puede ser actualizado conforme se desarrollen las siguientes fases del proyecto. Se recomienda vincular este README.md con otras carpetas:
- `/src` para el código fuente
- `/docs` para los diagramas UML y PDFs
- `/sql` para los scripts de Oracle

---

**Equipo:** Estudiantes de Ingeniería de Software

**Proyecto:** MasterBikes - Plataforma Web

**Fecha de inicio:** 2025-04-10
