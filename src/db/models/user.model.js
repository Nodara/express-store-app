const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      firstName: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.TIME,
        allowNull: true,
      }
    },
      {
        sequelize: connection,
        tableName: 'users',
        timestamps: true
      }
    );
  }
}

module.exports = User;
