const express = require("express");
const router = express.Router();
const { adminLogin ,createStand, getStand} = require("../controllers/adminController");

// POST Methods
router.post("/createStand", createStand);

//GET Methods
router.get("/getStand",getStand)

module.exports = router;
