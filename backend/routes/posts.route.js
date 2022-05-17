/**************************************/
/******** Import des modules *********/
const express = require("express");
const { Posts, Likes } = require("../models");

const {validateToken} = require("../middlewares/auth.middleware");
const multer = require('../middlewares/multer.middleware');

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

router.get('/byuserId/:id', async (req, res) => {
  const id = req.params.id
  const listOfPosts = await Posts.findAll({where: {UserId: id}, include: [Likes]});
  res.json(listOfPosts);
});

router.post("/", validateToken, multer, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  post.image = req.file?.path;
  await Posts.create(post)
  res.json(post);
});

router.delete("/:postId", validateToken, async(req, res) => {
  const postId = req.params.postId;

  const userIdToken = req.user.id;
  const roleToken = req.user.role;

  try {
    const post = await Posts.findByPk(postId);
    if(post.UserId != userIdToken && roleToken != "admin") {
      console.log(roleToken);
      console.log(userIdToken);
      console.log(post.UserId);
      throw (" Vous n'avez pas les droits ! ")
      
    }  
    await Posts.destroy({where: {
      id: postId,
    }})
    res.json("Post effacer") 

  } catch (error) {
    res.json(error)
  }
});

module.exports = router;