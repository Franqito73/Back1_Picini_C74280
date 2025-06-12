const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cart.controller');

router.post('/', cartsController.createCart);
router.get('/:cid', cartsController.getCartById);
router.post('/:cid/product/:pid', cartsController.addProductToCart);
router.delete('/:cid/product/:pid', cartsController.removeProductFromCart);
router.delete('/:cid', cartsController.clearCart);
router.get('/cart', cartsController.getCartById);
router.put('/:cid', cartsController.updateCartProducts);
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);

module.exports = router;
