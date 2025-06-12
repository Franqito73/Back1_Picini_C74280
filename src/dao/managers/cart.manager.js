const CartModel = require ('../models/cart.model');
const ProductModel = require ('../models/product.model');

class CartManager {
  async createCart() {
    try {
      const newCart = new Cart({ products: [] });
      return await newCart.save();
    } catch (error) {
      throw new Error('Error creando carrito: ' + error.message);
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId).populate('products.product').lean();
      return cart;
    } catch (error) {
      throw new Error('Error buscando carrito: ' + error.message);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      
      if (productIndex >= 0) {
       
        cart.products[productIndex].quantity += 1;
      } else {
       
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error agregando producto al carrito: ' + error.message);
    }
  }

   async getCartByIdWithPopulate(cid) {
    try {
      const cart = await CartModel.findById(cid)
        .populate('products.product');

      return cart;
    } catch (error) {
      console.error('Error al obtener carrito con populate:', error);
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = cart.products.filter(p => p.product.toString() !== productId);

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error eliminando producto del carrito: ' + error.message);
    }
  }


  async clearCart(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error vaciando el carrito: ' + error.message);
    }
  }
}

module.exports = CartManager;
