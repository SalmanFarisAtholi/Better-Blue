const express = require("express");
const stadium = require("../models/stadium");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
module.exports = {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const adminEmail = "admin@gmail.com";
      const adminPassword = "12345678";

      if (adminEmail === email && adminPassword === password) {
        //JWT token
        const admintoken = jwt.sign(
          {
            userId: password,
            username: email,
          },
          JWT_SECRET_KEY,
          { expiresIn: "24h" }
        );

        return res.status(200).send({
          msg: "Login Successful..!",
          username: email,
          admintoken,
        });
      } else {
        console.log("hi");
        return res.status(400).send({ error: "Login Error" });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  createStand: async (req, res) => {
    const { standName, capacity, price } = req.body;
    try {
      const standExit = await stadium.findOne({ standName: standName });
      if (standExit) {
        return res
          .status(500)
          .send({ message: "stand already exists", success: false });
      } else {
        console.log("hi");
        const stand = new stadium({
          standName,
          capacity,
          price,
        });
        stand
          .save()
          .then((result) => {
            res.status(201).send({ msg: "Stand creation success" });
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getStand:async(req,res)=>{
  try {
    const stands=await stadium.find()
    return res.status(201).send(stands);

  } catch (error) {
    return res.status(500).send(error);

  }
  }
};
