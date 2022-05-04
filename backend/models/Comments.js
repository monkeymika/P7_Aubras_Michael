/**********************************************************/
/****** Définition du modèle pour les commentaires *******/
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        commentBody: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
  
    return Comments;
  };