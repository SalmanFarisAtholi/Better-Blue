const express = require("express");
const router = express.Router();
const {verifyAdmin} = require("../middleware/auth");

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
  getPartner,
  addPlayer,
  getPlayer,
  addResult,
  getResult,
  getOneOpponent,
  editOpponent
} = require("../controllers/adminController");
const { uploadImage } = require("../middleware/multer");
// POST Methods
router.post("/createStand", createStand);
router.post("/addMatch", addMatch);
router.post("/addOpponent", uploadImage.single("logo"), addOpponent);
router.post("/addNews", uploadImage.single("image"), addNews);
router.post("/addPartner", uploadImage.single("logo"), addPartner);
router.post("/addPlayer", uploadImage.single("photo"), addPlayer);
router.post("/editOpponent", uploadImage.single("logo"), editOpponent);
router.post("/addResult",addResult)
//GET Methods
router.get("/getStand", getStand);
router.get("/getMatch", getMatch);
router.get("/getOpponent", getOpponent);
router.get("/getNews", getNews);
router.get("/getPartners",getPartner);
router.get("/getPlayer",getPlayer);
router.get("/getResult", getResult);
router.get("/getOneOpponent/:id",getOneOpponent)


module.exports = router;
