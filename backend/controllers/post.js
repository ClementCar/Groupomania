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
    }
}