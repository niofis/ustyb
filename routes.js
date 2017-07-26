"use strict";

const v1 = require("./v1");

function register(app) {
  app.use("/v1/users", v1.user);
}

module.exports = {register};
