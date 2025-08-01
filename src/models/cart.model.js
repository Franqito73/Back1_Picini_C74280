const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productInCartSchema = new mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new Schema({
  products: [productInCartSchema]
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;