const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');

class Product extends Model {
  static init(connection) {
    super.init({
      title: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.TIME,
        allowNull: true,
      }
    }, {
      sequelize: connection,
      tableName: 'products'
    });
  }
}

module.exports = Product;
