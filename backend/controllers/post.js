const models = require('../models');
const fs = require('fs');
const user = require('./user');

module.exports = {

    createPost : function(req, res) {

        // Params
        var title = req.body.title;
        var content = req.body.content;
        var attachment = req.body.attachment;

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
            idUSERS: 4
        })
        .then((newPost) => res.status(201).json({
            'postId': newPost.id
        }))
        .catch(error => res.status(400).json({ error }));
    },

    getAllPost : function (req, res) {
        models.post.findAll({
            attributes: ['id', 'idUSERS', 'title', 'content', 'attachment', 'likes']
            // include: [{
            //     model: models.user
            // }]
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({"C'est bien la " : error }));
    },

    modifyPost : function (req, res) {

    },

    getOnePost : function (req, res, next) {
        models.post.findOne({
            attributes: ['id', 'idUSERS', 'title', 'content', 'attachment', 'likes'],
            where: { id: req.params.id }
        })
          .then((post) => res.status(200).json(post))
          .catch((error) => res.status(404).json({ error }));
      }
}