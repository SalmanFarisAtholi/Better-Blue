const express = require("express");
const router = express.Router();
const stripe = require("../controllers/paymentController");

const { registerMail } = require("../controllers/mailController");
const { verifyUserLogin, localVariables } = require("../middleware/auth");
const {
  register,
  login,
  verifyUser,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  resetPassword,
  createResetSession,
  getMatch,
  getOneMatch,
  doPayment,
  getNews,
  getPartner,
  verifyPayment,
  getResult,
  getPlayer,
  getOnePlayer,
  getUserTicket
} = require("../controllers/userController");

const { adminLogin } = require("../controllers/adminController");

// POST Methods
router.post("/register", register);
router.post("/registerMail", registerMail);
router.post("/authenticate");
router.post("/login", login);
router.post("/doPayment", doPayment);
router.post("/verifyPayment", verifyPayment);
// GET Methods
router.get("/user/:email", getUser);
router.get("/generateOTP", generateOTP);
router.get("/verifyOTP", verifyOTP);
router.get("/createResetSession", createResetSession);
router.get("/getMatch", verifyUserLogin,getMatch);
router.get("/getResult", verifyUserLogin,getResult);
router.get("/getOneMatch/:id",verifyUserLogin, getOneMatch);
router.get("/getNews",verifyUserLogin, getNews);
router.get("/getPartner",verifyUserLogin, getPartner);
router.get("/getPlayer",verifyUserLogin,getPlayer);
router.get("/getOnePlayer/:id",verifyUserLogin, getOnePlayer);
router.get("/getUserTicket/:id",verifyUserLogin, getUserTicket);




// PUT Methods
router.put("/updateUser", updateUser);
router.put("/resetPassword", resetPassword);

//admin POST
router.post("/adminLogin", adminLogin);

module.exports = router;
