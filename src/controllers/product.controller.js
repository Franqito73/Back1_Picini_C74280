const ProductManager = require('../dao/managers/product.manager');
const productManager = new ProductManager();

const getAllProducts = async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({ status: 'success', payload: products });
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

module.exports = {
  getAllProducts,
  createProduct,
  getProductById
};
