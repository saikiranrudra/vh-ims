const uuid = require("uuid/v1");
const route = require("express").Router();
const Product = require("./../schema/productSchema");
const auth = require("./../middlewares/Auth");

//DISPLAY ALL PRODUCT
route.get("/", auth, async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json({
      status: "success",
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      data: { message: " Something went wrong" }
    });
  }
});

//DISLAY PRODUCT BY ID
route.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      data: { message: " Something went wrong" }
    });
  }
});

//ADD PRODUCT TO DATABASE
route.post("/", auth, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(200).json({
      status: "success",
      data: "Getting data from User : Add Product to datbase",
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      data: { message: " Something went wrong" }
    });
  }
});

//UPDATE DETAILS
route.put("/", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data: {
        product
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      data: { message: " Something went wrong" }
    });
  }
});

//DISPATCH
route.put("/dispatch", auth, async (req, res) => {
  try {
    const id = uuid();
    const result = await Product.findByIdAndUpdate(req.body.id, {
      dispatched: true,
      dispatchedID: toString(id),
      dispatchDate: Date.now()
    });

    res.status(200).json({
      status: "success",
      data: {
        result
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      data: { message: err.message }
    });
  }
});

//DELETE THE PRODUCT
route.delete("/", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.body.id);

    res.status(204).json({
      status: "success",
      data: {
        message: "Product Deleted"
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      data: { message: " Something went wrong" }
    });
  }
});

module.exports = route;
