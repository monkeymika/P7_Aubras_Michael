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
    const {username, email, password, role} = req.body;

    const user = await Users.findOne({
        where: {
            email,
        },
      });
      if (user) {
        return res.status(409).json({
          message: 'email déja enregistré !!',
        }); 
    }

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            email: email,
            password: hash,
            role:role,
        })
        res.json("Ca marche!!");
    });
});

router.post('/login', async (req, res) => {
    const {username, password, role} = req.body;

    const user = await Users.findOne({where: {username : username}});
    
    if ( user )
    bcrypt.compare(password, user.password).then((match) => {
        if (!match)
            res.json({ error: 'combinaison utilisateur et password incorrect' });
        else {
            const accessToken = sign
            ({username: user.username, role: user.role, id: user.id }, 
                process.env.JWT_KEY
            );
            res.json({token:accessToken, username:username,role: user.role, id:user.id}); 
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

//delete user
router.delete("/deleteuser/:id", validateToken, async (req, res) => {
    const userId = req.params.id;
    const userExist = await Users.findOne({ where: { id: userId } });
  
    if (!userExist) {
      res.json({ error: "L'utilisateur n'existe pas !" });
    } else {
      await Users.destroy({
        where: {
          id: userId,
        },
      });
      res.json(`L'utilisateur numéro ${userId} à était supprimer`);
    }
  });

module.exports = router;