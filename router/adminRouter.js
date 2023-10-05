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
  editOpponent,
  playerUpdate
} = require("../controllers/adminController");
const { uploadImage } = require("../middleware/multer");
// POST Methods
router.post("/createStand",verifyAdmin, createStand);
router.post("/addMatch", verifyAdmin,addMatch);
router.post("/addOpponent",verifyAdmin, uploadImage.single("logo"), addOpponent);
router.post("/addNews",verifyAdmin, uploadImage.single("image"), addNews);
router.post("/addPartner",verifyAdmin, uploadImage.single("logo"), addPartner);
router.post("/addPlayer", verifyAdmin,uploadImage.single("photo"), addPlayer);
router.post("/editOpponent",verifyAdmin, uploadImage.single("logo"), editOpponent);
router.post("/addResult",verifyAdmin,addResult)
router.post("/playerUpdate",verifyAdmin,playerUpdate)

//GET Methods
router.get("/getStand", verifyAdmin,getStand);
router.get("/getMatch",verifyAdmin, getMatch);
router.get("/getOpponent",verifyAdmin, getOpponent);
router.get("/getNews",verifyAdmin, getNews);
router.get("/getPartners",verifyAdmin,getPartner);
router.get("/getPlayer",verifyAdmin,getPlayer);
router.get("/getResult",verifyAdmin, getResult);
router.get("/getOneOpponent/:id",verifyAdmin,getOneOpponent)


module.exports = router;
