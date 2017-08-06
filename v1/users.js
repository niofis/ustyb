"use strict";

const express = require("express");
const router = express.Router();
const log = require("log4js").getLogger("v1/users");
const errors = require("../tools/errors");
const user = require("../models").user;
const db = require("../tools/database");

module.exports = router;

router.get("/", (req, res) => {
  user.all(db).then(users => {
    res.json(users);
  }).catch(ex => {
    log.error(ex);
    errors.internalError(res);
  });
});

router.post("/", (req, res) => {
  user.insert(db, req.body).then(usr => {
    res.json(usr);
  }).catch(ex => {
    log.error(ex);
    errors.internalError(res);
  });
});

function loadUser(req, res, next) {
  var id = req.params.id;
  user.findById(db, id).then(usr => {
    if (!usr) {
      return errors.userNotFound(res);
    }
    req.user = usr;
    next();
  }).catch(ex => {
    log.error(ex);
    errors.internalError(res);
  });
}

router.get("/:id", loadUser, (req, res) => {
  res.json(req.user);
});


router.use("/:id/decks", loadUser, require("./decks"));
