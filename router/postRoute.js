const express = require('express');
const router = express.Router();
const {newPost, allPost, removePost, singlePost,updatePost} = require ('../controller/postController');
const imageUpload = require ('../helper/multer');

router.route('/posts',).post(imageUpload ,newPost).get(allPost);

router.route('/posts/:id').delete(removePost).get(singlePost).patch(imageUpload,updatePost)

module.exports=router;