const mongoose = require('mongoose');
const model = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../service/jwt');


exports.get = (req, res) => {
    model.find(req.params.id)
        .sort({ nombre: 1, userName: 1, email: 1, pw: 1, rol: 1 })
        .select('_id nombre userName email pw rol')
        .select()
        .exec()
        .then(result => {
            console.log(result);

            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: result.length,
                    error_estado: false,
                    error: '',
                    mensaje: '!OK¡'
                });
            } else {
                res.status(404).json({
                    modelo: null,
                    filas: 0,
                    error_estado: false,
                    error: "",
                    mensaje: '!NO EXISTE DATOS!'
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
exports.getId = (req, res) => {
    model.findOne({ _id: req.params.id })
        .sort({ nombre: 1, userName: 1, email: 1, rol: 1 })
        .select('_id nombre userName email rol')
        .exec()
        .then(result => {

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

            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}

exports.post = (req, res) => {
        model.findOne({
                email: req.body.email
            })
            .exec()
            .then(result => {
                console.log(result);

                if (result) {
                    return res.status(409).json({
                        modelo: null,
                        rows: 0,
                        error_estado: false,
                        error: '',
                        mensaje: '!EL EMAIL YA EXISTE¡'
                    });
                } else {
                    bcrypt.hash(req.body.pw, null, null, (err, hash) => {
                        if (err) {
                            console.log(err);

                            return res.status(500).json({
                                modelo: null,
                                filas: 0,
                                error_estado: true,
                                error: err,
                                mensaje: '!ERROR HASH¡'
                            });
                        } else {
                            const Model = new model({
                                _id: new mongoose.Types.ObjectId,
                                nombre: req.body.nombre,
                                userName: req.body.userName,
                                email: req.body.email,
                                pw: hash,
                                rol: req.body.rol

                            });

                            Model.save()
                                .then(Result => {
                                    console.log(Result);

                                    res.status(200).json({
                                        modelo: Result,
                                        filas: 1,
                                        error_estado: false,
                                        error: '',
                                        mensaje: '!REGISTRO ADICIONADO¡'
                                    });
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
                    });
                }
            })
            .catch(exe => {
                console.log(exe);

                res.status(500).json({
                    modelo: null,
                    filas: 0,
                    error_estado: true,
                    error: ex,
                    mensaje: '!ERROR¡'
                });
            });
    }
    //PATCH
exports.patch = (req, res) => {

    model.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .exec()
        .then(result => {
            console.log(result);

            res.status(200).json({
                modelo: result,
                filas: 1,
                error_estado: false,
                error: '',
                mensaje: '!REGISTRO ACTUALIZADO¡'
            });
        })
        .catch(es => {
            console.log(ex);
            res.status(500), json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            })
        });
}
exports.login = (req, res) => {
    var params = req.body;
    var userName = params.userName;
    var pw = params.pw;

    model.findOne({ userName: userName }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error al comprobar el Usuario' });
        } else {
            if (user) {
                bcrypt.compare(pw, user.pw, (err, check) => {
                    if (check) {


                        if (params.gettoken) {
                            //comprovacion de token
                            res.status(200).send({
                                token: jwt.createToken(user)

                            })

                        } else {
                            res.status(200).send({ user });
                            console.log(this.user);

                        }

                    } else {
                        res.status(404).send({
                            message: 'Usuario no a podido loguearse correctamente'
                        });
                    }
                });

            } else {
                res.status(404).send({
                    message: 'Usuario no a podido loguearse'
                });


            }
        }
    });

}
exports.updateUser = (req, res) => {
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.model.sub) {
        return res.status(500).send({ message: 'no tienes permisos' })

    }

    model.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'error al actualizar' })
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'no se ha podido actualizar' });
            } else {
                res.status(200).send({ model: userUpdate });
            }
        }
    })


}

exports.delete = (req, res) => {
    model.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                modelo: null,
                filas: 0,
                error_estado: false,
                error: '',
                mensaje: '!REGISTRO ELIMINADO¡'
            });
        })
        .catch(ex => {
            console.log(es);

            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}
exports.postc = (req, res) => {
    model.findOne({
            email: req.body.email,
            userName: req.body.email
        })
        .exec()
        .then(result => {
            console.log(result);

            if (result) {
                return res.status(409).json({
                    modelo: null,
                    rows: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!EL EMAIL O USUARIO YA EXISTE¡'
                });
            } else {
                bcrypt.hash(req.body.pw, null, null, (err, hash) => {
                    if (err) {
                        console.log(err);

                        return res.status(500).json({
                            modelo: null,
                            filas: 0,
                            error_estado: true,
                            error: err,
                            mensaje: '!ERROR HASH¡'
                        });
                    } else {
                        const Model = new model({
                            _id: new mongoose.Types.ObjectId,
                            nombre: req.body.nombre,
                            userName: req.body.userName,
                            email: req.body.email,
                            pw: hash,
                            rol: 'user',
                            direccion: req.body.direccion,
                            telefono: req.body.telefono,

                        });

                        Model.save()
                            .then(Result => {
                                console.log(Result);

                                res.status(200).json({
                                    modelo: Result,
                                    filas: 1,
                                    error_estado: false,
                                    error: '',
                                    mensaje: '!REGISTRO ADICIONADO¡'
                                });
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
                });
            }
        })
        .catch(exe => {
            console.log(exe);

            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}
exports.get1 = (req, res) => {
    model.find(req.params.id)
        .sort({ nombre: 1, userName: 1, email: 1, pw: 1, rol: 1, direccion: 1, telefono: 1 })
        .select('_id nombre userName email pw rol direccion telefono')
        .select()
        .exec()
        .then(result => {
            console.log(result);

            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: result.length,
                    error_estado: false,
                    error: '',
                    mensaje: '!OK¡'
                });
            } else {
                res.status(404).json({
                    modelo: null,
                    filas: 0,
                    error_estado: false,
                    error: "",
                    mensaje: '!NO EXISTE DATOS!'
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
exports.getId1 = (req, res) => {
    model.findOne({ _id: req.params.id })
        .sort({ nombre: 1, userName: 1, email: 1, pw: 1, rol: 1, direccion: 1, telefono: 1 })
        .select('_id nombre userName email pw rol direccion telefono')
        .exec()
        .then(result => {

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

            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}