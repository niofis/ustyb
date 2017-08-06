"user strict";
const log = require("log4js").getLogger("database");

var admin = require("firebase-admin");
var serviceAccount = require("../ustybServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ustyb-eaf89.firebaseio.com"
});

const db = admin.database();

function findUserWithId(id) {
  return new Promise((resolve, reject) => {
    db.ref(id).child("profile").once("value", snp => {
      var user = snp.val();
      resolve(usr);
    });
  });
}

function getAllDecksForUser(user_id) {
  return new Promise((resolve, reject) => {
    db.ref(user_id).child("decks").once("value", snp => {
      var data = snp.val();
      if (!data) {
        return resolve([]);
      }
      var decks = Object.keys(data).map(k => {
        var d = data[k];
        d.id = k;
        return d;
      });
      resolve(decks);
    });
  });
}

function findDeckWithId(user_id, deck_id) {
  return new Promise((resolve, reject) => {
    db.ref(user_id).child("decks").child(deck_id).once("value", snp => {
      var deck = snp.val();
      resolve(deck);
    });
  });
}

function insertDeck(usr_id, deck) {
  return new Promise((resolve, reject) => {
    var ref = db.ref(usr_id).child("decks");
    var id = ref.push();
    deck.id = id;
    ref.child(id).set(deck, () => {
      resolve(deck);
    });
  });
}

function getAllCardsForDeck(usr_id, deck_id) {
  return new Promise((resolve, reject) => {
    db.ref(usr_id).child("cards").child(deck_id).once("value", snp => {
      var data = snp.val();
      if (!data) {
        resolve([]);
      }
      var cards = Object.keys(data).map(k => {
        var card = data[k];
        card.id = k;
        return card;
      });
      resolve(cards);
    });
  });
}

function findCardWithId(usr_id, deck_id, card_id) {
  return new Promise((resolve, reject) => {
    db.ref(usr_id).child("cards").child(deck_id).child(card_id).once("value", snp => {
      resolve(snp.val());
    });
  });
}

function insertCard(usr_id, deck_id, card) {
  return new Promise((resolve, reject) => {
    var ref = db.ref(usr_id).child("cards").child(deck_id);
    var id = ref.push();
    card.id = id;
    ref.child(id).set(card, () => {
      resolve(card);
    });
  });
}

module.exports = {
  findUserWithId,
  getAllDecksForUser,
  findDeckWithId,
  getAllCardsForDeck,
  findCardWithId,
  insertCard
};
