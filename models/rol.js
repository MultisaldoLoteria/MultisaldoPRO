const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rol: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('rol', modelo);