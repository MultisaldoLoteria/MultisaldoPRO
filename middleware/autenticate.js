const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'kero_12';

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.token) {
        return res.status(403).send({
            mensaje: '!NO TIENE UN TOKEN ACTIVO¡'
        });
    }

    var tk = req.headers.token.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(tk, secret);

        if (payload.exp <= moment().unix) {
            return res.status(401).send({
                mensaje: 'EL TOKEN HA EXPIRADO¡'
            });
        }

    } catch (ex) {
        return res.status(404).send({
            mensaje: '!¡EL TOKEN NO ES VALIDO'
        });
    }
    req.user = payload;

    next();

}