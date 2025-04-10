
# Link del Proyecto

-  https://www.figma.com/design/EpSws0LHrJkFfagjZGJry5/GestionInventario?node-id=0-1&t=8gmwRmZgeeWggRN5-1

---

# Prototipo Figma – Sistema MasterBikes

Este documento describe las pantallas necesarias para el desarrollo de un prototipo en Figma que cumpla con los requisitos funcionales y no funcionales del sistema MasterBikes.

---

## 🎨 Pantallas por Módulo y Requisito

### 🧑 Gestión de Clientes

| Pantalla | Función | Requisitos cubiertos |
|----------|---------|----------------------|
| Registro de Usuario | Formulario con validación de correo y contraseña | RF01 |
| Login / Logout | Inicio y cierre de sesión | RF02 |
| Perfil del Cliente | Acceso a historial, promociones y seguimiento | RF08, RF12 |
| Historial de Servicios | Lista de arriendos y reparaciones previas | RF08 |
| Promociones Activas | Ofertas y descuentos disponibles | RF12 |

---

### 🚲 Arriendo de Bicicletas

| Pantalla | Función | Requisitos cubiertos |
|----------|---------|----------------------|
| Catálogo de Bicicletas | Filtro, búsqueda, selección de bicicletas | RF03 |
| Formulario de Arriendo | Fecha, duración, forma de pago, entrega | RF03 |
| Seguimiento de Despacho | Progreso del pedido (línea de tiempo) | RF07 |

---

### 🔧 Reparaciones

| Pantalla | Función | Requisitos cubiertos |
|----------|---------|----------------------|
| Solicitar Reparación | Formulario con descripción y horario | RF04 |
| Estado de Reparación | Seguimiento del progreso | RF06 |
| Consulta de Stock Técnico | Disponible para técnicos | RF05 |

---

### 🧑‍💼 Supervisión y Administración

| Pantalla | Función | Requisitos cubiertos |
|----------|---------|----------------------|
| Panel del Supervisor | Acceso a reportes y estadísticas | RF10 |
| Reportes Detallados | Listado de ventas y servicios exportable | RF10 |

---

### 🔗 Integración con Proveedores

| Pantalla | Función | Requisitos cubiertos |
|----------|---------|----------------------|
| Consulta SHIMANO | Búsqueda de piezas en tiempo real | RF11 |

---

### 📧 Comunicación y Notificaciones

| Pantalla | Función | Requisitos cubiertos |
|----------|---------|----------------------|
| Mockups de Correos | Confirmaciones, seguimiento, promociones | RF09 |

---

## 🧩 Requisitos No Funcionales en el Prototipo

| Tipo | Reflejo en el diseño |
|------|----------------------|
| Seguridad (RNF01, RNF08) | Indicadores de validación, formularios protegidos |
| Usabilidad (RNF02, RNF12) | Interfaz clara, navegación intuitiva, opción de idioma |
| Rendimiento (RNF04, RNF11) | Flujos simples, cargas rápidas simuladas |
| Compatibilidad (RNF07) | Diseño responsive (desktop y mobile) |
| Mantenibilidad (RNF06) | Reutilización de componentes visuales |
| Disponibilidad (RNF05, RNF09) | Simulación de backup/estados del sistema |
| Interoperabilidad (RNF10, RNF03) | Integración visible con servicios externos |

---

## 🗂️ Organización Sugerida en Figma

```
📁 MasterBikes Prototype
├── 🧑 Gestión de Clientes
│   ├── Registro
│   ├── Login
│   ├── Perfil
│   ├── Historial
│   └── Promociones
├── 🚲 Arriendo
│   ├── Catálogo
│   ├── Formulario
│   └── Seguimiento
├── 🔧 Reparaciones
│   ├── Solicitud
│   ├── Estado
│   └── Stock Técnico
├── 🧑‍💼 Supervisor
│   ├── Dashboard
│   └── Reportes
├── 🔗 Proveedores
│   └── Consulta SHIMANO
├── 📧 Notificaciones
│   └── Mails Mockup
└── 🌐 Extras
    ├── Idiomas
    └── Mobile Views
```

---

**Documento auxiliar para el diseño de prototipo funcional en Figma - Proyecto MasterBikes**