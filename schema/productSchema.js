const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: [true, "A Product must have a Name"] },
  price: { type: Number, required: [true, "A Product must have a price"] },
  purchaseDate: {
    type: Date,
    required: [true, "A Product must have Purchase date"]
  },
  dispatchDate: { type: Date, required: true },
  expiryDate: {
    type: Date,
    required: [true, "A Product must have a expiry date"]
  },
  dispatched: Boolean,
  dispatchedID: Number,
  quantity: Number,
  type: String
});

const Product = mongoose.model("Product", productSchema);

/* TESTING */
// const testProduct = new Product({});
// testProduct.save().then(doc => {
//     console.log(doc)
// });

module.exports = Product;
