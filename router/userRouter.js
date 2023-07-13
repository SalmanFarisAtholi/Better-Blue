const express = require('express')
const router = express.Router()
const { verifyUserLogin } = require("../middleware/auth");
const {register,login,verifyUser,getUser, updateUser}=require('../controllers/userController')





// POST Methods
router.post('/register',register)
router.post('/registerMail')
router.post('/authenticate')
router.post('/login',verifyUser,login)
 

// GET Methods
router.get('/user/:email',getUser)
router.get('/generateOTP')
router.get('/verifyOTP')
router.get('/createResetSession')

// PUT Methods
router.put('/updateUser',verifyUserLogin,updateUser)
router.put('/resetPassword')









module.exports= router