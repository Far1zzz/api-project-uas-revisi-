const mongoose = require("mongoose");

const tokoSchema = mongoose.Schema({
  // data schema
  category: {
    type: String,
    require: true,
  },
  codeProduk: {
    type: String,
    require: true,
  },
  produkName: {
    type: String,
    require: true,
  },
  brandProduk: {
    type: String,
    require: true,
  },
  hargaProduk: {
    type: Number,
    require: true,
  },
  dateIn: {
    type: String,
    require: true,
  },
  stok: {
    type: Number,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Toko", tokoSchema);
