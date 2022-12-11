const Model = require("../Model");

const table = 'tier_lists';

class TierList extends Model {

  fields = ['user_id', 'name'];
  static softDeletes = true;

  static findById(id) {
    return super.findFirst(id, table);
  }

  static findByUserId(user_id) {
    return super.find({
      fields: {user_id}
    }, table);
  }

  static delete(id) {
    return super.delete(id, table);
  }

  save() {
    return super.save(table);
  }
}

module.exports = TierList;
