/***************************************************/
/****** Définition du modèle pour les posts *******/
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Posts.associate = (models) => {// Mise en place des relations
      Posts.hasMany(models.Comments, {
        onDelete: "cascade",
      });
    };

    return Posts;
  };