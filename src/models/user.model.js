const mongoose = require('mongoose');
const CartManager = require ('../dao/cart.dao.js');

const cartManager =new CartManager();

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpire: {
    type: Date,
    required: false
  },
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  try{
    if (!this.cart) {
    const newCart = await cartManager.createCart();
    console.log('Nuevo carrito creado:', newCart);
    this.cart = newCart._id;
  }
  next();
  }catch(error){
    next(error)
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
