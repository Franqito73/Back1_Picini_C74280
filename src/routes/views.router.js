const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/managers/product.manager');
const CartManager = require('../dao/managers/cart.manager');

const productManager = new ProductManager();
const cartManager = new CartManager();


router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, ...filters } = req.query;

    const { products, pagination } = await productManager.getProductsPaginated(
      parseInt(page),
      parseInt(limit),
      sort === 'asc' ? 1 : sort === 'desc' ? -1 : null,
      filters
    );

    res.render('home', {
      products,
      pagination,
    });
  } catch (error) {
    res.status(500).send('Error al cargar la vista de productos');
  }
});

router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const result = await productManager.getProductsPaginated({ limit, page, sort, query });

    if (result.status === 'error') {
      return res.status(500).render('error', { message: result.message });
    }

    res.render('products', {
      products: result.payload,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      nextPage: result.nextPage,
      prevPage: result.prevPage,
      page: result.page,
      totalPages: result.totalPages,
      sort,
      query,
      cartId: '665fb8e4e5aa72ec2fa0c91f'
    });

  } catch (error) {
    console.error("Error al renderizar la vista de productos:", error);
    res.status(500).render('error', { message: 'Error interno del servidor' });
  }
});

router.get('/products/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get('/cart/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('cart', { cart });
    console.log('Cart:', cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/cart', async (req, res) => {
  const testCartId = '665fb8e4e5aa72ec2fa0c91f'; 
  res.redirect(`/cart/${testCartId}`);
});

module.exports = router;
