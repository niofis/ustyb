"use strict";
const moment = require("moment");

function all(db, user_id, deck_id) {
  return new Promise((resolve, reject) => {
    db.getAllCardsForDeck(db, user_id, deck_id).then(resolve).catch(reject);
  });
}

function findById(db, user_id, deck_id, card_id) {
  return new Promise((resolve, reject) => {
    db.findCardWithId(user_id, deck_id, card_i, card_id).then(resolve).catch(reject);
  });
}

function insert(db, user_id, deck_id, card) {
  return new Promise((resolve, reject) => {
    var ncard = {};

    if (!card.front) {
      return reject({fail:true, error: "front field not present"});
    }
    if (!card.back) {
      return reject({fail:true, error: "back field not present"});
    }

    ncard.front = card.front;
    ncard.back = card.back;
    ncard.created = moment().unix();
    ncard.nextStudy = moment().add("days", 1).unix();
    ncard.timesStudied = 0;
    ncard.repetition = 0;
    ncard.easiness = 0;
    ncard.quality = 0;

    db.insertCard(usr_id, deck_id, ncard).then(resolve).catch(reject);
  });
}

module.exports = {
  all,
  findById,
  insert
}

