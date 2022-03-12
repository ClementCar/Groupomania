const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('../models');

module.exports = {

    signup: function(req, res, next) {
      
      // Params
      var email    = req.body.email;
      var username = req.body.username;
      var password = req.body.password;
      var bio      = req.body.bio;

      bcrypt.hash(password, 10)
      .then(hash => {
          var newUser = models.User.create({
            email: email,
            username: username,
            password: hash,
            bio: bio,
            isAdmin: 0
          })
          .then((newUser) => res.status(201).json({
              'userId': newUser.id
          }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    },



    login: function(req, res, next) {

        // Params
      var email    = req.body.email;
      var password = req.body.password;

      models.User.findOne({
          where: {email: email}
      })
      .then(user => {
          if(!user) {
              return res.status(401).json({ error : 'Utilisateur non trouvé'})
          }
          bcrypt.compare(password, user.password)
          .then(valid => {
              if (!valid) {
                  return res.status(401).json({ error :'Mot de passe incorrect'})
              }
              res.status(200).json({
                  userId: user.id,
                  token: jwt.sign({
                      userId: user.id,
                      isAdmin: user.isAdmin
                  },
                      'RANDOM_TOKEN_SECRET',
                      { expiresIn: '12h'}
                  )
              })
          })
          .catch(error => res.status(500).json({ error }));
      })

      .catch(error => res.status(500).json({ error }));
    },


    getOneUser: function (req, res, next) {
        models.User.findOne({
            attributes: ['username', 'email', 'bio', 'isAdmin', 'createdAt'],
            where: {id: req.params.id},
            include: [{
                model: models.post
            }]
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
    },

    modifyUser: function (req, res, next) {
        const newBio = { bio: req.body.bio };
        const userId = req.auth.userId;
        models.User.findOne({
            where: {id: req.params.id}
        })
        .then( user => {
            if (user.id === userId) {
                models.User.update(
                    newBio,
                    { where: { id: req.params.id }}
                )
                .then(() => res.status(200).json({ messsage: 'Profil modifié !'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }))
    },

    deleteUser: function (req, res, next) {
        const userId = req.auth.userId;
        const isAdmin = req.auth.isAdmin;
        models.User.findOne({
            where: {id: req.params.id}
        })
        .then(user => {
            if (user.id === userId || isAdmin == true ) {
                models.User.destroy({
                    where: {id: req.params.id}
                })
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
    },

    getMyId: function (req, res, next) {
        const userId = req.auth.userId;
        models.User.findOne({
            attributes: ['id'],
            where: {id: userId}
        })
        .then(user  => res.status(200).json(userId))
        .catch(error => res.status(404).json({ error }))
    }
}