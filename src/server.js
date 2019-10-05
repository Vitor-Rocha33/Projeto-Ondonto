//imports
const express = require('express');

const bodyParser = require('body-parser');

const dentistRoutes = require('./app/routes/dentist')

//express
const app = express();

//middlewares
app.use(bodyParser.json());


require('dotenv').config();
//Routes



app.use('/dentist',dentistRoutes);

app.listen(3000,() =>{
    console.log('O servidor startou no localhost:3000')
}); 
