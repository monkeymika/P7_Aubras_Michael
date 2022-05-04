/**************************************/
/******** Import des modules *********/
const express = require("express");
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const {sign} = require ('jsonwebtoken');
const { username } = require("../config/db.config");

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
        else {
            const accessToken = sign
            ({email: mail.email, id: mail.id }, 
                "secret"
            );
            res.json(accessToken); 
        }
    });
    else{
        res.json({ error: "User doesn't exist"})
    }
});

module.exports = router;