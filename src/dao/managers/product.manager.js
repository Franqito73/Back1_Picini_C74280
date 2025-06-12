const ProductModel = require('../models/product.model');


class ProductManager {

async getProducts() {
    try {
      return await ProductModel.find({}).lean();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
}

 async getProductsPaginated({ limit = 10, page = 1, sort, query }) {
  try{
    const filter = {};

    if (query !== undefined) {
    
      if (query === 'true' || query === 'false') {
        filter.status = query === 'true';
      } else if (typeof query === 'string' && query.trim() !== '') {
        filter.category = query.trim();
      }
    }

    
    const sortOption = {};
    if (sort === 'asc') {
      sortOption.price = 1;
    } else if (sort === 'desc') {
      sortOption.price = -1;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: Object.keys(sortOption).length ? sortOption : undefined,
      lean: true 
    };

    const result = await ProductModel.paginate(filter, options);

    return {
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
      nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null
    };
   }  catch (error) {
      console.error('Error en getProductsPaginated:', error);
      return { status: 'error', message: error.message };
    }
  }

  async getProductById(id) {
    try {
      return await ProductModel.findById(id).lean();
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      throw error;
    }
  }


  async addProduct(product) {
    try {
      return await ProductModel.create(product);
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      return await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
}

module.exports = ProductManager;
