const CartDAO = require('../dao/cart.dao');

class CartRepository {
  async createCart() {
    return await CartDAO.createCart();
  }

  async getCartById(cid) {
    return await CartDAO.getCartById(cid);
  }

  async addProductToCart(cid, pid) {
    return await CartDAO.addProductToCart(cid, pid);
  }

  async removeProductFromCart(cid, pid) {
    return await CartDAO.removeProductFromCart(cid, pid);
  }

  async clearCart(cid) {
    return await CartDAO.clearCart(cid);
  }

  async updateCartProducts(cid, products) {
    return await CartDAO.updateCartProducts(cid, products);
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await CartDAO.updateProductQuantity(cid, pid, quantity);
  }
}

module.exports = new CartRepository();
