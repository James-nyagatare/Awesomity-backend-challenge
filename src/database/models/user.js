const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
/** Class representing a User model . */
  class User extends Model {
    /**
* @description method representing assiacitions to user model
* @param {Object} models
* @returns {object} returns associations
* @memberof User
*/
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: 'userId',
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
