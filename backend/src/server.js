const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://vitor_rocha:root123@cluster0-pusol.mongodb.net/ProjetoUnieuro?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(3001);