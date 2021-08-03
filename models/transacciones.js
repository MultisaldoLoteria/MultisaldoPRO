const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Distribuidor: {
        type: Number,
        require: true
    },
    IdPago: {
        type: String,
        require: true
    },
    NIS: {
        type: String,
        require: true
    },
    IdProducto: {
        type: String,
        require: true
    },
    NumeroRecibo: {
        type: String,
        require: true
    },
    Monto: {
        type: String,
        require: true
    },
    Comision: {
        type: String,
        require: true
    },
    FechaPago: {
        type: Date,
        require: true
    },
    Estado: {
        type: String,
        require: true
    },
    ExternalId: {
        type: String,
        require: true
    },
    IdSubProducto: {
        type: String,
        require: true
    },
});
module.exports = mongoose.model('transacciones', modelo);