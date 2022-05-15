/**************************************/
/******** Import des modules *********/
const express = require("express");
const { Comments } = require("../models");
const {validateToken} = require("../middlewares/auth.middleware")

/*****************************************************/
/******** Récupération du routeur d'express *********/
const router = express.Router();

/************************************************/
/******** Routage pour les commentaires ********/
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({where: { PostId: postId }});
    res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    const userIdToken = req.user.id;

    try{
        const postedComment = await Comments.create({...req.body, UserId: userIdToken});
        res.status(201).json(postedComment.toJSON());
    }
    catch(err){
        res.status(400).json({message: 'echec'})
    }
});

router.delete("/:commentId", validateToken, async(req, res) => {
    const commentId = req.params.commentId;

    const userIdToken = req.user.id;
    const roleToken = req.user.role;

    try {
        const comment = await Comments.findByPk(commentId);
        console.log(commentId);
        if(comment.UserId != userIdToken && roleToken != "admin" ) {
            console.log(roleToken);
            console.log(userIdToken);
            console.log(comment.UserId);
            throw (" Vous n'avez pas les droits ! ")
        }
        console.log({commentId});
        await Comments.destroy({where: {
            id: commentId,
        }})
        res.json("Commentaire effacer")
        

    }  catch (error) {
        res.json(error)
    }
});

module.exports = router;