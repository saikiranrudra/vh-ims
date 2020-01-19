const route = require("express").Router();
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATE_KEY || "vh-ims";

route.post("/signup", async (req, res) => {
  const user = new User({
    name: req.body.name,
    mobileNumber: req.body.phoneNumber,
    username: req.body.username,
    password: req.body.password
  });

  try {
    const data = await User.find({
      name: req.body.name,
      username: req.body.username
    });

    if (data.length !== 0) {
      throw { message: "user already existed" };
    }

    const result = await user.save();
    
    res.status(201).json({
      status: "success",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: {
        error: err.message
      }
    });
  }
});

route.post("/signin", async (req, res) => {
  try {
    const result = await User.find({
      username: req.body.username,
      password: req.body.password
    });

    if (result.length !== 0) {
      if (result[0].token === null) {
        const token = await jwt.sign(
          { id: result[0]._id, role: result[0].role },
          privateKey);
        result[0].token = token; 
        await User.updateOne({ username: result[0].username }, { token });
        }
        res.status(200).json({
          status: "success",
          data: {
            name: result[0].name,
            dataofRegistration: result[0].dataofRegistration,
            mobileNumber: result[0].mobileNumber,
            role: result[0].role,
            token: result[0].token
          }
        });
        return;
      }
      

  } catch (err) {
    res.status(500).json({
      status: "failure",
      error: err.message
    });
    return;
  }

  res.status(404).json({
    status: "failure",
    data: {
      error: "invalid username or password"
    }
  });
});


module.exports = route;
