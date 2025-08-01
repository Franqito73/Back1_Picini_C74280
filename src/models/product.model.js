const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  thumbnail: String,
  code: { type: String, required: true, unique: true },
  stock: Number,
  category: String,
  status: { type: Boolean, default: true },
}, {
  timestamps: true,
  versionKey: false
});

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
