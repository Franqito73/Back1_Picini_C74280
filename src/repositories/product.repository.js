const ProductDAO = require('../dao/product.dao.js');
const productDAO = new ProductDAO();

class ProductRepository {
  async getProductsPaginated(params) {
    return await productDAO.getProductsPaginated(params);
  }

  async getProductById(id) {
    return await productDAO.getProductById(id);
  }

  async createProduct(data) {
    return await productDAO.addProduct(data);
  }

  async updateProduct(id, data) {
    return await productDAO.updateProduct(id, data);
  }

  async deleteProduct(id) {
    return await productDAO.deleteProduct(id);
  }
}

module.exports = new ProductRepository();
