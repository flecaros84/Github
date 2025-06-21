const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8082;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/masterbikes_catalogo')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Models
const Bicicleta = require('./models/Bicicleta');
const Accesorio = require('./models/Accesorio');
const Componente = require('./models/Componente');

// Routes
app.get('/bicicletas', async (req, res) => {
    try {
        const bicicletas = await Bicicleta.find();
        res.json(bicicletas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/bicicletas/:id', async (req, res) => {
    try {
        const bicicleta = await Bicicleta.findById(req.params.id);
        if (bicicleta) {
            res.json(bicicleta);
        } else {
            res.status(404).json({ message: 'Bicicleta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/bicicletas', async (req, res) => {
    const bicicleta = new Bicicleta(req.body);
    try {
        const nuevaBicicleta = await bicicleta.save();
        res.status(201).json(nuevaBicicleta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/accesorios', async (req, res) => {
    try {
        const accesorios = await Accesorio.find();
        res.json(accesorios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/componentes', async (req, res) => {
    try {
        const componentes = await Componente.find();
        res.json(componentes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Catalogo service running on port ${port}`);
}); 