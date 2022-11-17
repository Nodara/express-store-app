const signale = require('signale');
const ProductService = require('../services/productService');
const { INTERNAL_SERVER_ERROR } = require('../constants');

const getAllProducts = async (req, res) => {
  const data = await ProductService.getAllProducts();
  return res.json({ data });
};



const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;



    const message = await ProductService.deleteProductById({ productId, userId: req.user.userId });

    return res.json(message);

  } catch (e) {
    signale.error('Error, reason: ', e);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }

};


module.exports = {
  getAllProducts,
  deleteProduct
};