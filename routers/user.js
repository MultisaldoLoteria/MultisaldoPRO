const express = require('express');
const md_auth = require('../middleware/autenticate');
const controller = require('../controller/user');
const api = express.Router();

api.get('/', md_auth.ensureAuth, controller.get);
api.get('/:id', md_auth.ensureAuth, controller.getId);
api.get('/cli', md_auth.ensureAuth, controller.get1);
api.get('/cli/:id', md_auth.ensureAuth, controller.getId1);
api.post('/', md_auth.ensureAuth, controller.post);
api.post('/cli', controller.postc);
api.post('/login', controller.login);
api.patch('/editar/:id', md_auth.ensureAuth, controller.patch);
api.delete('/:id', md_auth.ensureAuth, controller.delete);

module.exports = api;