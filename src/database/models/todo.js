const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** Class representing Todo model */
  class Todo extends Model {
    /**
* @description method representing assiacitions to todo model
* @param {Object} models
* @returns {object} returns associations
* @memberof User
*/
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'userId',
      });
    }
  }
  Todo.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
