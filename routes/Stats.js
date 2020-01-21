const route = require("express").Router();
const mongoose = require("mongoose");
const Products = require("../schema/productSchema");
const auth = require("../middlewares/Auth");
/**
 * today dispached product
 * noOfexpiring products -
 * total products -
 * low stock products-
 */

const thirtyDays = 30 * 24 * 60 * 60 * 1000;

route.post("/", auth, async (req, res) => {
  try {


    const dispachedToday = await Products.find({
      dispatchDate: Date.now()
    });

    const expiringProducts = await Products.find({
      expiryDate: { $lte: (Date.now() + thirtyDays)}
    });

    const noOfProducts = await Products.count({});

    const lowStockProduct = await Products.find({
      quantity: { $lte: 10 }
    });

    res.status(200).json({
      status: "success",
      data: {
        dispachedToday: dispachedToday.length,
        expiringProducts: expiringProducts.length,
        noOfProducts: noOfProducts,
        lowStockProduct: lowStockProduct.length
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).json({
        status: "faliure",
        data: {
          error: err.message
        }
      });
    }
  }
});

module.exports = route;
