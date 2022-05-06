/**********************************************************/
/****** Définition du modèle pour les utilisateurs *******/
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Users.associate = (models) => {// Mise en place des relations   
      Users.hasMany(models.Likes, {
        onDelete: "cascade",
      });      
    };

    return Users;
  };