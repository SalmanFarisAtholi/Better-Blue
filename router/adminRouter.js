const express = require("express");
const router = express.Router();
const {
  adminLogin,
  createStand,
  getStand,
  addMatch,
  getMatch
} = require("../controllers/adminController");
const { uploadImage } = require("../middleware/multer");
// POST Methods
router.post("/createStand", createStand);
router.post("/addMatch",uploadImage.single("logo"), addMatch);
//GET Methods
router.get("/getStand", getStand);
router.get("/getMatch", getMatch);


module.exports = router;
