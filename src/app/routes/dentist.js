const express = require('express');

const Dentist = require('../controllers/dentistController');

const router = express.Router();

router.post('/', Dentist.dentist_register);

router.post('/login', Dentist.dentist_login);

module.exports = router

