const express = require('express');
const controller = require('../controller/transacciones');
const api = express.Router();
const md_auth = require('../middleware/autenticate');


api.get('/', md_auth.ensureAuth, controller.get);
api.get('/:id', md_auth.ensureAuth, controller.getId);
api.post('/log', md_auth.ensureAuth, controller.log);
api.post('/tra', md_auth.ensureAuth, controller.trans);


module.exports = api;