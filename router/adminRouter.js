const express = require("express");
const router = express.Router();
const {
  adminLogin,
  createStand,
  getStand,
  addMatch,
  getMatch,
  addOpponent,
  getOpponent,
  addNews,
  getNews,
  addPartner,
  getPartner
} = require("../controllers/adminController");
const { uploadImage } = require("../middleware/multer");
// POST Methods
router.post("/createStand", createStand);
router.post("/addMatch", addMatch);
router.post("/addOpponent", uploadImage.single("logo"), addOpponent);
router.post("/addNews", uploadImage.single("image"), addNews);
router.post("/addPartner", uploadImage.single("logo"), addPartner);

//GET Methods
router.get("/getStand", getStand);
router.get("/getMatch", getMatch);
router.get("/getOpponent", getOpponent);
router.get("/getNews", getNews);
router.get("/getPartners", getPartner);

module.exports = router;
