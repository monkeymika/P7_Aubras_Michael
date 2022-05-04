/**************************************/
/******** Import des modules *********/
const {verify} = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


/********************************************************/
/******** Vérification de la présence du token *********/
const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({error: "L'utilisateur n'est pas loggé"});

    try {
        const validToken = verify(accessToken, process.env.JWT_KEY);
        req.user = validToken;

        if(validToken) {
            return next();
        }
    } catch(err) {
        return res.json({error: err})
    }
};

module.exports = {validateToken};