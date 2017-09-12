"use strict";
const express = require("express");
const router = express.Router();
const log = require("log4js").getLogger("v1/decks");
const errors = require("../tools/errors");
const deck = require("../models").deck;
const db = require("../tools/database");

module.exports = router;

router.get("/",async (req, res) => {
  try {
    //retrieve all decks for current user
    var decks = await deck.all(db, req.user.id);
    res.json(decks);
  } catch (ex) {
    log.error(ex);
    return errors.internalError(res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    var dk = await deck.findById(db, req.user.id, req.params.id);
    res.json(dk);
  } catch (ex) {
    log.error(ex);
    errors.internalError(res);
  }
});

router.post("/", async (req, res) => {
  try {
    var ndeck = await deck.insert(db, req.user.id, req.body);
    res.json(ndeck);
  } catch (ex) {
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

router.patch("/:id", (req, res) => {
  errors.notImplemented(res);
});

async function loadDeck(req, res, next) {
  try {
    var deck_id = req.params.id;
    var dk = await deck.findById(db, req.user.id, deck_id);
    if (!dk) {
      return errors.notFound(res);
    }
    req.deck = dk;
    next();
  } catch (ex) {
    log.error(ex);
    errors.internalError(res);
  }
}

router.use("/:id/cards", loadDeck, require("./cards"));
