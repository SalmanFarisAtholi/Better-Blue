const express = require("express");
const stadium = require("../models/stadium");
const fixture = require("../models/fixtures");
const Opponent = require("../models/opponent");
const jwt = require("jsonwebtoken");
const opponent = require("../models/opponent");
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
  getStand: async (req, res) => {
    try {
      const stands = await stadium.find();
      return res.status(201).send(stands);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addMatch: async (req, res) => {
    console.log(req.body);
    const opponentId = req.body.formData.opponent;
    try {
      // const matchExits = fixture.findOne({ matchTime: matchTime });
      // console.log(matchExits);
      const opponent = await Opponent.findById(opponentId);
      // const win = opponent.win;
      // const totalMatch = opponent.totalMatch;
      const win = 10;
      const totalMatch = 15;
      const winningPercentage = Math.floor((win / totalMatch) * 100);

      const match = new fixture({
        opponentId: req.body.formData.opponent,
        matchTime: req.body.formData.matchTime,
        matchType: req.body.formData.matchType,
        winProbability: winningPercentage,
        home: req.body.formData.home,
      });
      match
        .save()
        .then((result) => {
          res.status(201).send({ msg: "Match creation success" });
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getMatch: async (req, res) => {
    try {
      const fixtures = await fixture
        .find({ access: true })
        .populate("opponentId");

      return res.status(201).send(fixtures);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addOpponent: async (req, res) => {
    try {
      const opponent = new Opponent({
        name: req.body.name,
        shortName: req.body.shortName,
        logo: req.file.filename,
        totalMatch: req.body.totalMatch,
        win: req.body.win,
        draw: req.body.draw,
      });
      opponent
        .save()
        .then((result) => {
          res.status(201).send({ msg: "Opponent creation success" });
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getOpponent: async (req, res) => {
    try {
      const opponents = await Opponent.find();
      return res.status(201).send(opponents);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
