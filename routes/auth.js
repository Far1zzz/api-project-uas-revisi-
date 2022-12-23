// router post register dan login
// import pckage

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import models
const User = require("../models/User");

// import Validation
const { registerValidation, loginValidation } = require("../config/validation");
const { use } = require("./toko");

// register
router.post("/register", async (req, res) => {
  // data req.body divalidasi
  const { error } = registerValidation(req.body);
  // jika req.body Tidak Valid, masukkan response 400 dan tampilkan message
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });

  // findOne menemukan dokumen user berdasarkan email
  const emailExist = await User.findOne({ email: req.body.email });
  //   jika req.body.email ditemukan di dokumen user,
  // maka beri response 400 dan message emaul sudah digunakan user yang sudah terdaftar
  //  maka input email lain yang belum terdaftar dari postman / frontEnd
  if (emailExist)
    return res.status(400).json({
      status: res.statusCode,
      message: "Email Sudah Terdaftar",
    });

  // jika req.body berhasil divalidasi, dan email belum terdaftar,
  // lakukan hashing password
  const salt = await bcrypt.genSalt(10); // menambahkan data unik
  const hashPassword = await bcrypt.hash(req.body.password, salt); //hash password

  //   tampung data req.body di const user
  const user = new User({
    nama: req.body.nama,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    // simpan data user ke database mongoDB
    const saveUser = await user.save();
    // kirim response
    res.status(201).json({
      status: res.statusCode,
      message: "Register Succes",
      data: saveUser,
    });
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Registrasi Failed",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });

  // email Exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      status: res.statusCode,
      message: "Email kamu tidak terdaftar",
    });

  // password check
  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd)
    return res.status(400).json({
      status: res.statusCode,
      message: "Password Kamu Salah",
    });

  // Membuat Token JWT dari user._id dan secret Key
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  // kirim repsonse header Authorization
  // Authorization ini akan digunakan ketika ingin mengakses API yang membutuhkan token untuk mengaksesnya
  res.header("Authorization", token).json({
    token: token,
    data: user,
  });
});

module.exports = router;
