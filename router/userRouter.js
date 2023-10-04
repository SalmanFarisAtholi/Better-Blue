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
router.post("/login", verifyUser, login);
router.post("/doPayment", doPayment);
router.post("/verifyPayment", verifyPayment);
// GET Methods
router.get("/user/:email", getUser);
router.get("/generateOTP", verifyUser, localVariables, generateOTP);
router.get("/verifyOTP", verifyOTP);
router.get("/createResetSession", createResetSession);
router.get("/getMatch", getMatch);
router.get("/getResult", getResult);
router.get("/getOneMatch/:id", getOneMatch);
router.get("/getNews", getNews);
router.get("/getPartner", getPartner);
router.get("/getPlayer", verifyUserLogin,getPlayer);
router.get("/getOnePlayer/:id", getOnePlayer);
router.get("/getUserTicket/:id", getUserTicket);




// PUT Methods
router.put("/updateUser", verifyUserLogin, updateUser);
router.put("/resetPassword", verifyUser, resetPassword);

//admin POST
router.post("/adminLogin", adminLogin);

module.exports = router;
