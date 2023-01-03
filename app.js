const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("SELAMAT DATANG DI API SEDERHANA, By FAR1Z");
});

// import routenya
const routesToko = require("./routes/toko");
const authRoutes = require("./routes/auth");
const contactRoute = require("./routes/contact");

// daftar Mildware ke express
app.use("/admToko", routesToko);
app.use("/auth", authRoutes);
app.use("/contact", contactRoute);

// koneksi kedatabase mongo
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let riz = mongoose.connection;

// erorr message
riz.on("error", console.error.bind(console, "error detected"));

// success message
riz.once("open", () => {
  console.log("Connected");
});

app.listen(process.env.PORT, () => {
  console.log(`localHost Run on ${process.env.PORT}`);
});
