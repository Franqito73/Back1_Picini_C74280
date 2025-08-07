const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cart.controller');
const passportCall = require('../middlewares/passportCall');
const { authorization, authorizeUser } = require('../middlewares/authoriz.middleware');
const passport = require('passport');

router.post('/',passportCall('jwt'), cartsController.createCart);
router.get('/:cid',passportCall('jwt'), cartsController.getCartById);

router.post('/:cid/products/:pid', passportCall('jwt'), authorization(['user']), cartsController.addProductToCart);

router.delete('/:cid/products/:pid',passportCall('jwt'), cartsController.removeProductFromCart);
router.delete('/:cid',passportCall('jwt'), cartsController.clearCart);
router.put('/:cid',passportCall('jwt'), cartsController.updateCartProducts);
router.put('/:cid/products/:pid',passportCall('jwt'), cartsController.updateProductQuantity);

router.post('/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorizeUser,
  cartsController.purchaseCart
);

module.exports = router;
