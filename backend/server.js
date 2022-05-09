/**************************************/
/******** Import des modules *********/
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

/**************************************/
/*** Import de la connexion à la DB */
const db = require('./models');

/**************************************/
/***** Initialisation de l'API *******/
const app = express();
app.use(cors());
app.use(express.json());

/********************************************/
/***** Import des modules de routage *******/
const postRouter = require("./routes/posts.route");
const commentsRouter = require("./routes/comments.route");
const usersRouter = require("./routes/users.route");
const likesRouter = require("./routes/likes.route");

/**************************************/
/***** Mise en place du routage *******/
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);
app.use("/likes", likesRouter);

//images
app.use("/images", express.static("./images"));

/****************************************/
/***** Start serveur *******/
db.sequelize.sync().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
  });
});