'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  route.init({
    route_name: DataTypes.STRING,
    method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'route',
  });
  return route;
};