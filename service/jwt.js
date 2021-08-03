const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'kero_12';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        userName: user.userName,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
}