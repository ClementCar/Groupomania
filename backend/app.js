const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');


app.use(express.json())

// Création des en-têtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const sequelize = new Sequelize('Groupomania', 'root', 'SQLmotDEpasse20', {
    dialect: 'mysql',
    host: 'localhost'
});

try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL !');
    // sequelize.query('CREATE DATABASE `Groupomania`;')
    //     .then(([results, metadata]) => {
    //         console.log('Base de données crée !');
    //     })
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

module.exports = app;