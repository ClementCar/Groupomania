const models = require('../models');
const fs = require('fs');
const user = require('./user');
const jwt = require('jsonwebtoken');

module.exports = {

    createPost : function(req, res) {

        // Params
        var title = req.body.title;
        var content = req.body.content;
        var attachment = req.body.attachment;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId

        if(!attachment) {
            attachment = '';
        } else {
            attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }

        var newPost = models.post.create({
            title: title,
            content: content,
            attachment: attachment,
            likes: 0,
            UserId: userId
        })
        .then((newPost) => res.status(201).json({
            'postId': newPost.id
        }))
        .catch(error => res.status(400).json({ error }));
    },

    getAllPost : function (req, res) {
        models.post.findAll({
            // include: [{
            //     model: models.user,
            //     attributes: 'username'
            // }]
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
    },

    modifyPost : function (req, res) {

    },

    getOnePost : function (req, res, next) {
        models.post.findOne({
            where: { id: req.params.id }
        })
          .then((post) => res.status(200).json(post))
          .catch((error) => res.status(404).json({ error }));
    },

    deletePost: function (req, res, next) {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        models.post.findOne({
            where: {id: req.params.id}
        })
        .then((deletePost) => function(deletePost) {
            if (deletePost.UserId === userId) {
                if (deletePost.attachment !== '') {
                    const filename = deletePost.attachment.split('/images/'[1])
                    fs.unlink(`images/${filename}`)
                }
                models.post.deleteOne({
                    where: {id: req.params.id}
                })
                .then(() => res.status(200).json({ message: 'Post supprimé'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
    }
}