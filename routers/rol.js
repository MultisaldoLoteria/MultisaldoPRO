const express = require('express');
const controller = require('../controller/rol');
const api = express.Router();
const md_auth = require('../middleware/autenticate');


api.get('/', md_auth.ensureAuth, controller.get);
api.get('/:id', md_auth.ensureAuth, controller.getId);
api.post('/', md_auth.ensureAuth, controller.post);
api.patch('/:id', md_auth.ensureAuth, controller.patch);
api.delete('/:id', md_auth.ensureAuth, controller.delete);

module.exports = api;