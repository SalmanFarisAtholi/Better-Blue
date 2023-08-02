const express = require("express");
// const router = express.Router()
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const otpGenerator = require("otp-generator");

module.exports = {
  register: async (req, res) => {
    // console.log(req.body);
    try {
      const {
        firstName,
        lastName,
        country,
        city,
        phone,
        email,
        password,
        confirmpassword,
      } = req.body;
      const userExist = await userModel.findOne({ email: email });

      if (userExist) {
        return res
          .status(500)
          .send({ message: "user already exists", success: false });
      } else {
        const newpassword = await bcrypt.hash(password, 10);
        // console.log(newpassword);
        const user = new userModel({
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          country,
          city,
          phone: req.body.mobile,
          email,
          password: newpassword,
        });
        // console.log(user);
        user
          .save()
          .then((result) =>
            res.status(201).send({ msg: "User register success" })
          )
          .catch((error) => res.status(500).send(error));
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  // Middleware
  verifyUser: async (req, res, next) => {
    try {
      const { email } = req.method == "GET" ? req.query : req.body;
      let exist = await userModel.findOne({ email });
      if (!exist) return res.status(404).send({ error: "Cant find User!" });
      next();
    } catch (error) {
      return res.status(404).send({ error: "Authentication Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      userModel
        .findOne({ email })
        .then((user) => {
          bcrypt
            .compare(password, user.password)
            .then((passwordCheck) => {
              if (!passwordCheck)
                return res.status(400).send({ error: "Don't have Password" });

              //JWT token
              const token = jwt.sign(
                {
                  userId: user._id,
                  username: user.firstName,
                },
                JWT_SECRET_KEY,
                { expiresIn: "24h" }
              );

              return res.status(200).send({
                msg: "Login Successful..!",
                username: user.firstName,
                token,
              });
            })
            .catch((error) => {
              return res.status(400).send({ error: "Password not match" });
            });
        })
        .catch((error) => {
          return res.status(400).send({ error: "User not Found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getUser: async (req, res) => {
    try {
      const { email } = req.params;
      console.log(email);
      if (!email) return res.status(404).send({ error: "Invalid User" });
      const user = userModel.find({ phone: 5644145521 });

      console.log(user);
      if (err) return res.status(500).send({ err });
      if (!user) return res.status(501).send({ error: "Can't Find User" });

      //  remove password
      const { password, ...rest } = Object.assign({}, user.toJSON());
      return res.status(201).send(rest);
    } catch (error) {
      return res.status(404).send({ error: "Can't Find User Data" });
    }
  },
  updateUser: async (req, res) => {
    try {
      // const id = req.query.id;
      const { userId } = req.user;

      if (userId) {
        const body = req.body;

        // update the data
        userModel.updateOne({ _id: userId }, body).then((data) => {
          return res.status(201).send({ msg: "Record Updated...!" });
        });
      } else {
        return res.status(401).send({ error: "User Not Found...!" });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
  },
  generateOTP: async (req, res) => {
    req.app.locals.OTP = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    res.status(201).send({ code: req.app.locals.OTP });
  },

  verifyOTP: async (req, res) => {
    const { code } = req.query;
    const otp = 793261;
    // if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    //   req.app.locals.OTP = null; // reset the OTP value
    //   req.app.locals.resetSession = true; // start session for reset password
    //   return res.status(201).send({ msg: "Verify Successsfully!" });
    // }

    // if (code===otp) {
    //   console.log(otp);
    return res.status(201).send({ msg: "Verify Successsfully!" });
    // }
    return res.status(400).send({ error: "Invalid OTP" });
  },
  createResetSession: async (req, res) => {
    if (req.app.locals.resetSession) {
      return res.status(201).send({ msg: "Access" });
    }
    return res.status(440).send({ error: "Session expired!" });
  },
  resetPassword: async (req, res) => {
    try {
      if (!req.app.locals.resetSession)
        return res.status(440).send({ error: "Session expired!" });

      const { email, password } = req.body;

      try {
        userModel
          .findOne({ email })
          .then((user) => {
            bcrypt
              .hash(password, 10)
              .then((hashedPassword) => {
                userModel
                  .updateOne(
                    { email: user.email },
                    { password: hashedPassword }
                  )
                  .then((data) => {
                    req.app.locals.resetSession = false; // reset session
                    return res.status(201).send({ msg: "Record Updated...!" });
                  })
                  .catch((err) => {
                    if (err) throw err;
                  });
              })
              .catch((e) => {
                return res.status(500).send({
                  error: "Enable to hashed password",
                });
              });
          })
          .catch((error) => {
            return res.status(404).send({ error: "Username not Found" });
          });
      } catch (error) {
        return res.status(500).send({ error });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
  },
};
