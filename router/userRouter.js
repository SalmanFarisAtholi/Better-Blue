const express = require("express");
const router = express.Router();
const { sendEmailOTP, registerMail } = require("../controllers/mailController");
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
} = require("../controllers/userController");

const { adminLogin } = require("../controllers/adminController");

// POST Methods
router.post("/register", register);
router.post("/registerMail", registerMail);
router.post("/authenticate");
router.post("/login", verifyUser, login);

// GET Methods
router.get("/user/:email", getUser);
router.get("/generateOTP", verifyUser, localVariables, generateOTP);
router.get("/verifyOTP", verifyOTP);
router.get("/createResetSession", createResetSession);

// PUT Methods
router.put("/updateUser", verifyUserLogin, updateUser);
router.put("/resetPassword", verifyUser, resetPassword);

//admin POST
router.post("/adminLogin", adminLogin);

module.exports = router;
