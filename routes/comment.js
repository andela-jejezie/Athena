const express = require('express');
const {commentController} = require('../controllers/comment');
const {authController} = require('../auth/auth');

module.exports = app => {
    app.post('/api/post/:id/comment', authController.authenticate, commentController.create);
    app.get('/api/post/:id/comment', commentController.getCommentByPostId);
    app.patch('/api/comment/:id', authController.authenticate, commentController.updatedComment);
    app.patch('/api/comment/:id/like', authController.authenticate, commentController.likeComment);
    app.patch('/api/comment/:id/dislike', authController.authenticate, commentController.dislikeComment);
    app.delete('/api/comment/:id', authController.authenticate, commentController.destroyComment);
}