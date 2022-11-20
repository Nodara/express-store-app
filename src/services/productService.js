const Product = require('../db/models/product.model');
const Store = require('../db/models/store.model');
const User = require('../db/models/user.model');
const Log = require('../mongodb/models/log.model');

const getAllProducts = () => Product.findAll({
  attributes: ['title', 'price'],
  where: {
    deletedAt: null
  }
});

const deleteProductById = async ({ productId, userId }) => {
  const product = await Product.findByPk(productId);

  const store = await Store.findByPk(product.storeId);

  const user = await User.findByPk(userId);

  if (!product || product.deletedAt !== null) {
    return {
      message: 'NOT_FOUND'
    };
  }

  if (store.userId !== userId || !user.isAdmin) {
    return {
      message: 'NOT_FOUND'
    };
  }



  // update
  await Product.update({
    deletedAt: new Date(),
  }, {
    where: {
      id: productId
    }
  });

  const deletionLog = new Log({
    actionType: 'DELETED',
    userId: product.userId,
    dataType: 'PRODUCT',
  });

  await deletionLog.save();

  return {
    message: 'DELETED'
  };
};


module.exports = {
  getAllProducts,
  deleteProductById,
};