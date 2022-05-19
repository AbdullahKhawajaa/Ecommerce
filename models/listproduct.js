const mongoose = require("mongoose");

const listproductSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      },
      image: {
        data: Buffer,
        contentType: String
      },
      date: {
        type: Date,
        default: Date.now
      }
});
 const product = mongoose.model("product", listproductSchema);

 module.exports = product;