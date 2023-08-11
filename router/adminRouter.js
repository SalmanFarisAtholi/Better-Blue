const express = require("express");
const router = express.Router();
const {
  adminLogin,
  createStand,
  getStand,
  addMatch,
  getMatch,
  addOpponent,
  getOpponent
} = require("../controllers/adminController");
const { uploadImage } = require("../middleware/multer");
// POST Methods
router.post("/createStand", createStand);
router.post("/addMatch", addMatch);
router.post("/addOpponent",uploadImage.single("logo"),addOpponent)
//GET Methods
router.get("/getStand", getStand);
router.get("/getMatch", getMatch);
router.get("/getOpponent",getOpponent)


module.exports = router;
