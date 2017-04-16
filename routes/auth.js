const express = require('express');
const {authController} = require('../auth/auth');

module.exports = app => {
    app.post('/signup', authController.signUpWithEmail);
    app.post('/login', authController.login);
}