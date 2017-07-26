"use strict";
const express = require("express");
const router = express.Router();
const log = require("log4js").getLogger("v1/decks");
const errors = require("../errors");

module.exports = router;

router.get("/", (req, res) => {
  res.json({});
});
