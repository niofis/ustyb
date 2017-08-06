"use strict";
const express = require("express");
const router = express.Router();
const log = require("log4js").getLogger("v1/decks");
const errors = require("../tools/errors");
const deck = require("../models").deck;
const db = require("../tools/database");

module.exports = router;

router.get("/", (req, res) => {
  //retrieve all decks for current user
  res.json({});
});

router.use("/:id/cards", loadDeck, require("./cards"));
