const express = require('express');
const bodyParser = require('body-parser');

const multipart = require('connect-multiparty');



const app = express();


//RUTAS

const tranRouter = require('./routers/transacciones');
const userRouter = require('./routers/user');
const rolRouter = require('./routers/rol');


//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//CONFIGURACION CABECERAS Y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, token,identity');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
})

//RUTAS BODY-PARSER

app.use('/api/transacciones', tranRouter);
app.use('/api/user', userRouter);
app.use('/api/rol', rolRouter);



//HANDLING ERRORS
app.use((req, res, next) => {
    const error = new Error(' -- !NO SE ENCONTRADO EL SITIO¡----');
    error.status = 500;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

module.exports = app;