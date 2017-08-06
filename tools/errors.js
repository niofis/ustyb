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
  },
  notImplemented: res => {
    res.status(500).send("not implemented");
  },
  notFound: res => {
    res.status(404).send("not found");
  },
  badRequest: (res, msg) => {
    res.status(400).send(msg);
  }
};
