const CartManager = require('../dao/managers/cart.manager');
const cartManager = new CartManager();

const createCart = async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);

    if (!cart) {
      return res.status(404).render('error', { message: 'Carrito no encontrado' });
    }

    res.render('cart', { cart });
  } catch (error) {
    res.status(500).render('error', { message: 'Error interno del servidor' });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    const updatedCart = await cartManager.addProduct(cid, pid, quantity);

    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.removeProduct(cid, pid);

    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
    }

    res.json({ status: 'success', message: 'Producto eliminado del carrito', payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ status: 'error', message: 'Se debe enviar un arreglo de productos' });
    }

    const updatedCart = await cartManager.updateCartProducts(cid, products);

    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', message: 'Carrito actualizado', payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ status: 'error', message: 'Cantidad inválida' });
    }

    const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);

    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
    }

    res.json({ status: 'success', message: 'Cantidad actualizada', payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const clearedCart = await cartManager.clearCart(cid);

    if (!clearedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', message: 'Carrito vaciado', payload: clearedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  clearCart
};
