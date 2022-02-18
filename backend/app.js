const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Création des en-têtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// const sequelize = new Sequelize('', 'root', 'SQLmotDEpasse20', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

// try {
//     sequelize.authenticate();
//     console.log('Connecté à la base de données MySQL !');
//     // sequelize.query('CREATE DATABASE `Groupomania`;')
//     //     .then(([results, metadata]) => {
//     //         console.log('Base de données crée !');
//     //     })
// } catch (error) {
//     console.error('Impossible de se connecter, erreur suivante :', error);
// }

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;