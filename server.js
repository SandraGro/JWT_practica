var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var JWTController = require('./api/controller/JWTController');
var ClientesController = require ('./api/controller/ClientesController');
var ClientesModel = require ('./api/models/ClientesModel');
var userModel = require('./api/models/UserModel');
const express = require('express');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.listen(port, () => console.log(`App listening on port ${port}`))
console.log('App is running');

const sequelize = new Sequelize('practica_jwt', 'root', 'MySQLPass', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.log('Unable to connect the database', err);
    });

    JWTController(app, userModel(sequelize));
    ClientesController(app, ClientesModel(sequelize));