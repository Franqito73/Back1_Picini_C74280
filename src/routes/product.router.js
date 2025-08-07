const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

const passportCall = require('../middlewares/passportCall');
const { authorization } = require('../middlewares/authoriz.middleware');

router.get('/:pid', getProductById);
router.get('/', getAllProducts);

router.post('/', passportCall('jwt'), authorization(['admin']), createProduct);
router.put('/:pid', passportCall('jwt'), authorization(['admin']), updateProduct); 
router.delete('/:pid', passportCall('jwt'), authorization(['admin']), deleteProduct);   

module.exports = router;
