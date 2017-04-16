const express = require('express');
const {postController} = require('../controllers/post');
const {authController} = require('../auth/auth');

module.exports = app => {
    app.post('/api/post/create', authController.authenticate, postController.create);
    app.get('/api/post/:id', postController.getPostById);
    app.get('/api/posts', postController.getListOfPost);
    app.patch('/api/post/:id', authController.authenticate, postController.updatePost);
    app.patch('/api/post/:id/like', authController.authenticate, postController.likePost);
    app.patch('/api/post/:id/dislike', authController.authenticate, postController.dislikePost);
    app.get('/api/post/:tag', postController.retrievePostByTag);
    app.delete('/api/post/:id', authController.authenticate, postController.destroyPost);
}