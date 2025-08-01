const CartDAO = require('../dao/cart.dao.js');
const cartDAO = new CartDAO();

class CartService {
  async createCart() {
    return await cartDAO.createCart();
  }

  async getCartById(cid) {
    return await cartDAO.getCartById(cid);
  }

  async addProductToCart(cid, pid, quantity) {
    return await cartDAO.addProduct(cid, pid, quantity);
  }

  async removeProductFromCart(cid, pid) {
    return await cartDAO.removeProduct(cid, pid);
  }

  async updateCartProducts(cid, products) {
    return await cartDAO.updateCartProducts(cid, products);
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await cartDAO.updateProductQuantity(cid, pid, quantity);
  }

  async clearCart(cid) {
    return await cartDAO.clearCart(cid);
  }
}

module.exports = new CartService();
