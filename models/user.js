"use strict";

function all(db) {
  return new Promise((resolve, reject) => {
    db.getAllUsers().then(resolve).catch(reject);
  });
}

function findById(db, id) {
  return new Promise((resolve, reject) => {
    db.findUserWithId(id).then(resolve).catch(reject);
  });
}

function insert(db, obj) {
  return new Promise((resolve, reject) => {
    var usr = {};
    usr.email = obj.email;
    usr.name = obj.name;
    db.insertUser(usr).then(resolve).catch(reject);
  });
}

module.exports = {
  all,
  findById,
  insert
}

