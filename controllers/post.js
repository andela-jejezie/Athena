const User = require('../models').User;
var Post = require('../models').Post;
const _ = require('lodash');
const helper = require('../util/helper');
const postController = {
    create(req, res) {
        const body = _.pick(req.body, ['title', 'content', 'tags', 'images']);
        return Post
            .create({
                title:body.title,
                content:body.content,
                tags:body.tags,
                images:body.images,
                ownerId:req.user.id
            })
            .then((post) => res.status(201).send(post))
            .catch((error) => res.status(400).send(error));
    },

    getPostById(req, res) {
        return Post
            .findOne({where:{id:req.params.id}})
            .then((post) => res.status(201).send(post))
            .catch((error) => res.status(404).send(error));
    },
    getListOfPost(req, res) {
        return Post
            .findAll()
            .then((posts) => res.status(201).send({posts}))
            .catch((error) => res.status(404).send(error));
    },
    updatePost(req, res) {
        
        return Post
            .findById(req.params.id)
            .then((post) => {
                
                if(!post) {
                    return res.status(404).send({status:0, message: 'Post not found'});
                }
                console.log('ewhuheiwl');
                return post
                    .update({
                        title:req.body.title || post.title,
                        content:req.body.content || post.content,
                        tags:req.body.tags || post.tags,
                        images:req.body.images ,
                        likes:req.body.likes,
                        dislikes:req.body.dislikes,
                        likers:req.body.likers,
                        dislikers:req.body.dislikers
                    },{
                        returning: true,
                        plain:true
                    })
                    .then((updatedPost) => res.status(201).send({status:1, post:updatedPost}))
                    .catch((error) => res.status(400).send({status:0, error:error}));
            })
            .catch((error) => res.status(400).send({status:0, error:error}));
    },
    likePost(req, res) {
        let likerId = req.user.id;
        return Post
            .findById(req.params.id)
            .then((post) => {
                if(!post) {
                    return res.status(404).send({status:0, message: 'Post not found'});
                }
                var dislikers = post.dislikers;
                if(post.dislikers.includes(likerId)){
                    dislikers = helper.remove(dislikers,likerId);
                }
                var post_likers = post.likers;
                let condition = post_likers.includes(likerId);
                
                if (condition) {
                    post.decrement('likes');
                    post_likers = helper.remove(post_likers, likerId);
                }else {
                    post.increment('likes');
                    post_likers.push(likerId);
                }
                return post.update({
                    likers:post_likers,
                    dislikers:dislikers
                },
                {
                    returning: true,
                    plain:true
                }
                )
                .then((updatedPost) => res.status(200).send({status:1, post:updatedPost}))
                .catch((error) => res.status(500).send({status:0, error:error}));
            })
            .catch((error) => res.status(404).send({status:0, error:error}));
    },
    dislikePost(req, res) {
        let dislikerId = req.user.id;
        return Post
            .findById(req.params.id)
            .then((post) => {
                if(!post) {
                    return res.status(404).send({status:0, message: 'Post not found'});
                }
                var likers = post.likers;
                let isInLikers = likers.includes(dislikerId);
                console.log('here******', isInLikers);
                if(isInLikers){
                    likers = helper.remove(likers, dislikerId);
                }
                console.log('here******');
                var dislikers = post.dislikers;
                let condition = dislikers.includes(dislikerId);
                
                if (condition) {
                    post.decrement('dislikes');
                    dislikers = helper.remove(dislikers, dislikerId);
                }else {
                    post.increment('dislikes');
                    dislikers.push(dislikerId);
                }
                return post.update({
                    dislikers:dislikers,
                    likers:likers
                },{
                    returning: true,
                    plain:true
                }
                )
                .then((updatedPost) => res.status(200).send({status:1, post:updatedPost}))
                .catch((error) => res.status(500).send({status:0, error:error}));
            })
            .catch((error) => res.status(404).send({status:0, error:error}));
    },
    retrievePostByTag(req, res) {
        let tag = req.params.tag;
        Post
            .findAll({
                where:{
                    tags:{
                        $contains:[tag]
                    }
                }})
            .then((posts) => res.status(200).send({status:1, post:posts}))
            .catch((error) => res.status(500).send({status:0, error:error}));
    },
    destroyPost(req, res) {
        return Post
            .findById(req.params.id)
            .then((post) => {
                if(!post) {
                    return res.status(400).send({
                        status:0,
                        message: 'Post Not Found',
                     });
                }
                return post
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send({status:0, error:error}));
            })
    }
}

module.exports = {postController};