/* eslint-disable valid-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /** Class representing Todo model */
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
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
