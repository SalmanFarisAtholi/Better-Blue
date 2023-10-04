const express = require("express");
const stadium = require("../models/stadium");
const fixture = require("../models/fixtures");
const Opponent = require("../models/opponent");
const partner = require("../models/partner");
const player = require("../models/player");
const result = require("../models/result");

const jwt = require("jsonwebtoken");
const News = require("../models/news");
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
    console.log(req.headers);
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
  editOpponent: async (req, res) => {
    try {
      const id = req.body.id;
      // console.log(id);
      const opponent = {
        name: req.body.name,
        shortName: req.body.shortName,
        logo: req.file.filename,
        totalMatch: req.body.totalMatch,
        win: req.body.win,
        draw: req.body.draw,
      };
      await Opponent.findByIdAndUpdate(id, opponent).then((data) => {
        return res.status(201).send({ msg: " Updated...!" });
      });
    } catch (error) {
      return res.status(401).send({ error });
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
  addNews: async (req, res) => {
    try {
      const news = new News({
        headline: req.body.headline,
        description: req.body.description,
        image: req.file.filename,
      });
      news.save().then(() => {
        res.status(201).send({ msg: "News Added Successfully" });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getNews: async (req, res) => {
    try {
      const news = await News.find().limit(3);
      return res.status(201).send(news);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addPartner: async (req, res) => {
    try {
      const newPartner = new partner({
        name: req.body.name,
        place: req.body.place,
        link: req.body.link,
        logo: req.file.filename,
        date: Date.now(),
      });
      newPartner.save().then(() => {
        res.status(201).send({ msg: "Partner Added Successfully" });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getPartner: async (req, res) => {
    try {
      const partners = await partner.find();
      return res.status(201).send(partners);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addPlayer: async (req, res) => {
    try {
      console.log(req.body);
      const newPlayer = new player({
        name: req.body.name,
        number: req.body.number,
        place: req.body.pob,
        DOB: req.body.dob,
        nationality: req.body.nationality,
        photo: req.file.filename,
        position: req.body.position,
        link: req.body.link,
      });
      newPlayer.save().then(() => {
        res.status(201).send({ msg: "Player Added Successfully" });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getPlayer: async (req, res) => {
    try {
      const players = await player.find();
      return res.status(201).send(players);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getResult: async (req, res) => {
    try {
      const results = await result
        .find()
        .populate({
          path: "match",
          populate: {
            path: "opponentId",
            model: "opponent",
          },
        })
        .sort({ createdAt: -1 })
        .limit(4);

      return res.status(201).send(results);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addResult: async (req, res) => {
    try {
      console.log(req.body);
      const matchId = req.body.values.match;
      const newResult = new result({
        ballPosition: req.body.values.ballPosition,
        match: req.body.values.match,
        result: req.body.values.result,
        scored: req.body.values.scored,
        link: req.body.values.link,
        conceded: req.body.values.conceded,
        ourShots: req.body.values.ourShots,
        thereShots: req.body.values.thereShots,
        ourTarget: req.body.values.ourTarget,
        thereTarget: req.body.values.thereTarget,
        ourCorner: req.body.values.ourCorner,
        thereCorner: req.body.values.thereCorner,
        ourFoules: req.body.values.ourFoules,
        thereFoules: req.body.values.thereFoules,
        goals: req.body.goals,
      });
      newResult.save().then(() => {
        fixture.updateOne({ _id: matchId }, { access: false }).then(() => {
          player.updateMany({}, { $inc: { totalMatch: 1 } }).then(() => {
            res.status(201).send({ msg: "Result Added Successfully" });
          });
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getOneOpponent: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const match = await opponent.findById(id);
      return res.status(201).send(match);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
