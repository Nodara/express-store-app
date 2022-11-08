const { Model, DataTypes } = require('sequelize');

class Region extends Model {
  static init(connection) {
    super.init({
      name: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.TIME,
        allowNull: true,
      }
    }, {
      sequelize: connection,
      tableName: 'regions',
      timestamps: true
    });
  }
}

module.exports = Region;
