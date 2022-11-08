const { Model, DataTypes } = require('sequelize');

class Store extends Model {
  static init(connection) {
    super.init({
      address: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.TIME,
        allowNull: true,
      }
    }, {
      sequelize: connection,
      tableName: 'stores',
      timestamps: true
    });
  }
}

module.exports = Store;
