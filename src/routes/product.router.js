const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:pid', getProductById);
router.put('/:pid', updateProduct); 
router.delete('/:pid', deleteProduct);   

module.exports = router;
