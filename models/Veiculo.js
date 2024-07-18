'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Veiculo extends Model {
    static associate(models) {
      // define association here
    }
  }

  Veiculo.init({
    codigo: DataTypes.STRING,
    nome: DataTypes.STRING,
    carro: DataTypes.STRING,
    motor: DataTypes.STRING,
    ano: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Veiculo',
  });

  return Veiculo;
};
