Markdown

# Frontend del Proyecto MasterBikes

Esta carpeta contiene todo el código y los recursos relacionados con la interfaz de usuario (UI) y la experiencia del usuario (UX) de la página web de fabricación y arriendo de bicicletas MasterBikes. Aquí se encuentra la lógica de presentación, los componentes visuales y la interacción con el usuario que se ejecuta en el navegador del cliente.

## Contenido

El frontend del proyecto está estructurado para una clara separación de responsabilidades y una fácil mantenibilidad.

### 1. Archivos Estáticos (`public/`)

Este directorio alberga los archivos estáticos que se sirven directamente al navegador sin procesamiento adicional del servidor.

* `index.html`: El archivo HTML principal que carga la aplicación. Es la página de entrada de tu sitio web y contiene la estructura base donde se inyectan los demás elementos de la UI.
* `images/`: Esta carpeta contiene todas las imágenes utilizadas en la página web, tales como logotipos, fotos de bicicletas, iconos, banners, imágenes de componentes, y gráficos promocionales.

### 2. Código Fuente (`src/`)

Este directorio es el corazón del frontend, conteniendo todo el código fuente de la aplicación del lado del cliente.

#### 2.1. Archivos de Estilo (`src/styles/` o `src/css/`)

Contiene todos los archivos CSS que definen la apariencia y el diseño visual de la interfaz de usuario de la página. Los estilos están organizados para ser modulares y facilitar su mantenimiento y escalabilidad.

* `styles.css`: Este es el archivo CSS principal que define los estilos globales de la aplicación. Incluye variables CSS, estilos para la barra de navegación, la sección hero (con efecto parallax), la sección de ciudades/bicicletas, y estilos generales de los botones. También abarca estilos para el acordeón de especificaciones, el botón de cambio de color y el indicador de progreso.
* `orion-futuristic.css`: Contiene estilos específicos diseñados para una sección o producto con un tema "futurista", particularmente para las bicicletas "Orion". Incluye animaciones de entrada, efectos de zoom en imágenes de producto, estilos para miniaturas de carrusel, reseñas, botones y elementos de personalización de bicicletas. Define variables de color específicas para este tema y animaciones como `starPulse` y `pulsate`.
* `catalog-styles.css`: Este archivo agrupa los estilos relacionados con el catálogo de bicicletas y la funcionalidad del carrito de compras. Incluye estilos para los ítems del carrito, la visualización del total, el contador de ítems en el carrito y la configuración del Offcanvas (barra lateral) del carrito, así como estilos responsivos para el carrito.

#### 2.2. Lógica JavaScript (`src/js/`)

Esta carpeta alberga todos los archivos JavaScript que gestionan la interactividad y la lógica dinámica del lado del cliente para las diferentes secciones de la página web.

* `catalogo.js`: Gestiona la visualización del catálogo de bicicletas. Implementa la funcionalidad de filtrado de productos (por tipo, tamaño, marca y rango de precios), así como el ordenamiento y el cambio entre vistas de cuadrícula y lista.
* `orion-futuristic.js`: Contiene scripts específicos para la página del producto "Orion Futuristic". Implementa animaciones, efectos visuales (como el parallax), la inicialización de reseñas, el control de stock por talla, y la lógica para la personalización de la bicicleta "Orion".
* `pago.js`: Maneja todo el proceso de pago. Incluye la validación de formularios, la simulación de procesamiento de pago, la generación de números de orden y la confirmación de la compra. También se encarga de la integración con servicios externos (como el envío de emails simulado).
* `personalizacion.js`: Proporciona la funcionalidad para personalizar bicicletas. Permite a los usuarios seleccionar una bicicleta base y añadir diferentes componentes (cuadros, ruedas, transmisiones, frenos), calcula el precio total de la personalización y gestiona la adición de bicicletas personalizadas al carrito.
* `session.js`: Implementa el sistema de gestión de sesiones de usuario. Controla el inicio y cierre de sesión, almacena la información del usuario en el almacenamiento local y actualiza dinámicamente la interfaz de usuario para reflejar el estado de la sesión (e.g., mostrar botones de login/registro o el menú de usuario).
* `cart.js`: Contiene la lógica central del carrito de compras. Gestiona la adición, eliminación y actualización de ítems en el carrito, persiste el estado del carrito en el almacenamiento local y actualiza la interfaz de usuario del carrito, incluyendo el recuento de ítems y el total de la compra.

#### 2.3. Componentes y Páginas (Opcional, `src/components/`, `src/pages/`)

* `src/components/`: (Si se usa un framework como React, Vue o Angular) Contendría módulos de UI reutilizables como botones, tarjetas de productos, modales, barras de navegación, etc.
* `src/pages/`: (Si se usa un framework de SPA) Contendría los componentes principales que representan las diferentes vistas o páginas de la aplicación, como la Página de Inicio, el Catálogo de Bicicletas, el Carrito, la página de Personalización, etc.

### 3. Gestión de Dependencias y Configuración del Proyecto

Estos archivos gestionan las dependencias del proyecto y su configuración.

* `package.json`: Archivo de configuración fundamental que lista las dependencias del proyecto (librerías externas), scripts de ejecución (e.g., `start`, `build`, `test`), y metadatos del proyecto.
* `package-lock.json` (o `yarn.lock`): Generado automáticamente, registra las versiones exactas de todas las dependencias instaladas, asegurando la consistencia del entorno de desarrollo entre diferentes máquinas.
* `node_modules/`: Carpeta que contiene todas las librerías de terceros y dependencias del proyecto instaladas. No debe ser versionada en Git.

### 4. Pruebas (`src/test/` o definidas en `package.json`)

Aunque no se han proporcionado archivos específicos, esta sección estaría dedicada a las pruebas unitarias, de integración y/o end-to-end para el frontend, asegurando la calidad y el correcto funcionamiento de la interfaz de usuario. Los scripts de prueba se definirían en `package.json`.

### 5. Cómo Usar

Para poner en marcha el entorno de desarrollo del frontend o compilar la aplicación para producción, sigue estos pasos:

1.  **Instalar Dependencias**: Asegúrate de tener Node.js y npm (o Yarn) instalados. Desde la raíz de la carpeta `frontend/`, ejecuta:
    ```bash
    npm install
    # o
    yarn install
    ```
2.  **Iniciar el Servidor de Desarrollo**: Para previsualizar la aplicación en tu navegador, ejecuta:
    ```bash
    npm start
    # o
    yarn start
    ```
    Esto generalmente iniciará un servidor en `http://localhost:3000` (o un puerto similar).
3.  **Compilar para Producción**: Para generar una versión optimizada y lista para desplegar de tu aplicación, ejecuta:
    ```bash
    npm run build
    # o
    yarn build
    ```
    Esto creará una carpeta `build/` (o `dist/`) con los archivos estáticos listos para ser servidos por un servidor web.

## Tecnologías Principales

El frontend de MasterBikes se construye utilizando las siguientes tecnologías:

* **HTML5**: Para estructurar el contenido de las páginas web.
* **CSS3**: Para estilizar y diseñar la interfaz de usuario, posiblemente utilizando frameworks como Bootstrap para componentes predefinidos y responsividad.
* **JavaScript**: Para la interactividad del lado del cliente, manipulación del DOM, comunicación con APIs (si aplica) y toda la lógica de UI.
* *(Otras librerías o frameworks de JavaScript como jQuery, o un framework de SPA si s