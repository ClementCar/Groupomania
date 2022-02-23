'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.post, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId',
      });
      
      models.post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'postId',
        otherKey: 'userId',
      });

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      models.Like.belongsTo(models.post, {
        foreignKey: 'postId',
        as: 'post',
      });
      
    }
  }
  Like.init({
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};