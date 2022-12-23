const express = require("express");
const router = express.Router();
const dataToko = require("../models/Toko");
const response = require("../config/response");
const verifiyToken = require("../config/verifyToken");

// create
router.post("/", verifiyToken, async (req, res) => {
  const tokoPost = new dataToko({
    category: req.body.category,
    codeProduk: req.body.codeProduk,
    produkName: req.body.produkName,
    brandProduk: req.body.brandProduk,
    hargaProduk: req.body.hargaProduk,
    dateIn: req.body.dateIn,
    stok: req.body.stok,
  });
  try {
    // save
    const toko = await tokoPost.save();

    // responsenya
    response(201, toko, "Post Success", res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get
router.get("/", verifiyToken, async (req, res) => {
  try {
    const toko = await dataToko.find();
    // response
    response(200, toko, "Get Data Success", res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// get by id
router.get("/:id", verifiyToken, async (req, res) => {
  try {
    const toko = await dataToko.findOne({ _id: req.params.id });

    response(200, toko, "Get Data by Id Succes", res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// put
router.put("/:tokoId", verifiyToken, async (req, res) => {
  // tampung data penginputan
  const data = {
    category: req.body.category,
    codeProduk: req.body.codeProduk,
    produkName: req.body.produkName,
    brandProduk: req.body.brandProduk,
    hargaProduk: req.body.hargaProduk,
    dateIn: req.body.dateIn,
    stok: req.body.stok,
  };
  try {
    // update data
    const toko = await dataToko.updateOne({ _id: req.params.tokoId }, data);
    response(200, toko, "Edit Data Success", res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// delete
router.delete("/:tokoId", verifiyToken, async (req, res) => {
  try {
    const toko = await dataToko.deleteOne({ _id: req.params.tokoId });
    response(200, toko, "Delete Success", res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
