const express = require("express");
const mongoose = require("mongoose");
const app = express();

const products = require('./routes/Products');
const auth = require('./routes/Auth');

const port = process.env.PORT || 5000;
const URI = process.env.DB_URI || "mongodb://localhost:27017/ims";

app.use(express.json());
app.use('/api/v1/products', products);
app.use('/api/v1/auth', auth);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Inventry management system"
  });
});

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log(`Connected to mongoose DB successfully...`)
);

app.listen(port, () => console.log(`App is listenning to port ${port}...`));
