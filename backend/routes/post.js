const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer');

router.post('/', multer, postCtrl.createPost);

module.exports = router;