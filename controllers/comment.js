const Post = require('../models').Post;
const Comment = require('../models').Comment;
const _ = require('lodash');

const commentController = {
    create(req, res) {
        const body = _.pick(req.body, ['content', 'image', 'postId']);
        if(!req.params.id) {
            return res.status(400).send({status:0, message:'PostId is required.'});
        }
        return Comment
            .create({
                content:body.content,
                image:body.image,
                postId:req.params.id,
                ownerId:req.user.id
            })
            .then((comment) => res.status(200).send({status:1, comment:comment}))
            .catch((error) => res.status(400).send(error));

    },
    updatedComment(req, res) {
        return Comment
            .findById(req.params.id)
            .then((comment) => {
                if(!comment) {
                    return res.status(404).send({status:0, message:'Comment not found'});
                }
                return comment
                    .update({
                        content:body.content,
                        image:body.image,
                        likes:body.likes,
                        dislikes:body.dislikes,
                        likes:body.likes,
                        dislikes:body.dislikes,
                        likers:body.likers,
                        dislikers:body.dislikers
                    },{
                        returning: true,
                        plain:true
                    })
                    .then((updatedComment) => res.status(200).send({status:1, comment:updatedComment}))
                    .catch((error) => res.status(400).send({status:0, error:error}));
            })
            .catch((error) => res.status(400).send({status:0, error:error}));
    },
    getCommentByPostId(req, res) {
        return Comment
            .findAll({where:{id:req.params.id}})
            .then((comments) => res.status(200).send({status:1, comments:comments}))
            .catch((error) => res.status(500).send({status:0, error:error}));
    },
    destroyComment(req, res) {
        return Comment
            .findById(req.params.id)
            .then((comment) => {
                if(!comment) {
                    return res.status(400).send({status:0, message:'Comment not found'});
                }
                return comment
                    .destroy()
                    .then(() => res.status(204).send({status:1}))
                    .catch((error) => res.status(400).send({status:0, error:error}));

            })
    },

     likeComment(req, res) {
        let likerId = req.user.id;
        return Comment
            .findById(req.params.id)
            .then((comment) => {
                if(!comment) {
                    return res.status(404).send({status:0, message: 'Comment not found'});
                }
                var dislikers = comment.dislikers;
                if(comment.dislikers.includes(likerId)){
                    dislikers = helper.remove(dislikers,likerId);
                }
                var likers = comment.likers;
                let condition = likers.includes(likerId);
                
                if (condition) {
                    comment.decrement('likes');
                    likers = helper.remove(likers, likerId);
                }else {
                    comment.increment('likes');
                    likers.push(likerId);
                }
                return comment.update({
                    likers:likers,
                    dislikers:dislikers
                },{
                    returning: true,
                    plain:true
                })
                .then((updatedComment) => res.status(200).send({status:1, post:updatedComment}))
                .catch((error) => res.status(500).send({status:0, error:error}));
            })
            .catch((error) => res.status(404).send({status:0, error:error}));
    },
    dislikeComment(req, res) {
        let dislikerId = req.user.id;
        return Comment
            .findById(req.params.id)
            .then((comment) => {
                if(!comment) {
                    return res.status(404).send({status:0, message: 'Comment not found'});
                }

                var likers = comment.likers;
                let isInLikers = likers.includes(dislikerId);
                if(isInLikers){
                    likers = helper.remove(likers, dislikerId);
                }
                var dislikers = comment.dislikers;
                let condition = dislikers.includes(dislikerId);
                
                if (condition) {
                    comment.decrement('dislikes');
                    dislikers = helper.remove(dislikers, dislikerId);
                }else {
                    comment.increment('dislikes');
                    dislikers.push(dislikerId);
                }
                return comment.update({
                    dislikers:dislikers,
                    likers:likers
                },{
                    returning: true,
                    plain:true
                })
                .then((updatedComment) => res.status(200).send({status:1, post:updatedComment}))
                .catch((error) => res.status(500).send({status:0, error:error}));
            })
            .catch((error) => res.status(404).send({status:0, error:error}));
    },





}

module.exports = {commentController};