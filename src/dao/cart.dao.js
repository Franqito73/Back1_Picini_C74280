const CartModel = require('../models/cart.model.js');
const ProductModel = require('../models/product.model.js');

class CartDAO {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
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

  async addProduct(cartId, productId, quantity = 1) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');
      
      const productExists = await ProductModel.findById(productId);
      if (!productExists) throw new Error('Producto no encontrado');

      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

      if (productIndex >= 0) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error agregando producto al carrito: ' + error.message);
    }
  }

  async removeProduct(cartId, productId) {
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

  async updateCartProducts(cartId, products) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = products;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error actualizando productos del carrito: ' + error.message);
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      const productInCart = cart.products.find(p => p.product.toString() === productId);
      if (!productInCart) throw new Error('Producto no encontrado en el carrito');

      productInCart.quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error modificando cantidad del producto: ' + error.message);
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

module.exports =  CartDAO;