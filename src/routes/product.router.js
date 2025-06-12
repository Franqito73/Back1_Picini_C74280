const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, getProductById } = require('../controllers/product.controller');

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:pid', getProductById);;

module.exports = router;
