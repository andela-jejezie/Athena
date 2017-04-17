const express = require('express');
const {postController} = require('../controllers/post');
const {authController} = require('../auth/auth');

module.exports = app => {
    /**
  * @api {post} /api/v1/post/create create post
  * @apiGroup Post
  * @apiHeader {String} Authorization Token of authenticated user
  * @apiHeaderExample {json} Header
  *  {
  *    "token":rjefbnjnejgni3o9i609490piwjnjtrn,
  *   }
  * @apiParam {String} title Post title
  * @apiParam {String} content Body of post
  * @apiParam {String} image URL of image (can be null)
  * @apiParam {Array} tags Post Tags 
  * @apiParamExample {json} Input
  *  {
  *    "title":"created",
  *    "content":"lekwfnn;rl reklfnorj k,mernfvn krj ,vflj knr,v fjl rvkn",
  *    "tags": ["marriage", "happiness"]
  *   }
  * @apiSuccessExample {json} Success
  * HTTP/1.1 201 OK
   *  {
  *       "post": {
  *          "dislikes": 0,
  *          "likes": 0,
  *           "likers": [],
  *          "dislikers": [],
  *           "title": "created",
  *           "content": "lekwfnn;rl reklfnorj k,mernfvn krj ,vflj knr,v fjl rvkn",
  *           "tags": [
  *              "marriage",
  *              "happiness"
  *              ],
  *           "images": null,
  *           "ownerId": 1,
  *           "id": 1,
  *           "createdAt": "2017-04-16T15:43:24.716Z",
  *           "updatedAt": "2017-04-16T15:51:26.776Z"
  *         },
  *        "status": 1
  *  }
   * @apiErrorExample {json} Post error
 *    HTTP/1.1 500 Internal Server Error
  */
    app.post('/api/v1/post/create', authController.authenticate, postController.create);
    app.get('/api/v1/post/:id', postController.getPostById);
    app.get('/api/v1/posts', postController.getListOfPost);
    app.patch('/api/v1/post/:id', authController.authenticate, postController.updatePost);
    app.patch('/api/v1/post/:id/like', authController.authenticate, postController.likePost);
    app.patch('/api/v1/post/:id/dislike', authController.authenticate, postController.dislikePost);
    app.get('/api/v1/post/:tag', postController.retrievePostByTag);

    /**
 * @api {delete} /api/v1/post/:id Remove a post
 * @apiGroup Post
 * @apiParam {id} id Post id
 * @apiHeader {String} Authorization Token of authenticated user
  * @apiHeaderExample {json} Header
  *  {
  *    "token":rjefbnjnejgni3o9i609490piwjnjtrn,
  *   }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
    app.delete('/api/v1/post/:id', authController.authenticate, postController.destroyPost);
}