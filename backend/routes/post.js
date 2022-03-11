const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.LikePost);
router.get('/:id/like', auth, postCtrl.ifUserLike);
router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comment', auth, commentCtrl.getAllCommentByPost);
router.delete('/comment/:id', auth , commentCtrl.deleteComment);

module.exports = router;