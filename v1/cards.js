"use strict";
const express = require("express");
const router = express.Router();
const log = require("log4js").getLogger("v1/decks");
const moment = require("moment");
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
    errors.internalError(res);
  }
});

function dueCards(user_id, deck_id) {
  return new Promise(async (resolve, reject) => {
    try {
      var cards = await card.all(db, user_id, deck_id);
      var now = moment().unix();
      var due = cards.filter(c => {
        return (now - c.nextStudy) > 0;
      });
      resolve(due);
    } catch (ex) {
      reject(ex);
    }
  });
}

router.get("/due", async (req, res) => {
  try {
    var due = await dueCards(req.user.id, req.deck.id);
    res.json(due);
  } catch (ex) {
    log.error(ex);
    errors.internalError(res);
  }
});

router.get("/due/next", async (req, res) => {
  try {
    var due = await dueCards(req.user.id, req.deck.id);
    var id = Math.floor(Math.random() * due.length);
    var next = due[id];
    res.json(next);
  } catch (ex) {
    log.error(ex);
    errors.internalError(ex);
  }
});

router.get("/:id", async (req, res) => {
  try {
    var cd = await card.findById(db, req.user.id, req.deck.id, req.params.id);
    res.json(cd);
  } catch (ex) {
    log.error(ex);
    errors.internalError(res);
  }
});

router.post("/", async (req, res) => {
  try {
    var cd = await card.insert(db, req.user.id, req.deck.id, req.body);
    res.json(cd);
  } catch(ex) {
    if (ex.fail) {
      return errors.badRequest(res, ex.error);
    }
    log.error(ex);
    errors.internalError(res);
  }
});

router.put("/:id/answer", async (req, res) => {
  try {
    console.log(req.body);
    var cd = await card.answer(db, req.user.id, req.deck.id, req.params.id, req.body.difficulty);
    res.json(cd);
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
