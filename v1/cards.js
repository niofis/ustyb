"use strict";
const express = require("express");
const router = express.Router();
const log = require("log4js").getLogger("v1/decks");
const errors = require("../tools/errors");
const card = require("../models").card;
const db = require("../tools/database");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    //retrieve all cards for current deck
    var cards = await card.all(db, req.user.id, req.deck.id);
    res.json(cards);
  } catch (ex) {
    log.error(ex);
    error.internalError(res);
  }
});

router.get("/due", (req, res) => {
  errors.notImplemented(res);
});

router.get("/:id", async (req, res) => {
  try {
    var card = await card.findById(db, req.user.id, req.deck.id, req.params.id);
    res.json(card);
  } catch (ex) {
    log.error(ex);
    errors.internalError(res);
  }
});

router.post("/", async (req, res) => {
  try {
    var card = await card.insert(db, req.user.id, req.deck.id, req.body);
    res.json(card);
  } catch(ex) {
    if (ex.fail) {
      return errors.badRequest(res, ex.error);
    }
    log.error(ex);
    errors.internalError(res);
  }
});

router.delete("/:id", (req, res) => {
  errors.notImplemented(res);
});
