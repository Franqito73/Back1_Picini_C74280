const express = require('express');
const cors = require('cors');
const hbs = require('express-handlebars');
const path = require('path');
const productsRouter = require('./routes/product.router');
const cartsRouter = require('./routes/cart.router.js');
const viewsRouter = require('./routes/views.router.js');
const sessionRouter = require('./routes/session.router.js');
const passport = require('./config/passport-jwt.config');
const testRoutes = require('./routes/test.router.js');
const errorHandler = require('./middlewares/errorHandler');
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
    },
    calcSubtotal: (quantity, price) => quantity * price 
  }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
app.use('/', viewsRouter);
app.use('/api/sessions', sessionRouter);

app.use('/test', testRoutes);

app.use(errorHandler);

module.exports = app;
