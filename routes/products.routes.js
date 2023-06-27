const express = require('express');

const productsController = require('../controllers/products.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductDetails);

router.get('/search' , productsController.getSearchDetails)

router.get('/new-product' , productsController.getNewProduct)

router.get('/manage-product' , productsController.getManageProducts)
// post routes
router.post('/products/add-product', imageUploadMiddleware, productsController.createNewProduct);

module.exports = router;