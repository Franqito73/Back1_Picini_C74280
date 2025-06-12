const CartManager = require('../dao/managers/cart.manager');
const cartManager = new CartManager();

async function createCart(req, res) {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCartById (req, res) {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate('products.product').lean();

    if (!cart) {
      return res.status(404).render('error', { message: 'Carrito no encontrado' });
    }

    res.render('cart', { cart });
  } catch (error) {
    res.status(500).render('error', { message: 'Error interno del servidor' });
  }
};

async function addProductToCart (req, res) {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    const updatedCart = await cartManager.addProduct(cid, pid, quantity);

    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

async function removeProductFromCart (req, res) {
  try {
    const { cid, pid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);

    await cart.save();

    res.json({ status: 'success', message: 'Producto eliminado del carrito', payload: cart });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar producto del carrito' });
  }
}

async function updateCartProducts (req, res) {
  try {
    const { cid } = req.params;
    const products = req.body.products;

    if (!Array.isArray(products)) {
      return res.status(400).json({ status: 'error', message: 'Se debe enviar un arreglo de productos' });
    }

    const cart = await CartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = products;
    await cart.save();

    res.json({ status: 'success', message: 'Carrito actualizado', payload: cart });
  } catch (error) {
    console.error('Error al actualizar productos del carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al actualizar carrito' });
  }
};

async function updateProductQuantity(req, res) {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ status: 'error', message: 'Cantidad inválida' });
    }

    const cart = await CartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (!productInCart) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }

    productInCart.quantity = quantity;
    await cart.save();

    res.json({ status: 'success', message: 'Cantidad actualizada', payload: cart });
  } catch (error) {
    console.error('Error al modificar cantidad del producto:', error);
    res.status(500).json({ status: 'error', message: 'Error al modificar cantidad del producto' });
  }
};

async function clearCart(req, res) {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();

    res.json({ status: 'success', message: 'Carrito vaciado', payload: cart });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al vaciar el carrito' });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  updateProductQuantity,
  updateCartProducts
};
