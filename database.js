"user strict";
const log = require("log4js").getLogger("database");

//const db = require("nosql").load("./db/ustyb.nosql");
const loki = require("lokijs");
const db = new loki("./db/ustyb.db", {autoload:true, autosave:true, autoloadCallback:initDatabase});

var users;

function initDatabase() {
  users = db.getCollection("users");
  if (users === null) {
    users = db.addCollection("users");
  }
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    var res = users.find().map(u => {
      delete u.meta;
      u.id = u.$loki;
      delete u.$loki
      return u;
    });
    resolve(res);
  });
}

function findUserWithId(id) {
  return new Promise((resolve, reject) => {
    var res = users.get(id);
    delete res.meta;
    delete res.$loki;
    res.id = id;

    resolve(res);
  });
}

function insertUser(obj) {
  return new Promise((resolve, reject) => {
    users.insert(obj);
    resolve();
  });
}

module.exports = {
  getAllUsers,
  findUserWithId,
  insertUser
};
