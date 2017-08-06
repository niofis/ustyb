"use strict";
const express = require("express");
const router = express.Router();
const log = require("log4js").getLogger("v1/decks");
const errors = require("../tools/errors");
const card = require("../models").card;
const db = require("../tools/database");

module.exports = router;

router.get("/", (req, res) => {
  //retrieve all cards for current deck
  res.json([]);
});

router.use("/:id/cards", loadDeck, require("./cards"));
