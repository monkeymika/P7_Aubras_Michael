/******* Multer : Gérer les requêtes http avec envoi de fichier *************/
// Import de multer
const multer = require('multer');

//dictionnaire de MIME TYPES
const MIME_TYPES = {
    "image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/gif": "gif",
	"image/png": "png",
};

// le destination du fichier (repertoire) et générer un nom de fichier unique
const storage = multer.diskStorage({
    // la destination de stockage du fichier
    //cb = callback
    destination:  (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        // Supprimer les espaces dans le nom du fichier
        const name = file.originalname.split(" ").join("_")// Ici si un nom de fichier contient un espace, celui-ci sera remplacé par "_"
        const extension = MIME_TYPES[file.mimetype];

        // cb(null, name + "_" + Date.now() + "." + extension);
        cb(null, `${name}_${Date.now()}.${extension}`);
    }
});

//exportation de multer
module.exports = multer({storage}).single("image"); // single autorise l'envoi d'une seule image