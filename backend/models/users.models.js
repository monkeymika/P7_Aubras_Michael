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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "visitor",
      },
    });
  
    Users.associate = (models) => {// Mise en place des relations   
      Users.hasMany(models.Likes, {
        onDelete: "cascade",
        foreignKey: {allowNull: false}
      });

      Users.hasMany(models.Posts, {
        onDelete: "cascade",
        foreignKey: {allowNull: false}
      });

      Users.hasMany(models.Comments, {
        onDelete: "cascade",
        foreignKey: {allowNull: false}
      });      
    };

    return Users;
};