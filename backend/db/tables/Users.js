const Table = require("../Table");

class Users extends Table {

  static authenticate(username, password) {
    // TODO
    return super.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`, true);
  }

}

module.exports = Users
