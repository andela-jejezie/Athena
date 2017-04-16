const express = require('express');
const {userController} = require('../controllers/user');
const {authController} = require('../auth/auth');

module.exports = app => {
    app.get('/api/user/:id', userController.getUserById);
    app.patch('/api/user/:id/upvote', authController.authenticate,userController.upvoteUser);
    app.patch('/api/user/:id/upvote', authController.authenticate,userController.downVoteUser);
    // app.post('/login', authController.authenticate);
}