const { DataTypes, Model } = require('sequelize');

class Veiculo extends Model {
  static init(sequelize) {
    return super.init(
      {
        codigo: {
          type: DataTypes.STRING,
          allowNull: false
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false
        },
        carro: {
          type: DataTypes.STRING
        },
        motor: {
          type: DataTypes.STRING
        },
        ano: {
          type: DataTypes.INTEGER
        }
      },
      {
        sequelize,
        modelName: 'Veiculo'
        // Other options if needed
      }
    );
  }
}

module.exports = Veiculo;
