const process = require('process');
const signale = require('signale');
const { Sequelize } = require('sequelize');


// ------------- Models 
const Product = require('./models/product.model');
const Region = require('./models/region.model');
const Store = require('./models/store.model');
const User = require('./models/user.model');

const models = [Product, Region, Store, User];

const connection = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  },
);

(async () => {
  try {
    await connection.authenticate();
    signale.success('DB:Connect: Success ');
  } catch (error) {
    signale.error('DB:Connect: Error :', error);
  }
})();


models.map((m) => m.init(connection));


User.hasMany(Store, {
  foreignKey: {
    name: 'userId', allowNull: false,
  }
});

Store.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  }
});

Store.hasMany(Product, {
  foreignKey: {
    name: 'storeId',
    allowNull: false,
  }
});

Product.belongsTo(Store,
  {
    foreignKey: {
      name: 'storeId',
      allowNull: false,
    }
  });

Region.hasMany(Store, {
  foreignKey: {
    name: 'regionId',
    allowNull: false,
  }
});

Store.belongsTo(Region, {
  foreignKey: {
    name: 'regionId',
    allowNull: false,
  }
});


(async () => {
  await Promise.all(models.map((m) => m.sync({ force: false })));
})();

module.exports = connection;

