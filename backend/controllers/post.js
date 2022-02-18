const models = require('../models');
const fs = require('fs');

module.exports = {

    createPost : function(req, res) {

        // Params
        var idUSERS = req.body.idUSERS;
        var title = req.body.title;
        var content = req.body.content;
        var attachment = req.body.attachment;

        if(!attachment) {
            attachment = '';
        } else {
            attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }

        var newPost = models.post.create({
            idUSERS: idUSERS,
            title: title,
            content: content,
            attachment: attachment,
            likes: 0
        })
        .then((newPost) => res.status(201).json({
            'postId': newPost.id
        }))
        .catch(error => res.status(400).json({ error }));
    },

    getAllPost : function (req, res) {
        models.post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
    },

    getOnePost : function (req, res) {
        models.post.findOne({ id : req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
    },

    modifyPost : function (req, res) {

    }
}