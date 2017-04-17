const express = require('express');
const {userController} = require('../controllers/user');
const {authController} = require('../auth/auth');

module.exports = app => {
        /**
  * @api {get} /api/v1/user/:id get user by id
  * @apiGroup User
  * @apiParam {id} id User id
  * @apiSuccessExample {json} Success
  * HTTP/1.1 201 OK
   *  {
  *       "user": {
  *           "email": "jewu",
  *           "firstname": "John",
  *           "lastname": "Me",
  *           "gender": "male",
  *           "isVerified": false,
  *           "social_capital": null,
  *           "id": 1,
  *           "createdAt": "2017-04-16T15:43:24.716Z",
  *           "updatedAt": "2017-04-16T15:51:26.776Z"
  *         },
  *        "status": 1
  *  }
  */
    app.get('/api/v1/user/:id', userController.getUserById);

           /**
  * @api {patch} /api/v1/user/:id/upvote upvote user (increment social captial)
  * @apiGroup User
  * @apiParam {id} id User id
  * @apiSuccessExample {json} Success
  * HTTP/1.1 201 OK
   *  {
  *       "user": {
  *           "email": "jewu",
  *           "firstname": "John",
  *           "lastname": "Me",
  *           "gender": "male",
  *           "isVerified": false,
  *           "social_capital": 2,
  *           "id": 1,
  *           "createdAt": "2017-04-16T15:43:24.716Z",
  *           "updatedAt": "2017-04-16T15:51:26.776Z"
  *         },
  *        "status": 1
  *  }
  */
    app.patch('/api/v1/user/:id/upvote', authController.authenticate,userController.upvoteUser);

               /**
  * @api {patch} /api/v1/user/:id/downvote downvote user (decrement social capital)
  * @apiGroup User
  * @apiParam {String} user id
  * @apiSuccessExample {json} Success
  * HTTP/1.1 201 OK
   *  {
  *       "user": {
  *           "email": "jewu",
  *           "firstname": "John",
  *           "lastname": "Me",
  *           "gender": "male",
  *           "isVerified": false,
  *           "social_capital": 2,
  *           "id": 1,
  *           "createdAt": "2017-04-16T15:43:24.716Z",
  *           "updatedAt": "2017-04-16T15:51:26.776Z"
  *         },
  *        "status": 1
  *  }
  */
    app.patch('/api/v1/user/:id/downvote', authController.authenticate,userController.downVoteUser);
}