"use strict";
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const cors = require("cors");
const log4js = require('log4js');
const log = log4js.getLogger();
log.level = 'debug';

function start() {
  var app = express();
  app.use(cors());
  app.use(compress());
  app.use(logger("dev"));
  app.use(bodyParser.json({limit: "500mb"}));
  app.use(bodyParser.urlencoded({extended: false, limit: "500mb"}));
  app.use(cookieParser("iDxbZRIHysxnBXsHTHlWhB7VDYwhDSt5"));

  var routes = require("./routes");
  routes.register(app);
  app.set("port", process.env.PORT || 3000);
  var server = app.listen(app.get("port"), () => {
    console.log(`USTYB is listening on port ${app.get("port")}`);
  });
}

module.exports = {start};
