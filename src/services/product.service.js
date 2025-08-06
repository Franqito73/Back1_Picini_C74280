const productRepository = require('../repositories/product.repository.js');

class ProductService {
  async getAll(queryParams) {
    return await productRepository.getProductsPaginated(queryParams);
  }

  async getById(pid) {
    return await productRepository.getProductById(pid);
  }

  async create(data) {
    return await productRepository.createProduct(data);
  }

  async update(pid, data) {
    return await productRepository.updateProduct(pid, data);
  }

  async delete(pid) {
    return await productRepository.deleteProduct(pid);
  }
}

module.exports = ProductService;
