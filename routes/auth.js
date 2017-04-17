const express = require('express');
const {authController} = require('../auth/auth');

module.exports = app => {
    /**
  * @api {post} /signup sign up using email
  * @apiGroup Authentication
  * @apiParam {String} email User email
  * @apiParam {String} password User password
  * @apiParam {String} firstname User first name
  * @apiParam {String} lastname User last name
  * @apiParam {String} gender User gender
  * @apiParamExample {json} Input
  *  {
  *    "email":email,
  *    "password":password,
  *    "firstname":firstname,
  *    "lastname":lastname,
  *    "gender":gender,
  *   }
  * @apiSuccess {String} id_token Response contains key id_token to be used for Authorization for subsequent query that require Authorization
  * @apiSuccessExample {json} Success
  * HTTP/1.1 201 OK
   *  {
  *       "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkyMzU3ODg2fQ.qFrupcgdLt0wssoON077hqqU4ONRHPBUuu9RczfSpgA",
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
    app.post('/signup', authController.signUpWithEmail);

        /**
  * @api {post} /login login using email
  * @apiGroup Authentication
  * @apiParam {String} email User email
  * @apiParam {String} password User password
  * @apiParamExample {json} Input
  *  {
  *    "email":email,
  *    "password":password
  *   }
  * @apiSuccess {String} id_token Response contains key id_token to be used for Authorization for subsequent query that require Authorization
  * @apiSuccessExample {json} Success
  * HTTP/1.1 201 OK
   *  {
  *       "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDkyMzU3ODg2fQ.qFrupcgdLt0wssoON077hqqU4ONRHPBUuu9RczfSpgA",
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
    app.post('/login', authController.login);
}