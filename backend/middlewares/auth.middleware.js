/**************************************/
/******** Import des modules *********/
const {verify} = require("jsonwebtoken");

/********************************************************/
/******** Vérification de la présence du token *********/
const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({error: "L'utilisateur n'est pas loggé"});

    try {
        const valideToken = verify(accessToken, "secret");

        if(valideToken) {
            return next();
        }
    } catch(err) {
        return res.json({error: err})
    }
};

module.exports = {validateToken};