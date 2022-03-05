const models = require('../models');
const fs = require('fs');
const user = require('./user');
const jwt = require('jsonwebtoken');

module.exports = {

    createPost : function(req, res, next) {

        // req.body.post = JSON.parse(req.body.post);
        // let fileName = null
        // if(req.file){
        //     fileName = `/images/${req.file.filename}`;
        // }
        // const conn = await db;
        // query(conn, querysStrings.createPost, [
        // req.body.post.title || null,
        // fileName,
        // req.body.post.description || null,
        // "media",
        // req.body.post.authorId,
        // req.body.post.pseudo,
        // ])
        // .then((post) => {
        //     res.status(201);
        //     res.json({ message: "post add with success" });
        // })
        // .catch((e) => {
        //     res.status(500);
        //     res.json({ error: "connexion impossible a la base de donnée" + e });
        // });

        // Params
        var title = req.body.title;
        var content = req.body.content;
        var attachment = req.body.attachment;
        var userId = req.auth.userId

        if(!attachment) {
            attachment = '';
        } else {
            attachment = `${req.protocol}://${req.get('host')}/images/${attachment}`
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
            order:[["createdAt", "DESC"]]
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
        const isAdmin = req.auth.isAdmin;
        models.post.findOne({
            where: {id: req.params.id}
        })
        .then(deletePost => {
            if ( deletePost.UserId === userId || isAdmin == true ) {
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
    },

    LikePost: function (req, res, next) {
        const userId = req.auth.userId;
        if (req.body.like == 1) {
            models.post.findOne({
                where: {id: req.params.id}
            })
            .then(postLiked => {
                postLiked.likes++;
                models.Like.create({
                    postId: postLiked.id,
                    userId: userId
                })
                .then(() => res.status(201).json({ message: 'Post Liké !'}))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(404).json({ error }));
        }
        if (req.body.like == 0) {
            models.post.findOne({
                where: {id: req.params.id}
            })
            .then(postDisliked => {
                postDisliked.likes--;
                models.Like.destroy({
                    where: {
                        postId: postDisliked.id,
                        userId: userId
                    }
                })
                .then(() => res.status(200).json({ message: 'Like supprimé'}))
                .catch(error => res.status(404).json({ error }));
            })
            .catch(error => res.status(404).json({ error }));
        }

    }
}