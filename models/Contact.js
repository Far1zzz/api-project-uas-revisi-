const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  pesan: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
