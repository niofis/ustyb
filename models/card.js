"use strict";
const moment = require("moment");

function all(db, user_id, deck_id) {
  return new Promise((resolve, reject) => {
    db.getAllCardsForDeck(user_id, deck_id).then(resolve).catch(reject);
  });
}

function findById(db, user_id, deck_id, card_id) {
  return new Promise((resolve, reject) => {
    db.findCardWithId(user_id, deck_id, card_id).then(resolve).catch(reject);
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
    ncard.nextStudy = moment().add(1, "days").unix();
    ncard.timesStudied = 0;
    ncard.repetition = 0;
    ncard.interval = 0;
    ncard.easiness = 0;
    ncard.quality = 0;

    db.insertCard(user_id, deck_id, ncard).then(resolve).catch(reject);
  });
}

function answer(db, user_id, deck_id, card_id, res_qlty) {
  return new Promise(async (resolve, reject) => {
    try {
      var card = await findById(db, user_id, deck_id, card_id);

      card.timesStudied++;


      if (req_qlty < 3) {
        card.repetition = 0;
      }
      
      card.repetition++;

      if (card.repetition === 1) {
        card.interval = 1;
      } else if (card.repetition === 2) {
        card.interval = 6;
      } else {
        card.interval = Math.ceil(card.interval * card.easiness);
      }
      
      
      card.easiness = card.easiness + (0.1  (5 - res_qlty) * (0.08 + (5 - res_qlty) * 0.02));
      if (card.easiness < 1.3) {
        card.easiness = 1.3;
      }

      card.quality = res_qlty;
      
      if (req_qlty < 4) {
        card.nextStudy = moment().add(10, "minutes").unix();
      } else {
        card.nextStudy = moment().add(card.interval, "days").unix();
      }

      var uc = await db.updateCard(user_id, deck_id, card_id, card);

      resolve(uc);
    } catch (ex) {
      reject(ex);
    }
  });
}

module.exports = {
  all,
  findById,
  insert,
  answer
}

