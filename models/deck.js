"use strict";

function all(db, user_id) {
  return new Promise((resolve, reject) => {
    db.getAllDecksForUser(db, user_id).then(resolve).catch(reject);
  });
}

function findById(db, user_id, deck_id) {
  return new Promise((resolve, reject) => {
    db.findDeckWithId(user_id, deck_id).then(resolve).catch(reject);
  });
}

function insert(db, user_id, deck) {
  return new Promise((resolve, reject) => {
    var dck = {};

    dck.name = deck.name;

    db.insertDeck(usr_id, dck).then(resolve).catch(reject);
  });
}

module.exports = {
  all,
  findById,
  insert
}

