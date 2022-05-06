/**************************************/
/******** Import des modules *********/
const express = require("express");
const { Posts, Likes } = require("../models");

const {validateToken} = require("../middlewares/auth.middleware");

/*****************************************************/
/******** Récupération du routeur d'express *********/
const router = express.Router();

/*****************************************/
/******** Routage pour les posts ********/

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({include: [Likes]});
  const likedPosts = await Likes.findAll({where: {UserId: req.user.id}})
  res.json({listOfPosts : listOfPosts, likedPosts: likedPosts });
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;