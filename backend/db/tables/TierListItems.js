const Table = require("../Table");

class TierListItems extends Table {

  static findByListId(listId) {
    return super.query(`SELECT * FROM tier_list_items WHERE list_id = ${listId} AND deleted = 0`);
  }

  static create(listId, name, image, color) {
    return super.query(`SELECT * FROM tier_list_items WHERE list_id = ${listId} AND tier = 'pool' ORDER BY sort DESC`, true).then(async (lastPoolItem) => {
      const newSort = lastPoolItem ? parseInt(lastPoolItem.sort) + 1 : 1;
      return await super.query(`INSERT INTO tier_list_items (list_id, name, image, color, sort) VALUES (${listId}, '${name}', '${image}', '${color}', ${newSort})`);
    })
  }

  static update(itemId, tier, sort) {
    return super.query(`UPDATE tier_list_items SET tier = '${tier}', sort = ${sort} WHERE id = ${itemId}`);
  }

}

module.exports = TierListItems
