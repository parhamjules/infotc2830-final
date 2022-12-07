const db = require("./DB");

class Table {

  static query(sql, first = false) {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if(err) {
          reject(err);
        } else {
          resolve(first ? results[0] : results);
        }
      });
    });
  }

}

module.exports = Table;
