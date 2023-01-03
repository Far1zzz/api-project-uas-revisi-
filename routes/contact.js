const express = require("express");
const router = express.Router();
const dataContact = require("../models/Contact");
const response = require("../config/response");

// create Data

router.post("/", async (req, res) => {
  const contactPost = new dataContact({
    name: req.body.name,
    email: req.body.email,
    pesan: req.body.pesan,
  });
  try {
    const contact = await contactPost.save();
    response(201, contact, "Post Data Success", res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const contact = await dataContact.find();
    response(201, contact, "Get Data Succes", res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/contactId", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    pesan: req.body.pesan,
  };
  try {
    const contact = await dataContact.updateOne({
      _id: req.params.contactId,
      data,
    });
    response(200, contact, "Edited Success", res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/contactId", async (req, res) => {
  try {
    const contact = await dataContact.deleteOne({ _id: req.params.contactId });
    response(200, contact, "Deleted Success", res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
