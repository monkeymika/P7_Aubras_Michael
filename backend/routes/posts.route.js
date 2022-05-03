/**************************************/
/******** Import des modules *********/
const express = require("express");
const { Posts } = require("../models");

/*****************************************************/
/******** Récupération du routeur d'express *********/
const router = express.Router();

/*****************************************/
/******** Routage pour les posts ********/

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
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