const ProductDAO = require('../dao/product.dao.js');
const productDAO = new ProductDAO();

class ProductService {
  async getAll(queryParams) {
    return await productDAO.getProductsPaginated(queryParams);
  }

  async getById(pid) {
    return await productDAO.getProductById(pid);
  }

  async create(data) {
    return await productDAO.addProduct(data);
  }

  async update(pid, data) {
    return await productDAO.updateProduct(pid, data);
  }

  async delete(pid) {
    return await productDAO.deleteProduct(pid);
  }
}

module.exports = ProductService;
