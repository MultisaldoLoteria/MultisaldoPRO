var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 5501;

mongoose.Promise = global.Promise;

'mongodb://localhost:27017/loteria'


mongoose.connect('mongodb://localhost:27017/loteria', { useNewUrlParser: true })
    .then(() => {
        console.log('CONEXION AL SERVICIO MONGO AL PORTAL SE A REALIZADO SATISFACTPRIAMENTE');

        app.listen(port, () => {
            console.log('EL SERVIDOR NODE ESTA CORRIENDO......');
        });
    })
    .catch(err => console.log(err));