const Model = require("../Model");

const table = 'users';

class User extends Model {

  fields = ['username', 'password'];

  constructor(fields) {
    super(fields);
  }

  static findByCreds(username, password) {
    return super.findFirst({
      fields: {username, password}
    }, table);
  }

  static findByUsername(username) {
    return super.findFirst({
      fields: {username}
    }, table);
  }

  save() {
    return super.save(table);
  }
}

module.exports = User;
