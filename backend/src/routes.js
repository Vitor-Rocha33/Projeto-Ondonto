const express = require('express');

const PatientController = require('./controller/PatientController');

const routes = express.Router();

//GET ,POST, PUT, DELETE

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edicao e delete)
//req.body = Acessar corpo da requisicao (para criacao, edicao)

routes.post('/patient', PatientController.store);

module.exports = routes;