const Product = require("../models/product.model");

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products", { products: products });
  } catch (error) {
    next(error);
  }
}

async function getProductDetails(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("customer/products/product-details", { product: product });
  } catch (error) {
    next(error);
  }
}

async function getSearchDetails(req, res, next) {
  try {
    const searchString = req.query.searchstring
    const products = await Product.searchProduct(searchString);
    res.render("customer/products/search-product", { products: products });
    
  } catch {
    next(error)
  }
}

module.exports = {
  getAllProducts,
  getProductDetails,
  getSearchDetails,
};
