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
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;