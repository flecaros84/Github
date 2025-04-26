# Documento - Google Docs

https://docs.google.com/document/d/1L2oZydWk8yrXAr68o2ikXGucSavi13PVdmq6Dz7_olo/edit?hl=es&tab=t.0

# MasterBikes - Plataforma de Transformación Digital

## 1. Explicación detallada del proyecto

### 1.1 Contexto General
La empresa **MasterBikes**, anteriormente conocida como "San Diego", es una empresa de fabricación y venta de bicicletas y triciclos con más de 30 años de experiencia.

Actualmente opera mediante:
- Una **casa matriz** (fábrica y ventas).
- Una **sucursal de ventas**.

Problemas actuales:
- Procesos manuales.
- Ineficiencia en gestión de stock y pedidos.
- Contacto poco eficiente con proveedores.

**Objetivo del proyecto:** Modernizar operaciones mediante una plataforma web con:
- Registro de clientes y servicios.
- Trazabilidad de pedidos.
- Integración con proveedores.
- Promoción de productos online.

### 1.2 Modelo de Negocio Actual
- Fabricación propia y adquisición de insumos.
- Atención presencial.
- Gestión de pagos mediante hojas de pedido.
- Reemplazo de productos defectuosos.
- Consolidación manual de reportes.

### 1.3 Problemas Actuales
- Venta directa enfocada.
- Nuevas necesidades: arriendo, mantención, venta de piezas.
- Competencia con servicios digitales.
- Procesos manuales lentos y daño de registros.
- Proveedores modernos con catálogos online.

### 1.4 Justificación del Proyecto
MasterBikes busca:
- Diversificar servicios: **venta, reparación y arriendo**.
- Consulta de stock y seguimiento vía web.
- Integración con proveedores como **SHIMANO**.

### 1.5 Objetivos del Proyecto

**Objetivo General:**
> Desarrollar una plataforma web que modernice los procesos de venta, arriendo, reparación y despacho de bicicletas.

**Objetivos Específicos:**
- Crear plataforma online para productos.
- Implementar funcionalidades de arriendo y reparación.
- Mejorar control de stock y trazabilidad.
- Integrar servicios de proveedores.
- Automatizar reportes y comunicaciones.

---

## 2. Requisitos del Sistema

### 2.1 Requisitos de Alto Nivel

| ID   | Requisito de Alto Nivel |
|------|-------------------------|
| RH01 | Registro de clientes para servicios. |
| RH02 | Solicitud de arriendo de bicicletas. |
| RH03 | Solicitud de reparaciones. |
| RH04 | Gestión de reparaciones por técnicos. |
| RH05 | Consulta de stock. |
| RH06 | Visualización del estado de reparaciones. |
| RH07 | Seguimiento de despachos. |
| RH08 | Generación de reportes de ventas y servicios. |
| RH09 | Integración con servicios web de proveedores. |
| RH10 | Promoción de productos y ofertas personalizadas. |

### 2.2 Requisitos Específicos

#### Requisitos Funcionales

| ID   | Requisito Funcional |
|------|---------------------|
| RF01 | Registro de clientes con validación de correo. |
| RF02 | Solicitudes de arriendo. |
| RF03 | Agenda de reparaciones. |
| RF04 | Confirmación de viabilidad por técnicos. |
| RF05 | Consulta de stock por técnicos/vendedores. |
| RF06 | Consulta de estado de reparaciones. |
| RF07 | Seguimiento de despacho. |
| RF08 | Generación de reportes diarios o personalizados. |
| RF09 | Consulta a servicios web de proveedores. |
| RF10 | Envío de promociones automatizadas. |

#### Requisitos No Funcionales

- Disponibilidad del 99%.
- Tiempo de respuesta < 2s.
- Compatible con navegadores modernos.
- Seguridad y cifrado de datos.
- Arquitectura modular.
- Soporte de 100 usuarios concurrentes.
- Respaldo diario.
- Mensajes de error claros.
- Registro de eventos importantes.

---

## 3. Descripción General del Sistema

### 3.1 Perspectiva del Producto
Sistema de microservicios desarrollado en **Java Spring Boot**, usando **Oracle Database** y desplegado en **AWS**.

### 3.2 Funciones Generales
- Registro y autenticación de usuarios.
- Arriendo de bicicletas.
- Solicitud y gestión de reparaciones.
- Historial de mantenciones.
- Registro de ventas.
- Consulta de stock.
- Seguimiento de despachos.
- Promociones personalizadas.
- Generación de reportes.
- Integración con proveedores externos.

### 3.3 Características de los Usuarios

| Perfil      | Nivel Técnico | Funcionalidad |
|-------------|---------------|---------------|
| Clientes    | Bajo          | Registro, solicitudes, historial, promociones |
| Vendedores  | Medio         | Registro de ventas, stock, despacho |
| Técnicos    | Medio         | Gestión de reparaciones, stock |
| Supervisores| Medio         | Visualización de reportes y gestión |

### 3.4 Restricciones
- Uso de Java, Spring Boot, Oracle DB, AWS.
- JWT para seguridad.
- Roles diferenciados.

### 3.5 Supuestos y Dependencias
- Usuarios finales con acceso a internet.
- Infraestructura disponible en AWS.
- API de SHIMANO funcional.

---

## 4. Tecnologías a Utilizar y Justificación

| Componente         | Tecnología                          | Uso |
|--------------------|--------------------------------------|-----|
| Frontend Web       | HTML, CSS, JavaScript, React o Vue    | Interfaz de usuario |
| Backend            | Java + Spring Boot                   | Lógica de negocio y APIs |
| Base de datos      | Oracle Database (local o RDS)         | Almacenamiento de datos |
| Seguridad          | Spring Security + JWT                | Autenticación y control de acceso |
| API Gateway        | Spring Cloud Gateway                 | Enrutamiento de microservicios |
| Despliegue         | AWS EC2 + RDS                        | Infraestructura en la nube |
| Control de versiones | GitHub                              | Gestión de versiones y colaboración |

---

## 5. Organización del Equipo

| Nombre            | Roles |
|-------------------|-------|
| Fabián Lecaros     | Product Owner y Developer |
| Héctor Águila     | Analista y Developer |
| Cesar Veliz       | Analista y Developer |
| Franco Ruz        | Diseñador y Developer |
| Vicente Barrera   | Tester y Developer |

---

## 6. Metodología de Trabajo

Se utilizará **Scrum**, con sprints de **2 semanas** de duración, enfocándose en entregas incrementales y revisiones continuas.

---

## 7. Carta Gantt del Proyecto

Duración: **21/04/2025 - 04/07/2025**

Actividades:
- Inicio, Análisis, Diseño.
- 4 Sprints de desarrollo y pruebas.
- Pruebas del sistema.
- Mantenimiento inicial.
- Cierre y entrega final.

---

## 8. Evaluación y Mejoras Esperadas

- Optimizar procesos internos.
- Mejorar la toma de decisiones.
- Ampliar el modelo de negocio.
- Mejorar atención al cliente.
- Aumentar la seguridad y escalabilidad.

---

## 9. Plan de Capacitación

**Recursos gratuitos:**
- **freeCodeCamp**: Responsive Web Design, JavaScript, React.
- **MDN Web Docs**: Referencia HTML, CSS, JavaScript.
- **Spring.io Guides** y **Baeldung**: Spring Boot y APIs.
- **Postman Free**: Testing de APIs.
- **Oracle Live SQL** y **Oracle XE 21c**: Base de datos.
- **jwt.io**: JSON Web Tokens.
- **GitHub**: Gestión de repositorios.


