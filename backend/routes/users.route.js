/**************************************/
/******** Import des modules *********/
const express = require("express");
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const {sign} = require ('jsonwebtoken');
const { username } = require("../config/db.config");
const {validateToken} = require('../middlewares/auth.middleware')
const dotenv = require('dotenv');
dotenv.config();

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
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username : username}});
    
    if ( user )
    bcrypt.compare(password, user.password).then((match) => {
        if (!match)
            res.json({ error: 'combinaison utilisateur et password incorrect' });
        else {
            const accessToken = sign
            ({username: user.username, id: user.id }, 
                process.env.JWT_KEY
            );
            res.json({token:accessToken, username:username, id:user.id}); 
        }
    });
    else{
        res.json({ error: "L'utilisateur n'existe pas"})
    }
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
});

router.get('/info/:id', async (req, res) => {
    const id = req.params.id;
    const info = await Users.findByPk(id, {
        attributes: { exclude: ["password"] },
    });
    
    res.json(info);
});

module.exports = router;