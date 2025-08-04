const ProductService = require('../services/product.service.js');
const productService = new ProductService();

const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAll(req.query);

    if (result.status === 'error') {
      return res.status(500).json({ status: 'error', message: result.message });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.pid);

    if (!product) {
      return res.status(404).render('error', { message: 'Producto no encontrado' });
    }

    const cartId = req.session?.cartId || null;
    res.render('productDetail', { product, cartId });
  } catch (error) {
    res.status(500).render('error', { message: 'Error interno' });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.create(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.update(req.params.pid, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.status(200).json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.delete(req.params.pid);

    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
