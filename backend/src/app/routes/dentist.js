const express = require('express');

const Dentist = require('../controllers/dentistController');

const Secretary = require('../controllers/secrearyController');

const Auth = require('../../middleware/auth');

const router = express.Router();

router.post('/register', Dentist.dentist_register);

router.post('/login', Dentist.dentist_login);

router.post('/createSecretary', Auth, Secretary.secretary_create);

module.exports = router