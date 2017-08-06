"use strict";

module.exports = {
  methodNotAllowed: res => {
    res.status(405).send("method not allowed");
  },
  internalError: res => {
    res.status(500).send("internal error");
  },
  userNotFound: res => {
    res.status(404).send("user not found");
  }
};
