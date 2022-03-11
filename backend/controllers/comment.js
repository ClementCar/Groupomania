const models = require('../models');


module.exports = {

    createComment: function(req, res, next) {
        
        // params
        var userId = req.auth.userId;
        var postId = req.params.id;
        var content = req.body.content;

        models.Comment.create({
            postId: postId,
            userId: userId,
            content: content
        })
        .then(newComment => res.status(201).json({
            'commentId': newComment.id
        }))
        .catch(error => res.status(400).json({ error }));
    },

    getAllCommentByPost: function(req, res, next) {
        models.Comment.findAll({
            where: {postId: req.params.id},
            // include: [
            //     'user',
            //     'post'
            // ]
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(404).json({ error }));
    },

    deleteComment: function(req, res, next) {
        const userId = req.auth.userId;
        const isAdmin = req.auth.isAdmin;
        models.Comment.findOne({
            where: {id: req.params.id}
        })
        .then(deleteComment => {
            if(deleteComment.userId === userId || isAdmin == true ) {
                models.Comment.destroy({
                    where: {id: req.params.id}
                })
                .then(() => res.status(200).json({ message: "Comment delete"}))
                .catch( error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
    }
}