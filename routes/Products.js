const route = require("express").Router();
const Product = require("./../schema/productSchema");

//DISPLAY ALL PRODUCT

route.get("/", async (req, res) => {
  try {
    const product = await Product.find();

    res.staus(200).json({
      status: "success",
      message: "Sending data from server : Display All product",
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Something went wrong"
    });
  }
});

//DISLAY PRODUCT BY ID
route.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Sending data from server : Display Product by id",
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: " Something weth wrong"
    });
  }
});

//ADD PRODUCT TO DATABASE
route.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(200).json({
      status: "Success",
      message: "Getting data from User : Add Product to datbase",
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: " Something weth wrong"
    });
  }
});

//UPDATE DETAILS
route.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "sucess",
      message: "Update product : *Change detail *Mark project as sell",
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: " Something weth wrong"
    });
  }
});

//DELETE THE PRODUCT
route.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      stattus: "Success",
      message: "Delete Product : Delete peoduct by id",
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: " Something weth wrong"
    });
  }
});

module.exports = route;
