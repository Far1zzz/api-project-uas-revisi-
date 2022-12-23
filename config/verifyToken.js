const jwt = require("jsonwebtoken");
const verifiyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(400).json({
      status: res.statusCode,
      message: "Acces Denied",
    });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY); //verify
    res.user = verified;
    next(); // continue next proccess
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: "Invalid Token",
    });
  }
};

module.exports = verifiyToken;
