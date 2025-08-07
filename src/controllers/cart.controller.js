const CartService = require('../services/cart.service.js');
const ProductService = require('../services/product.service');
const TicketService = require('../services/ticket.service');
const sendSMS = require('../utils/twilio');

const cartService  = new CartService ();
const productService = new ProductService();
const ticketService = new TicketService();

const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const userEmail = req.user.email;

    const cart = await cartService.getCartById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    let totalAmount = 0;
    const productsNoStock = [];
    const productsToBuy = [];

    for (const item of cart.products) {
      const product = await productService.getById(item.product._id);
      if (!product) {
        productsNoStock.push(item.product._id);
        continue;
      }

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productService.update(product._id, { stock: product.stock });

        totalAmount += product.price * item.quantity;
        productsToBuy.push(item);
      } else {
        productsNoStock.push(item.product._id);
      }
    }

    const ticket = await ticketService.createTicket(totalAmount, userEmail);

    await cartService.updateCartProducts(cid, productsNoStock.map(pid => ({ product: pid, quantity: 1 })));
  
    const smsBody = `Compra exitosa! Ticket: ${ticket.code}. Total: $${totalAmount.toFixed(2)}. Gracias por su compra.`;
    await sendSMS(req.user.phoneNumber, smsBody);

    res.json({
      message: 'Compra procesada',
      ticket,
      productsNoStock
    });

  } catch (error) {
    console.error('Error en purchaseCart:', error);
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
};

const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    await sendSMS(process.env.TWILIO_TEST_PHONE, `Nuevo carrito creado con ID: ${newCart._id}`);

    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);

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

    const updatedCart = await cartService.addProductToCart(cid, pid, quantity);

    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartService.removeProductFromCart(cid, pid);

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

    const updatedCart = await cartService.updateCartProducts(cid, products);

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

    const updatedCart = await cartService.updateProductQuantity(cid, pid, quantity);

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
    const clearedCart = await cartService.clearCart(cid);

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
  clearCart,
  purchaseCart
};
