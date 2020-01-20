const mongoose = require("mongoose");
const express = require("express");
const app = express();

const products = require("./routes/Products");
const auth = require("./routes/Auth");
const stats = require("./routes/Stats");
const port = process.env.PORT || 5000;

// const URI =
//   "mongodb+srv://vhims:vhmis@cluster0-d7vxg.mongodb.net/vhmis?retryWrites=true&w=majority";
const URI = "mongodb://localhost:27017/ims";
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/products", products);
app.use("/api/v1/stats", stats);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Inventry management system"
  });
});

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true

  })
  .then(con => console.log(`Connected to mongoose DB successfully...`))
  .catch(e => console.log("DB ERROR : ",e));

const db = mongoose.connection;

if(!db) {
  console.log("Error in Connecting DB");
}else {
  console.log("DB Connected Successfully");
}

app.listen(port, () => console.log(`App is listenning to port ${port}...`));
