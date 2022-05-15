/**********************************************************/
/****** Définition du modèle pour les commentaires *******/
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    Comments.associate = (models) => {// Mise en place des relations   

      Comments.belongsTo(models.Users, {
        onDelete: "cascade",
        foreignKey: {allowNull: false} 
      }); 

      Comments.belongsTo(models.Posts, {
        onDelete: "cascade",
        foreignKey: {allowNull: false}      
      });      
    };
  
  return Comments;
};