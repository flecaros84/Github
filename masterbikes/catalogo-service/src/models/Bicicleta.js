const mongoose = require('mongoose');

const bicicletaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Mountain Bike', 'Ruta', 'BMX', 'Urbana', 'Eléctrica']
    },
    marca: {
        type: String,
        required: true
    },
    talla: {
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
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    descripcion: String,
    especificaciones: {
        material: String,
        peso: Number,
        suspension: String,
        frenos: String,
        cambios: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bicicleta', bicicletaSchema); 