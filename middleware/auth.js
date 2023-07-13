
const jwt = require("jsonwebtoken");

const verifyUserLogin = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed!" });
  }
};
module.exports = { verifyUserLogin };
