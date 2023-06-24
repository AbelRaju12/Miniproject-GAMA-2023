const express = require('express');

const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductDetails);

router.get('/search' , productsController.getSearchDetails)

module.exports = router;