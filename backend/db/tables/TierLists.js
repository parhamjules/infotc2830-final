const Table = require("../Table");

class TierLists extends Table {

  static findById(listId) {
    return super.query(`SELECT * FROM tier_lists WHERE id = ${listId} AND deleted = 0`, true);
  }

  static findByUserId(userId) {
    return super.query(`SELECT * FROM tier_lists WHERE user_id = ${userId} AND deleted = 0`);
  }

  static create(userId, name) {
    return super.query(`INSERT INTO tier_lists (user_id, name) VALUES (${userId}, '${name}')`).then(success => {
      return super.query(`SELECT * FROM tier_lists ORDER BY id DESC`, true);
    });
  }

}

module.exports = TierLists
