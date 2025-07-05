// Servidor básico con Express
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configurar middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '..'))); // Sirve archivos desde la carpeta frontend
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Rutas para las páginas
app.get('/pages/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, req.params.page));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log('Presiona Ctrl+C para detener el servidor');
});
