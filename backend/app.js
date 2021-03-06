const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')

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

// Gère les requêtes d'images enregistrer dans le dossier image
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

app.use(cors());

module.exports = app;