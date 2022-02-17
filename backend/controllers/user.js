const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncLib = require('async');

const models = require('../models');

// exports.signup = (req,res, next) => {
//     bcrypt.hash(req.body.password, 10) // crypte le mot de passe en faisant 10 tours dans la fonction hash
//     .then(hash => {
//         const user = models.user.create({ // crée un utilisateur grace au modele
//           email: req.body.email,
//           username: req.body.username,
//           password: hash,
//           bio: req.body.bio,
//           isAdmin: 0
//         })
//         .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
//         .catch(error => res.status(400).json({"Non, l'erreur est bien ici !" : error}));

//         // user.save() // enregistre le nouvel utilisateur dans la base de données
//         //   .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//         //   .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => res.status(500).json({ "l'erreur est ici": error }));
// };

// exports.login = (req, res, next) => {

// };

module.exports = {
    register: function(req, res) {
      
      // Params
      var email    = req.body.email;
      var username = req.body.username;
      var password = req.body.password;
      var bio      = req.body.bio;
  
      if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
      }
  
      if (username.length >= 13 || username.length <= 4) {
        return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
      }
  
      asyncLib.waterfall([
        function(done) {
          models.User.findOne({
            attributes: ['email'],
            where: { email: email }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        },
        function(userFound, done) {
          if (!userFound) {
            bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
              done(null, userFound, bcryptedPassword);
            });
          } else {
            return res.status(409).json({ 'error': 'user already exist' });
          }
        },
        function(userFound, bcryptedPassword, done) {
          var newUser = models.User.create({
            email: email,
            username: username,
            password: bcryptedPassword,
            bio: bio,
            isAdmin: 0
          })
          .then(function(newUser) {
            done(newUser);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'cannot add user' });
          });
        }
      ], function(newUser) {
        if (newUser) {
          return res.status(201).json({
            'userId': newUser.id
          });
        } else {
          return res.status(500).json({ 'error': 'cannot add user' });
        }
      });
    }
}