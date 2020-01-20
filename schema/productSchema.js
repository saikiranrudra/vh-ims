const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: [true, "A Product must have a Name"], unique: true },
  price: { type: Number, required: [true, "A Product must have a price"] },
  purchaseDate: {
    type: Date,
    required: true,
    default:  Date.now()
  },
  dispatchDate: { type: Date, default: null},
  expiryDate: {
    type: Date,
    required: [true, "A Product must have a expiry date"]
  },
  dispatched: Boolean,
  dispatchedID: String,
  quantity: Number,
  type: String
});

const Product = mongoose.model("Product", productSchema);

/* TESTING */
// const testProduct = new Product({
// 	"productName": "Saikiran Rudra",
// 	"price": 45,
// 	"expiryDate": "2019-08-10",
// 	"quantity" : 50,
// 	"type": "food"
// });

// testProduct.save().then(doc => {
//     console.log(doc)
// });

module.exports = Product;
