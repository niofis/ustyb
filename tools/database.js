"user strict";
const log = require("log4js").getLogger("database");

var admin = require("firebase-admin");
var serviceAccount = require("../ustybServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ustyb-eaf89.firebaseio.com"
});

const db = admin.database();

function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.ref("users").once("value", snp => {
      var data = snp.val();
      if (!data) {
        return resolve([]);
      }
      var users = Object.keys(data).map(k => {
        var usr = data[k];
        usr.id = k;
        return usr;
      });
      resolve(users);
    });
  });
}

function findUserWithId(id) {
  return new Promise((resolve, reject) => {
    db.ref("users").once("value", snp => {
      var user = snp.val();
      resolve(usr);
    });
  });
}

function insertUser(obj) {
  return new Promise((resolve, reject) => {
    reject("not supported");
  });
}

module.exports = {
  getAllUsers,
  findUserWithId,
  insertUser
};
