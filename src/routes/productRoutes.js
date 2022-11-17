const router = require('express').Router();

const ProductController = require('../controllers/productController');

router.get('/', ProductController.getAllProducts);

router.delete('/:productId', ProductController.deleteProduct);

module.exports = router;

