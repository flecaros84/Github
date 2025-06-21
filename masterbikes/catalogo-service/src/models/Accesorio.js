const mongoose = require('mongoose');

const accesorioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Casco', 'Luces', 'Candado', 'Bomba', 'Botella', 'Otro']
    },
    marca: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descuento: {
        type: Number,
        default: 0
    },
    imagen: {
        type: String,
        required: true
    },
    disponibilidad: {
        type: String,
        enum: ['available', 'reserved', 'sold'],
        default: 'available'
    },
    descripcion: String,
    especificaciones: {
        material: String,
        peso: Number,
        color: String,
        dimensiones: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Accesorio', accesorioSchema); 