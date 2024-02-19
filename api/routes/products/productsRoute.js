const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/products/productsController');

// Define the routes for product-related operations
router.get('/', productsController.getProducts);
router.get('/category/:category', productsController.getProductsByCategory);
router.get('/topRatedProducts', productsController.getTopRatedProducts);


module.exports = router;
