const express = require('express');

const Secretary = require('../controllers/secrearyController');

const Auth = require('../../middleware/auth');

const router = express.Router();

router.post('/login', Secretary.secretary_login);

module.exports = router;