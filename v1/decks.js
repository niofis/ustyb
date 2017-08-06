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
    var decks = await decl.all(db.req.user.id);
    res.json(decks);
  } catch (ex) {
    log.error(ex);
    return errors.internalError(res);
  }
});

router.post("/", async (req, res) => {
  try {
    var deck = await deck.insert(db, req.user.id, req.body);
    res.json(deck);
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
    var deck = await deck.findById(db, req.user.id, deck_id);
    if (!deck) {
      return errors.notFound(res);
    }
    req.deck = deck;
    next();
  } catch (ex) {
    log.error(ex);
    errors.internalError(res);
  }
}

router.use("/:id/cards", loadDeck, require("./cards"));
