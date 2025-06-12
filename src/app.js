const express = require('express');
const cors = require('cors');
const hbs = require('express-handlebars');
const path = require('path');
const productsRouter = require('./routes/product.router');
const cartsRouter = require('./routes/cart.router');
const viewsRouter = require('./routes/views.router');

const app = express();


const handlebars = hbs.create({
  extname: '.handlebars',
  helpers: {
    multiply: (a, b) => a * b,
    calculateTotal: (products) => {
      let total = 0;
      products.forEach(item => {
        total += item.quantity * item.product.price;
      });
      return total;
    }
  }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

module.exports = app;
