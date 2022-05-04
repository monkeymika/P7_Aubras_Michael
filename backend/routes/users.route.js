/**************************************/
/******** Import des modules *********/
const express = require("express");
const { Users } = require("../models");
const bcrypt = require('bcrypt');

/*****************************************************/
/******** Récupération du routeur d'express *********/
const router = express.Router();

/*****************************************/
/******** Routage pour les users ********/

router.post("/", async (req, res) => {
    const {username, email, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            email: email,
            password: hash,
        })
        res.json("Ca marche!!");
    });
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    
    const mail = await Users.findOne({where: {email : email}});
    
    if ( mail)
    bcrypt.compare(password, mail.password).then((match) => {
      if (!match)
        res.json({ error: 'Wrong Username and Password combination' });
      else res.json('You logged in!!!');
    });
    else{
        res.json({ error: "User doesn't exist"})
    }
});

module.exports = router;