// Script para poblar la base de datos del catálogo de bicicletas usando Node.js
// Uso: node populateCatalogNode.js
// Asegúrate de tener el backend corriendo en http://localhost:8080

// Si usas Node 18+ puedes eliminar la siguiente línea y usar fetch global
const fetch = require('node-fetch');

const productosEjemplo = [
  {
    name: "Merak 29 Azul 2025",
    brand: "MARIN",
    type: "MTB",
    size: "M",
    price: 3200000,
    image: "images/ba2951-merak-29-azul-2025-01-2.png",
    description: "Bicicleta de montaña ligera y resistente, ideal para senderos exigentes.",
    rating: 4.7
  },
  {
    name: "Aura 6 27.5 Lila 2021",
    brand: "MARIN",
    type: "MTB",
    size: "S",
    price: 2100000,
    image: "images/ba2764-aura-6-27_5-lila-2021-01.jpg",
    description: "Modelo versátil para ciudad y montaña, con diseño moderno.",
    rating: 4.5
  },
  {
    name: "Polux 7 29 Negro 2022",
    brand: "MARIN",
    type: "MTB",
    size: "L",
    price: 2850000,
    image: "images/ba2952-polux-7-29-negro-2022-04.jpg",
    description: "Bicicleta robusta para aventuras extremas y uso diario.",
    rating: 4.6
  },
  {
    name: "Orion 4 27.5 Titanio 2022",
    brand: "MARIN",
    type: "MTB",
    size: "M",
    price: 2500000,
    image: "images/BA2761-ORION-4-27.5-TITANIO-2022-02_2.jpg",
    description: "Excelente relación peso-potencia, perfecta para ciclistas exigentes.",
    rating: 4.8
  },
  {
    name: "Halley 27 Verde 2024",
    brand: "MARIN",
    type: "Urbana",
    size: "M",
    price: 1800000,
    image: "images/ba2732_halley_27_verde_2024-01_1.jpg",
    description: "Bicicleta urbana cómoda y eficiente para desplazamientos diarios.",
    rating: 4.3
  }
];

async function poblarCatalogo() {
  for (const producto of productosEjemplo) {
    try {
      // Usar tipo sin tildes para el endpoint (ejemplo: MTB, Urbana)
      const tipo = producto.type.normalize("NFD").replace(/\p{Diacritic}/gu, "");
      const url = `http://localhost:8080/api/v1/catalogo/${encodeURIComponent(tipo)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
      if (res.ok) {
        console.log(`Producto agregado: ${producto.name}`);
      } else {
        console.warn(`Error al agregar: ${producto.name}`);
      }
    } catch (e) {
      console.error(`Error de red con: ${producto.name}`);
    }
  }
  console.log('Poblamiento de catálogo finalizado.');
}

poblarCatalogo();
