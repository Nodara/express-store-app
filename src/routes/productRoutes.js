const router = require('express').Router();

const Product = require('../db/models/product.model');

// 
router.get('/', async (req, res) => {
  const result = await Product.findAll({
    attributes: ['title', 'price'],
    where: {
      deletedAt: null
    }
  });

  return res.json({ data: result });
});

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findByPk(productId);

  if (!product || product.deletedAt !== null) {
    return res.json({
      message: 'Product not found'
    });
  }

  // update
  await Product.update({
    deletedAt: new Date(),
  }, {
    where: {
      id: productId
    }
  });

  return res.json({
    message: 'Product Deleted Successfully'
  });

});

module.exports = router;

