const mongoose = require('mongoose');
const express = require('express');
const model = require('../models/transacciones');


//buscar por Post
exports.trans = (req, res) => {
    var params = req.body;

    console.log('*******************    BODY', req.body.Distribuidor);

    model.find({ Distribuidor: params.Distribuidor })

    .sort({ Distribuidor: 1, IdPago: 1, NIS: 1, IdProducto: 1, NumeroRecibo: 1, Monto: 1, Comision: 1, FechaPago: 1, Estado: 1, ExternalId: 1, IdSubProducto: 1 })
        .select('_id Distribuidor  IdPago  NIS  IdProducto  NumeroRecibo Monto  Comision  FechaPago  Estado  ExternalId  IdSubProducto')
        .exec()
        .then(result => {
            console.log(result);

            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: 1,
                    error_estado: false,
                    error: '',
                    mensaje: '!OK¡'
                });
            } else {
                res.status(204).json({
                    modelo: null,
                    filas: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!NO EXISTEN DATOS¡'
                });
            }
        })
        .catch(ex => {
            console.log(ex);

            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}


//GET
exports.get = (req, res) => {
    model.find(req.params.id)
        .sort({ nombre: 1 })
        .select('_id nombre')
        .exec()
        .then(result => {
            console.log(result);

            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: result.length,
                    error_estado: false,
                    error: '',
                    mensaje: 'ok'
                });
            } else {
                res.status(404).json({
                    model: null,
                    filas: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!NO EXISTE DATOS¡'
                });
            }
        })
        .catch(ex => {
            console.log(ex);

            res.status(500), json({
                modelo: null,
                filas: 0,
                error_estado: true,
                erro: ex,
                mensaje: '!ERROR¡'
            });
        });
}

exports.getId = (req, res) => {
    model.findOne({
            _id: req.params.id
        })
        .sort({ nombre: 1 })
        .select('_id nombre')
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: 1,
                    error_estado: false,
                    error: '',
                    mensaje: "!OK¡"
                });
            } else {
                res.status(204).json({
                    modelo: null,
                    filas: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!NO EXISTE DATOS¡'
                });
            }
        })
        .catch(ex => {
            console.log(ex);

            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}


exports.log = (req, res) => {
    var params = req.body;
    var FechaPago = params.FechaPago;
    var Distribuidor = params.Distribuidor;
    console.log('*******************    BODY', req.body.Distribuidor);
    console.log('*******************    BODY', req.body.FechaPago);


    model.find({ FechaPago: FechaPago }, (err, tra) => {
        if (err) {
            res.status(500).send({ message: 'Error en la busqueda' });
        } else {
            if (tra) {


                res.status(200).json({ tra });

            } else {
                res.status(404).send({
                    message: 'NO SE ENCONTRO'
                });
                console.log("por aqui2PPPP");


            }
        }
    });


}