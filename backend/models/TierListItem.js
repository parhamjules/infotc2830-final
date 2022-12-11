const Model = require("../Model");

const table = 'tier_list_items';

class TierListItem extends Model {

  fields = ['list_id', 'name', 'image', 'tier', 'color', 'sort'];

  static findByListId(list_id) {
    return super.find({
      fields: {list_id},
      order: 'sort ASC'
    }, table);
  }

  static findLastInPool(list_id) {
    return super.findFirst({
      fields: {list_id, tier: 'pool'},
      order: 'sort DESC'
    }, table);
  }

  static update(id, tier, sort) {
    return super.update({tier, sort}, id, table);
  }

  save() {
    return super.save(table);
  }
}

module.exports = TierListItem;
