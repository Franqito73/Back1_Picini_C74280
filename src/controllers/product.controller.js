const ProductManager = require('../dao/managers/product.manager');
const productManager = new ProductManager();

const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const result = await productManager.getProductsPaginated({ limit, page, sort, query });

    if (result.status === 'error') {
      return res.status(500).json({ status: 'error', message: result.message });
    }

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedFields = req.body;

    const updatedProduct = await productManager.updateProduct(pid, updatedFields);

    if (!updatedProduct) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.status(200).json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

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
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deleted = await productManager.deleteProduct(pid);

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
