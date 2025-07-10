# Cómo iniciar un servidor con Node.js

Este es un ejemplo básico de cómo crear y ejecutar un servidor web utilizando Node.js y Express.

## Requisitos previos

- Tener [Node.js](https://nodejs.org/) instalado en tu sistema
- Conocimientos básicos de JavaScript

## Pasos para iniciar el servidor

### 1. Instalar Express

Primero, necesitas instalar Express, que es un framework web para Node.js. Abre una terminal en la carpeta de tu proyecto y ejecuta:

```bash
npm init -y
npm install express
```

El primer comando crea un archivo `package.json` con la configuración por defecto.
El segundo comando instala Express y lo añade como dependencia en tu proyecto.

### 2. Ejecutar el servidor

Una vez que hayas instalado Express y tengas el archivo `server.js` en tu carpeta, puedes iniciar el servidor con el siguiente comando:

```bash
node server.js
```

Verás un mensaje en la consola indicando que el servidor está funcionando en http://localhost:3000.

### 3. Acceder al servidor

Abre tu navegador web y visita:

```
http://localhost:3000
```

Deberías ver el mensaje "¡Servidor Express funcionando correctamente!".

## Explicación del código

El archivo `server.js` contiene:

```javascript
// Servidor básico con Express
const express = require('express');
const app = express();
const PORT = 3000;

// Configurar middleware para servir archivos estáticos
app.use(express.static('public'));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando correctamente!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log('Presiona Ctrl+C para detener el servidor');
});
```

- **express**: Es el framework web que simplifica la creación de servidores
- **app.use(express.static('public'))**: Permite servir archivos estáticos desde una carpeta llamada 'public'
- **app.use(express.json())**: Permite procesar datos JSON en las peticiones
- **app.get('/', ...)**: Define una ruta para la página principal
- **app.listen(PORT, ...)**: Inicia el servidor en el puerto especificado

## Próximos pasos

Una vez que tengas el servidor funcionando, puedes:

1. Crear más rutas para tu aplicación
2. Conectar a una base de datos
3. Implementar una API REST
4. Añadir plantillas para generar HTML dinámico

## Detener el servidor

Para detener el servidor, presiona `Ctrl+C` en la terminal donde está ejecutándose.
