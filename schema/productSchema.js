const mongoose = require("mongoose");
const User = require("../models/Users");
const crypto = require('crypto');

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
  dispatched: {
    type: Boolean,
    required: true,
    default: false
  },
  dispatchedID: {
    type: String,
    default: null
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
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

//***Creation of admin id password execute only once */
// const salt = process.env.SALT || 'encryptsalt';
// const hash = crypto.pbkdf2Sync("admin", salt, 8, 12, 'sha256');

// const admin = new User({
//   name: "admin",
//   mobileNumber: "0000000000",
//   username: "admin",
//   password: hash,
//   role: "admin"
// });

// admin.save().then((res) => console.log(res));

module.exports = Product;
