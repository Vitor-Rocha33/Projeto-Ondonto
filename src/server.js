//imports
const express = require('express');

const bodyParser = require('body-parser');

const dentistRoutes = require('./app/routes/dentist');

const secretaryRoutes = require('./app/routes/secretary');

//express
const app = express();

//middlewares
app.use(bodyParser.json());

//env config
require('dotenv').config();

//Routes
app.use('/secretary', secretaryRoutes);

app.use('/dentist', dentistRoutes);

app.listen(3000, () => {
    console.log('O servidor startou no localhost:3000')
});