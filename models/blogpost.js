'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blogPost.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    postImage: DataTypes.STRING,
    content: DataTypes.STRING,
    commentId: DataTypes.INTEGER,
    cloudUrl: DataTypes.STRING,
    cloudId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blogPost',
  });
  return blogPost;
};