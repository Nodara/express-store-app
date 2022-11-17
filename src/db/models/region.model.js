const { Model, DataTypes } = require('sequelize');

class Region extends Model {
  static init(connection) {
    super.init({
      name: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
    }, {
      sequelize: connection,
      tableName: 'regions',
      timestamps: false,
    });

  }
}

module.exports = Region;
