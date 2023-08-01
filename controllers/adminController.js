const express = require("express");

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
};
