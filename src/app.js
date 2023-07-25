const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes.js');

mongoose.connect('mongodb://127.0.0.1:27017/sistema-imagens', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
})
.catch(err => {
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', routes);

module.exports = app;