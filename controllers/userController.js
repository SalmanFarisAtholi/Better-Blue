const express = require("express");
// const router = express.Router()
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  register: async (req, res) => {
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
        const user = new userModel({
          firstName,
          lastName,
          country,
          city,
          phone,
          email,
          password: newpassword,
        });
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
        userModel.updateOne({ _id: userId }, body).then((data)=>{
         
          return res.status(201).send({ msg: "Record Updated...!" });
        })
      
      } else {
        return res.status(401).send({ error: "User Not Found...!" });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
  },
};
