/**************************************/
/******** Import des modules *********/
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

/**************************************/
/***** Initialisation de l'API *******/
const app = express();
app.use(cors());
app.use(express.json());


const db = require('./models');

/********************************************/
/***** Import des modules de routage *******/
const postRouter = require("./routes/posts.route");

/**************************************/
/***** Mise en place du routage *******/
app.use("/posts", postRouter);


/****************************************/
/***** Start serveur avec test DB*******/
db.sequelize.sync().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
  });
});