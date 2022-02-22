const models = require('../models');
const fs = require('fs');
const user = require('./user');
const jwt = require('jsonwebtoken');

module.exports = {

    createPost : function(req, res, next) {

        // Params
        var title = req.body.title;
        var content = req.body.content;
        var attachment = req.body.attachment;
        var userId = req.auth.userId

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

    getAllPost : function (req, res, next) {
        models.post.findAll({
            // include: [{
            //     model: models.user,
            //     attributes: 'username'
            // }]
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
    },

    modifyPost : function (req, res, next) {
        const newPost = { content: req.body.content };
        const userId = req.auth.userId;
        models.post.findOne({
            where: {id: req.params.id}
        })
        .then( post => {
            if (post.UserId === userId) {
                models.post.update(
                    newPost,
                    { where: { id: req.params.id }}
                )
                .then(() => res.status(200).json({ messsage: 'Post modifié !'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }))

    },

    getOnePost : function (req, res, next) {
        models.post.findOne({
            where: { id: req.params.id }
        })
          .then((post) => res.status(200).json(post))
          .catch((error) => res.status(404).json({ error }));
    },

    deletePost: function (req, res, next) {

        const userId = req.auth.userId;
        models.post.findOne({
            where: {id: req.params.id}
        })
        .then(deletePost => {
            if (deletePost.UserId === userId) {
                if (deletePost.attachment !== '') {
                    const filename = deletePost.attachment.split('/images/'[1])
                    fs.unlink(`images/${filename}`)
                }
                models.post.destroy({
                    where: {id: req.params.id}
                })
                .then(() => res.status(200).json({ message: 'Post supprimé'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
    }
}